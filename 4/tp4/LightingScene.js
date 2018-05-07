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

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL); 

		this.axis = new CGFaxis(this); 

		// Scene elements
		this.Prism = new MyPrism(this, 8, 20);
		this.cylinder = new MyCylinder(this, 8, 20);
		this.table = new MyTable(this);
		//this.floor = new MyQuad(this, 0, 10, 0, 12);
		this.floor = new MyQuad(this, 0, 1, 0, 1);
		this.wall = new Plane(this);
		//this.leftwall = new MyQuad(this,-0.5,1.5,-0.5,1.5);
		this.leftwall = new MyQuad(this,-0.25,1.25,-0.25,1.25);
		this.lamp = new MyLamp(this, 8, 20);
		this.sphere = new MySphere(this, 8, 20);
		this.window = new MyQuad(this, 0,1,0,1)

		
		//this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.3, 1.3, 0, 1);
		this.boardA = new Plane(this, BOARD_A_DIVISIONS);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS);
		
		// Materials
		 this.materialDefault = new CGFappearance(this);

		this.materialFloor = new CGFappearance(this);
		this.materialFloor.setAmbient(0.3, 0.05, 0.5, 1);
		this.materialFloor.setDiffuse(0.655, 0.622, 0.573, 1);
		this.materialFloor.setSpecular(0.7, 0.7, 0.6, 1);
		this.materialFloor.setShininess(120);

		this.floorAppearance = new CGFappearance(this);
		//this.floorAppearance.loadTexture("../resources/images/floor.png");
		this.floorAppearance.loadTexture("../resources/images/maderiab.png");
		//this.floorAppearance.setTextureWrap("MIRRORED_REPEAT","MIRRORED_REPEAT");
		this.floorAppearance.setDiffuse(0.655, 0.622, 0.573, 1);
		this.floorAppearance.setSpecular(0.7, 0.7, 0.6, 1);
		this.floorAppearance.setShininess(200);
	
		this.materialWall = new CGFappearance(this);
		this.materialWall.setAmbient(0.3, 0.3, 0.4, 1);
		this.materialWall.setDiffuse(0.745, 0.9, 0.9, 1);
		this.materialWall.setSpecular(0, 0, 0, 1);
		this.materialWall.setShininess(120); 

		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		//this.materialA.setSpecular(0.2,0.2,0.2,1);
		this.materialA.setSpecular(0,0.2,0.8,1);
		//this.materialA.setShininess(10);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);	
		this.materialB.setShininess(120);

		this.materialLamp = new CGFappearance(this);
		this.materialLamp.setAmbient(0.7, 0.5, 0.9, 1);
		this.materialLamp.setDiffuse(0.19, 0.27, 0.27, 1);
		this.materialLamp.setSpecular(0.2, 0.2, 0.2, 1);
		this.materialLamp.setShininess(50);

		this.windowAppearance= new CGFappearance(this);
		//this.windowAppearance.loadTexture("../resources/images/window.png");
		//this.windowAppearance.loadTexture("../resources/images/janela3.png");
		this.windowAppearance.loadTexture("../resources/images/janela4.png");
		this.windowAppearance.setTextureWrap("MCLAMP_TO_EDGE","CLAMP_TO_EDGE");
		this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
		this.windowAppearance.setDiffuse(0.655, 0.622, 0.573, 1);
		this.windowAppearance.setSpecular(0.7, 0.7, 0.6, 1);
		this.windowAppearance.setShininess(120);  

		this.slidesAppearance= new CGFappearance(this);
		//this.slidesAppearance.loadTexture("../resources/images/slides.png");
		this.slidesAppearance.loadTexture("../resources/images/guernica.png");
		this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
		this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
		this.slidesAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
		this.slidesAppearance.setSpecular(0.4, 0.4, 0.4, 1);
		this.slidesAppearance.setShininess(120);  

		this.boardAppearance= new CGFappearance(this);
		//this.boardAppearance.loadTexture("../resources/images/board.png");
		this.boardAppearance.loadTexture("../resources/images/guernica2.png");
		this.boardAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
		this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
		this.boardAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
		this.boardAppearance.setSpecular(0.6, 0.6, 0.6, 1);
		this.boardAppearance.setShininess(300); 

		this.prismAppearance = new CGFappearance(this);
		this.prismAppearance.loadTexture("../resources/images/marmore3.png"),
		this.prismAppearance.setAmbient(0.5,0.5,0.5,1);
		this.prismAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
		this.prismAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.prismAppearance.setShininess(100); 
		
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{

		this.lights[0].setPosition(15, 2, 5, 1);
		this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
        this.lights[0].enable();
		this.lights[0].update();
		
		
		//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
		this.setGlobalAmbientLight(0,0,0,1.0);
		
		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		//this.lights[0].setVisible(true); // show marker on light position (different from enabled)

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		//this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		//this.lights[3].setVisible(true); // show marker on light position (different from enabled)

		this.lights[4].setPosition(1.5, 7, 7.5, 1);
		//this.lights[4].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 0, 1.0);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1.0);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].enable();

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(0.2);
		this.lights[3].enable();

		this.lights[4].setAmbient(0, 0, 0, 1);
		this.lights[4].setDiffuse(0.20, 0.20, 0.20, 0.20);
		this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[4].enable();
		
	};

    setDefaultAppearance() 
    {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);	
	};
	
	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
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

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// Plane Wall
		this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialLamp.apply();
		this.wall.display();
		this.popMatrix();

		
		// Floor
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);
			//this.materialFloor.apply();
			this.floorAppearance.apply();
			this.floor.display();
		this.popMatrix();


		// Left Wall
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.materialWall.apply();
			this.windowAppearance.apply();
			//this.leftwall.display();
		this.popMatrix();


		// First Table
		this.pushMatrix();
			this.translate(5, 0, 8);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 8);
			this.table.display();
		this.popMatrix();

		// Board A
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.materialA.apply();
			this.slidesAppearance.apply();
			this.boardA.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
			this.translate(10.5, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.materialB.apply();
			this.boardAppearance.apply();
			this.boardB.display();
		this.popMatrix();

		// ---- END Scene drawing section
		
		//prisma
		this.pushMatrix();
			this.translate( 0,  0, 0);
			this.rotate(-90*degToRad, 1, 0, 0);
			this.scale(1, 1, 8);
			this.prismAppearance.apply();
			this.Prism.display();
		this.popMatrix();

		//cilindro
		this.pushMatrix();
			this.translate( 15, 0 , 0);
			this.rotate(-90*degToRad, 1, 0, 0);
			this.scale(1, 1, 8);
			this.prismAppearance.apply();
			this.cylinder.display();
		this.popMatrix();

		//candeiro
		this.pushMatrix();
			this.translate( 8, 9 , 8);
			this.rotate(-180*degToRad, 1, 0, 0);
			//this.scale(1, 1, 1);
			this.materialLamp.apply();
			this.lamp.display();
		this.popMatrix(); 

	 	//esfera
		this.pushMatrix();
			this.translate( 5, 4.8, 8);
			this.rotate(-180*degToRad, 1, 0, 0);
			this.sphere.display();
		this.popMatrix(); 

		this.pushMatrix();
			this.translate( 5, 4.7, 8);
			this.rotate(-180*degToRad, 0, 1, 0);
			this.sphere.display();
		this.popMatrix(); 

		//janela
		this.pushMatrix();
			this.translate(1, 4.25, 3);
			this.rotate(45 * degToRad, 0, 1, 0);
			this.scale(3, 3.5, 1);
			this.windowAppearance.apply();
			this.window.display();
		this.popMatrix(); 

		this.pushMatrix();
		this.translate(1, 4.25, 12);
		this.rotate((45+90) * degToRad, 0, 1, 0);
		this.scale(3, 3.5, 1);
		this.window.display();
		this.windowAppearance.apply();
		this.popMatrix();

		//parede com janela aberta
		this.pushMatrix();
			this.translate(0, 4, 2);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(4, 8, 5);
			this.materialLamp.apply();
			this.leftwall.display();
		this.popMatrix();

		this.pushMatrix();
			this.translate(0, 4, 13);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(4, 8, 5);
			this.materialLamp.apply();
			this.leftwall.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(0, 7, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(7, 2, 5);
		this.materialLamp.apply();
		this.leftwall.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(0, 1, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(7, 3, 5);
		this.materialLamp.apply();
		this.leftwall.display();
		this.popMatrix();

	};
};
