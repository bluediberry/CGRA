/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClockHand extends CGFobject
{
	constructor(scene, tamanho)
	{

	super(scene);


	this.tamanho = tamanho;
	this.angle = 0;

	this.hand = new MyUnitCubeQuad(scene);

	this.initBuffers();
	};

	setAngle(angle)
	{
	
		this.ang = angle;
		
	}
	


	display() 
	{
		var deg2rad=Math.PI/180.0; //os angulos utilizados sao sempre em radianos
		var a_rad=-90.0*deg2rad; //rotacao de 90 graus
		var b_rad=180.0*deg2rad; //rotacao de 180 graus
		
		this.scene.rotate(-this.ang*deg2rad, 0, 0, 1);
		this.scene.translate(0, -0.5, 0);
		this.scene.scale(0.03, this.tamanho, 0.03);
		this.hand.display();

		}

	
	 };
