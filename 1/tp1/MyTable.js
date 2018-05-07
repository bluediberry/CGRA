/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(this.scene);
		this.cube.initBuffers();
	};

  display()
  {
	
	//tampo
	this.scene.pushMatrix();
	this.scene.translate(0,3.65,0);
	this.scene.scale(5.0,0.3,3.0);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(2.35,1.75,1.35);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-2.35,1.75,1.35);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();
		
	this.scene.pushMatrix();
	this.scene.translate(2.35,1.75,-1.35);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();
		
	this.scene.pushMatrix();
	this.scene.translate(-2.35,1.75,-1.35);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix(); 
}

};
