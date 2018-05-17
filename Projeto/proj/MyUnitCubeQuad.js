/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.quad = new MyQuad(this.scene);
		this.quad.initBuffers();
		//this.initBuffers();
	};

  display()
  {
		
		var deg2rad=Math.PI/180.0; //os angulos utilizados sao sempre em radianos
		var a_rad=-90.0*deg2rad; //rotacao de 90 graus
		var b_rad=180.0*deg2rad; //rotacao de 180 graus
	
		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.quad.display();
		this.scene.popMatrix();
	
	
	    this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.scene.rotate(b_rad,0,1,0);
		this.quad.display();
		this.scene.popMatrix();
	
	
		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(a_rad,0,1,0);
		this.quad.display();
		this.scene.popMatrix();
	
		this.scene.pushMatrix();
		this.scene.translate(0.5,0,0);
		this.scene.rotate(-a_rad,0,1,0);
		this.quad.display();
		this.scene.popMatrix();
	
	
		this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.rotate(a_rad,1,0,0);
		this.quad.display();
		this.scene.popMatrix();
	
	
		this.scene.pushMatrix();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate(-a_rad,1,0,0);
		this.quad.display();
		this.scene.popMatrix(); 
}
};
