/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWheel extends CGFobject
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
	
	this.wheelAppearance = new CGFappearance(this.scene);
	this.wheelAppearance.loadTexture("../resources/images/wheel.png");
	this.wheelAppearance.setDiffuse(0.5,0.5,0.5,1);
	this.wheelAppearance.setSpecular(0.6,0.6,0.6,1);
	this.wheelAppearance.setAmbient(0.6,0.6,0.6);
	this.wheelAppearance.setShininess(10);

	this.tirelAppearance = new CGFappearance(this.scene);
	this.tirelAppearance.loadTexture("../resources/images/tire.png");
	this.tirelAppearance.setDiffuse(0.5,0.5,0.5,1);
	this.tirelAppearance.setSpecular(0.6,0.6,0.6,1);
	this.tirelAppearance.setAmbient(0.6,0.6,0.6);
	this.tirelAppearance.setShininess(10);

	this.myCylinder= new MyCylinder(this.scene, this.slices, this.stacks);

	this.myCircle = new MyCircle(this.scene, this.slices, this.stacks);

	this.initBuffers();
	};



	display() {

		this.scene.pushMatrix();
		if (typeof this.tirelAppearance !== 'undefined') this.tirelAppearance.apply();
		this.scene.scale(0.85, 0.85, 0.6);
		this.myCylinder.display();	
		this.scene.popMatrix();

		this.scene.pushMatrix();
		if (typeof this.wheelAppearance !== 'undefined') this.wheelAppearance.apply();
		this.scene.scale(0.85, 0.85, 1);
		this.scene.translate(0,0, -0.4);	
		this.myCircle.display();	
        this.scene.popMatrix();
        
		this.scene.pushMatrix();
		if (typeof this.wheelAppearance !== 'undefined') this.wheelAppearance.apply();
		this.scene.scale(0.85, 0.85, 1);
		this.scene.translate(0,0, -1);
		this.myCircle.display();	
		this.scene.popMatrix();

    }

	 };