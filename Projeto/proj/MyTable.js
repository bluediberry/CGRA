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

		this.tableAppearance = new CGFappearance(this.scene);
		//this.tableAppearance.loadTexture("../resources/images/table.png");
		this.tableAppearance.loadTexture("../resources/images/marmore.png");
		this.tableAppearance.setAmbient(0.3, 0.05, 0, 1);
		this.tableAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
		this.tableAppearance.setSpecular(0, 0, 0, 1);
		this.tableAppearance.setShininess(0);

		this.materialTableLegs = new CGFappearance(this.scene);
		this.materialTableLegs.setAmbient(0.3, 0.3, 0.3, 1);
		this.materialTableLegs.setDiffuse(0.5, 0.5, 0.5, 1);
		this.materialTableLegs.setSpecular(0.6, 0.6, 0.6, 1);
		this.materialTableLegs.setShininess(10);

		this.cube = new MyUnitCubeQuad(this.scene);
		this.cube.initBuffers();

	};

  display()
  {
	
	//tampo
	this.scene.pushMatrix();
	if (typeof this.tableAppearance !== 'undefined') this.tableAppearance.apply();
	this.scene.translate(0,3.65,0);
	this.scene.scale(5.0,0.3,3.0);
	this.cube.display();
	this.scene.popMatrix();

	if (typeof this.materialTableLegs !== 'undefined') this.materialTableLegs.apply();
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
