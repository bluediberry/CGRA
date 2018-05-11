/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClock extends CGFobject
{
	constructor(scene, slices, stacks, minS, maxS, minT, maxT)
	{
	super(scene);

	this.slices = slices;
	this.stacks = stacks;

	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1; 

	this.myCylinder= new MyCylinder(this.scene, this.slices, this.stacks);

	this.myCircle = new MyCircle(this.scene, this.slices, this.stacks);

	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.loadTexture("../resources/images/clock.png");
	this.clockAppearance.setAmbient(1,1,1,1);
	this.clockAppearance.setDiffuse(1,1,1,1);
	this.clockAppearance.setSpecular(1.0,1.0,1.0,1);
	this.clockAppearance.setShininess(120);	

	this.h = new MyClockHand(this.scene, 0.5);
	this.m = new MyClockHand(this.scene, 0.7);
	this.s = new MyClockHand(this.scene,0.9);

	this.h.setAngle(-90);
	this.m.setAngle(0);
	this.s.setAngle(90);

	this.horasAppearance = new CGFappearance(this.scene);
	this.horasAppearance.setDiffuse(0,0,0,1);
	this.horasAppearance.setSpecular(0.7,0.7,0.7,1);
	this.horasAppearance.setShininess(200);	

	this.minutosAppearance = new CGFappearance(this.scene);
	this.minutosAppearance.setDiffuse(0,0,0,1);
	this.minutosAppearance.setSpecular(0.7,0.7,0.7,1);
	this.minutosAppearance.setShininess(200);	

	this.segundosAppearance = new CGFappearance(this.scene);
	this.segundosAppearance.setDiffuse(0.4,0,0,1);
	this.segundosAppearance.setSpecular(0.7,0.7,0.7,1);
	this.segundosAppearance.setShininess(200);


	this.initBuffers();
	};



	display() {

		this.scene.pushMatrix();	
		this.myCylinder.display();	
		this.scene.popMatrix();

		this.scene.pushMatrix();	
		if (typeof this.clockAppearance !== 'undefined') this.clockAppearance.apply();
		this.myCircle.display();	
		this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,0,this.stacks+0.05);
		this.horasAppearance.apply();
		this.h.display();
	this.scene.popMatrix();


	this.scene.pushMatrix();
		this.scene.translate(0,0,this.stacks+0.05);
		this.m.display();
		this.minutosAppearance.apply();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,0,this.stacks+0.05);
		this.segundosAppearance.apply();
		this.s.display();
	this.scene.popMatrix();




	}

	update(currTime) 
	{
		var segundosInc = 360 / 60;
		var minutosInc = segundosInc / 60;
		var horasInc = minutosInc / 12;
	
		this.s.setAngle(this.s.ang + segundosInc);
		this.m.setAngle(this.m.ang + minutosInc);
		this.h.setAngle(this.h.ang + horasInc);
	};

	 };