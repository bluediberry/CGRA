var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene
{
    constructor()
    {
        super();
    };

    init(application)
    {
        super.init(application);

        this.initCameras();

        this.initLights();

        this.enableTextures(true);

        this.gl.clearColor(0.635, 0.806, 0.9, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.wheel = new MyWheel(this, 12, 4);
        this.vehicle = new MyVehicle(this);
        this.cylinder = new MyCylinder(this);
        this.terrain = new MyTerrain(this);

        // Scene elements

        // Materials
        this.materialDefault = new CGFappearance(this);

        this.setUpdatePeriod(10);

		this.Luz1=true;
        this.Luz2=true;
        this.Luz3=true;
        this.Luz4=true;
        this.speed=3;
        this.Desenhar=true;
        

    };


    initCameras()
    {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
    };

    initLights()
    {
        this.setGlobalAmbientLight(1.0, 1.0, 1.0, 1.0);

        // Positions for four lights
        this.lights[0].setPosition(10, 10, 10, 1);
        this.lights[0].setVisible(true); // show marker on light position (different from enabled)

        this.lights[1].setPosition(10, 10.0, -10, 1.0);
        this.lights[1].setVisible(true); // show marker on light position (different from enabled)

        this.lights[2].setPosition(-10, 10.0, 10, 1.0);
        this.lights[2].setVisible(true); // show marker on light position (different from enabled)

        this.lights[3].setPosition(-10, 10.0, -10, 1.0);
        this.lights[3].setVisible(true); // show marker on light position (different from enabled)

        this.lights[0].setAmbient(0, 0, 0, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1,1,1,1);
        this.lights[0].setConstantAttenuation(0.0);
		this.lights[0].setLinearAttenuation(0.25);
		this.lights[0].setQuadraticAttenuation(0.0);
        this.lights[0].enable();

        this.lights[1].setAmbient(0, 0, 0, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setSpecular(1,1,1,1);
        this.lights[1].setConstantAttenuation(0.0);
		this.lights[1].setLinearAttenuation(0.25);
		this.lights[1].setQuadraticAttenuation(0.0);
        this.lights[1].enable();

        this.lights[2].setAmbient(0, 0, 0, 1);
        this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setSpecular(1,1,1,1);
        this.lights[2].setConstantAttenuation(0.0);
		this.lights[2].setLinearAttenuation(0.25);
		this.lights[2].setQuadraticAttenuation(0.0);
        this.lights[2].enable();

        this.lights[3].setAmbient(0, 0, 0, 1);
        this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[3].setSpecular(1,1,1,1);
		this.lights[3].setConstantAttenuation(0.0);
		this.lights[3].setLinearAttenuation(0.25);
		this.lights[3].setQuadraticAttenuation(0.0);
        this.lights[3].enable();


    };


    updateLights()
    {
        for (var i = 0; i < this.lights.length; i++) {
            this.lights[i].update();
        }

    }

    update(currTime) 
	{	

        if(this.Luz1)
            this.lights[0].enable();
         else 
            this.lights[0].disable();
        

        if(this.Luz2)
            this.lights[1].enable();
         else 
            this.lights[1].disable();
        

        if(this.Luz3)
            this.lights[2].enable();
         else 
            this.lights[2].disable();
        

        if(this.Luz4)
            this.lights[3].enable();
         else 
            this.lights[3].disable();
        

        if(this.Desenhar){
            this.axis = new CGFaxis(this);
        } else 
            this.axis = new CGFaxis(this, 0, 0);

       this.checkKeys();
        


    }
    
    checkKeys()
    {
         var text="Keys pressed: ";
         var keysPressed=false;


         if (this.gui.isKeyPressed("KeyW"))
             {
                 text+=" W ";
                 keysPressed=true;
                 this.vehicle.moveXZ("front", true);
             }


          if (this.gui.isKeyPressed("KeyS"))
             {
                text+=" S ";
                keysPressed=true;
                this.vehicle.moveXZ("back", true);
              }


        if (this.gui.isKeyPressed("KeyA"))
             {
                text+=" A ";
                keysPressed=true;
                this.vehicle.turn("left", true);
              }


        if (this.gui.isKeyPressed("KeyD"))
              {
                 text+=" D ";
                 keysPressed=true;
                 this.vehicle.turn("right", true);
               }

        if (keysPressed)
                console.log(text);


     }
    
 
    display()
    {
        // ---- BEGIN Background, camera and axis setup

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation)
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Update all lights used
        this.updateLights();

        // Draw axis
       this.axis.display();

       //check Keys
       this.checkKeys();

        this.materialDefault.apply();

        // ---- END Background, camera and axis setup

        // ---- BEGIN Scene drawing section



    this.pushMatrix();
    this.translate(this.vehicle.xPosition, 0.85, this.vehicle.zPosition)
    this.vehicle.display();
    this.popMatrix();

    this.pushMatrix();	
    this.terrain.display();
   this.popMatrix();

        // ---- END Scene drawing section
    };
};