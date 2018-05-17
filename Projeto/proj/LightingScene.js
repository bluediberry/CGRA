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



        // Scene elements

        this.axis = new CGFaxis(this);
        this.wheel = new MyWheel(this, 12, 4);
        this.vehicle = new MyVehicle(this);
        this.cylinder = new MyCylinder(this);
        this.terrain = new MyTerrain(this);

        this.Luz1=true;
        this.Luz2=true;
        this.Luz3=true;
        this.Luz4=true;
        this.speed=3;
        this.Desenhar=true;
        this.red=true;
        this.modern=false;
        this.gucci=false;
        this.military=false;
        

        this.altimetry = [[ 2.0 , 3.0 , 2.0, 4.0, 2.5, 2.4, 2.3, 0.0, 1.2 ],
        [ 2.0 , 3.0 , 2.0, 4.0, 7.5, 6.4, 4.3, 0.0, 2.5 ],
        [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 10.0 ],
        [ 5.0 , 0.0 , 0.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
        [ 0.0 , 0.0 , 2.0, 4.0, 2.5, 2.4, 0.0, 0.0, 0.0 ],
        [ 0.0 , 0.0 , 0.0, 0.0, 0.5, 2.4, 0.0, 0.0, 0.0 ],
        [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
        [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
        [ 2.0 , 1.0 , 2.0, 1.0, 2.5, 2.4, 2.3, 0.3, 0.0 ]];  

        // Materials
        this.materialDefault = new CGFappearance(this);

        this.vehicleAppearance1 = new CGFappearance(this);
        this.vehicleAppearance1.loadTexture("../resources/images/red4.png"); 
        this.vehicleAppearance1.setDiffuse(0.5,0.5,0.5,1);
        this.vehicleAppearance1.setSpecular(0.6,0.6,0.6,1);
        this.vehicleAppearance1.setAmbient(0.6,0.6,0.6);
        this.vehicleAppearance1.setShininess(120);

        this.vehicleAppearance2 = new CGFappearance(this);
        this.vehicleAppearance2.loadTexture("../resources/images/modern2.png");
        this.vehicleAppearance2.setDiffuse(0.5,0.5,0.5,1);
        this.vehicleAppearance2.setSpecular(0.6,0.6,0.6,1);
        this.vehicleAppearance2.setAmbient(0.6,0.6,0.6);
        this.vehicleAppearance2.setShininess(120);

        this.vehicleAppearance3 = new CGFappearance(this);
        this.vehicleAppearance3.loadTexture("../resources/images/paint.png");
        this.vehicleAppearance3.setDiffuse(0.5,0.5,0.5,1);
        this.vehicleAppearance3.setSpecular(0.6,0.6,0.6,1);
        this.vehicleAppearance3.setAmbient(0.6,0.6,0.6);
        this.vehicleAppearance3.setShininess(120);

        this.vehicleAppearance4 = new CGFappearance(this);
        this.vehicleAppearance4.loadTexture("../resources/images/military.jpg");
        this.vehicleAppearance4.setDiffuse(0.5,0.5,0.5,1);
        this.vehicleAppearance4.setSpecular(0.6,0.6,0.6,1);
        this.vehicleAppearance4.setAmbient(0.6,0.6,0.6);
        this.vehicleAppearance4.setShininess(120);

        this.vehicleAppearances = [];

        this.vehicleAppearances.push(this.vehicleAppearance1);
        this.vehicleAppearances.push(this.vehicleAppearance2);
        this.vehicleAppearances.push(this.vehicleAppearance3);
        this.vehicleAppearances.push(this.vehicleAppearance4);

        this.vehicleAppearanceList = [];

        this.vehicleAppearanceList.push(['red', 0]);
        this.vehicleAppearanceList.push(['modern', 1]);
        this.vehicleAppearanceList.push(['gucci', 2]);
        this.vehicleAppearanceList.push(['military', 3]);
    
        this.currVehicleAppearance = -1;
        

        this.setUpdatePeriod(10);


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



    updateCarTexture(){
        var currentIndex = -1;

        if(this.red){
            for(var i = 0; i < this.vehicleAppearanceList.length; i++){
                if(this.vehicleAppearanceList[i][0] == 'red'){
                    currentIndex = this.vehicleAppearanceList[i][1];
                }
            }
        }

        if(this.modern){
            for(var i = 0; i < this.vehicleAppearanceList.length; i++){
                if(this.vehicleAppearanceList[i][0] == 'modern'){
                    currentIndex = this.vehicleAppearanceList[i][1];
                }
            }
        }

        if(this.gucci){
            for(var i = 0; i < this.vehicleAppearanceList.length; i++){
                if(this.vehicleAppearanceList[i][0] == 'gucci'){
                    currentIndex = this.vehicleAppearanceList[i][1];
                }
            }
        }

        if(this.military){
            for(var i = 0; i < this.vehicleAppearanceList.length; i++){
                if(this.vehicleAppearanceList[i][0] == 'military'){
                    currentIndex = this.vehicleAppearanceList[i][1];
                }
            }
        }

        this.currVehicleAppearance = currentIndex;
    }


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


        // Update the car
        this.updateCarTexture();

        // Draw axis
       this.axis.display();

       //check Keys
       this.checkKeys();

        this.materialDefault.apply();

        // ---- END Background, camera and axis setup

        // ---- BEGIN Scene drawing section



    this.pushMatrix();
    if(!(this.currVehicleAppearance < 0)){
        this.vehicleAppearances [this.currVehicleAppearance].apply();
    }
    this.translate(this.vehicle.xPosition, 0.85, this.vehicle.zPosition)
    this.vehicle.display();
    this.popMatrix();

    this.pushMatrix();	
    this.terrain.display();
   this.popMatrix();

        // ---- END Scene drawing section
    };
};