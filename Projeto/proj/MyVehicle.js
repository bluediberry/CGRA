/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyVehicle extends CGFobject
{
	constructor(scene, minS, maxS, minT, maxT)
	{
	super(scene);

	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1; 

    this.myWheel= new MyWheel(this.scene, 120, 1);
    
    this.myChassis = new MyChassis(this.scene);


	this.window = new Plane(this.scene); 

	this.windowAppearance = new CGFappearance(this.scene);
	this.windowAppearance.setAmbient(1,1,1,1);
	this.windowAppearance.setDiffuse(0.9,0.95,0.95,1);
	this.windowAppearance.setSpecular(1.0,1.0,1.0,1);
	this.windowAppearance.setShininess(900);	

	//controlar posição
	this.xPosition = 0;
	this.zPosition = 0;
	this.speed = 0;
	this.key = "front";

	//controlar rotação
	this.rotAngle = 0;

	this.initBuffers();
	};



	display() {

        //rodas traseiras
        this.scene.pushMatrix();	
        this.scene.translate(0 ,0,2)
		this.myWheel.display();	
        this.scene.popMatrix();
        
        this.scene.pushMatrix();	
        this.scene.rotate(-180 * degToRad, 1, 0, 0);
		this.myWheel.display();	
		this.scene.popMatrix();

        //rodas dianteiras
        this.scene.pushMatrix();	
        this.scene.translate(3.8,0,2);
		this.myWheel.display();	
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.8,0,0);
        this.scene.rotate(-180 * degToRad, 1, 0, 0);
		this.myWheel.display();	
        this.scene.popMatrix();
        
        this.scene.pushMatrix();	
		this.myChassis.display();	
        this.scene.popMatrix();

		//janelas esquerdas
		this.scene.pushMatrix();
		if (typeof this.windowAppearance !== 'undefined') this.windowAppearance.apply();
		this.scene.scale(1.5, 1, 1.5);
		this.scene.translate(0, 1.6, 1.55);	
		this.window.display();	
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
		if (typeof this.windowAppearance !== 'undefined') this.windowAppearance.apply();
        this.scene.scale(1.5, 1, 1.5);
		this.scene.translate(1.3, 1.6, 1.55);	
		this.window.display();	
        this.scene.popMatrix();

		//janela da frente
        this.scene.pushMatrix();
		if (typeof this.windowAppearance !== 'undefined') this.windowAppearance.apply();
        this.scene.scale(1.9, 1, 1.9);
        this.scene.rotate(90 * degToRad, 0, 1, 0);
        this.scene.translate(-0.53, 1.65, 1.7);	
		this.window.display();	
		this.scene.popMatrix();
		
		//janelas direitas
		this.scene.pushMatrix();
		if (typeof this.windowAppearance !== 'undefined') this.windowAppearance.apply();
		this.scene.scale(1.5, 1, 1.5);
		this.scene.translate(0, 1.6, -0.2);	
		this.scene.rotate(180 * degToRad, 0, 1, 0);	
		this.window.display();	
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
		if (typeof this.windowAppearance !== 'undefined') this.windowAppearance.apply();
        this.scene.scale(1.5, 1, 1.5);
		this.scene.translate(1.3, 1.6, -0.2);	
		this.scene.rotate(180 * degToRad, 0, 1, 0);	
		this.window.display();	
		this.scene.popMatrix();
				


    }

	moveXZ(direction, move) {

		if (move) {
			switch (direction) {
				case "front":
					this.speed += 0.1;
					this.key = "front";
					this.zPosition += Math.sin(this.rotAngle*degToRad)*this.speed;
					this.xPosition += Math.cos(this.rotAngle*degToRad)*this.speed;
					this.speed -= 0.1;
					break;
				case "back":
					this.speed -= 0.1;
					this.key = "back";
					this.zPosition += Math.sin(this.rotAngle*degToRad)*this.speed;
					this.xPosition += Math.cos(this.rotAngle*degToRad)*this.speed;
					this.speed += 0.1;
					break;
			}
		}
	
	}


	turn(direction){

		switch(direction) {

			case "left":
				this.rotAngle -= 5;
				break;

			case "right":
				this.rotAngle += 5;
				break;
		}
	}
	 };