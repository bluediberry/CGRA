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

	this.myCylinder= new MyCylinder(this.scene, this.slices, this.stacks);

    this.myCircle = new MyCircle(this.scene, this.slices, this.stacks);

	this.initBuffers();
	};



	display() {

		this.scene.pushMatrix();
		this.scene.scale(0.85, 0.85, 0.6);
		this.myCylinder.display();	
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.85, 0.85, 1);
		this.scene.translate(0,0, -0.4);	
		this.myCircle.display();	
        this.scene.popMatrix();
        
		this.scene.pushMatrix();
		this.scene.scale(0.85, 0.85, 1);
        this.scene.translate(0,0, -1);
		this.myCircle.display();	
		this.scene.popMatrix();





    }

	 };