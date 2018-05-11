/**
 * MyChassis
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyChassis extends CGFobject
{
	constructor(scene, minS, maxS, minT, maxT)
	{
	super(scene);

	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1; 


	this.myBase= new Plane(this.scene);

	this.baseCube = new MyUnitCubeQuad(this.scene);

	this.capo = new MyLamp(this.scene, 4, 10);

	this.lights = new MyLamp(this.scene, 20, 10);

	this.light = new MyCircle(this.scene, 20, 10);

	this.escape = new MyCylinder(this.scene, 30, 20);

	this.initBuffers();


	};



	display() {

		//base
		this.scene.pushMatrix();	
		this.scene.scale(5, 1, 2.5);
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.scene.translate(0.4 , -0.4, 0);
		this.myBase.display();	
        this.scene.popMatrix();
		
		this.scene.pushMatrix();	
		this.scene.scale(6.5, 1.3, 2.5);
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.scene.translate(0.3 , -0.4, 0.5);
		this.baseCube.display();	
		this.scene.popMatrix();
		
		this.scene.pushMatrix();	
		this.scene.scale(4.5, 1.3, 2.5);
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.scene.translate(0.21, -0.4, 1.3);
		this.baseCube.display();	
		this.scene.popMatrix();
		

		//capo
		this.scene.pushMatrix();
		this.scene.scale(1.65, 0.4, 1.8);	
		this.scene.translate(2.5, 3.2, 0.565);
		this.scene.rotate(-45 * degToRad, 0, 1, 0)
		this.capo.display();	
		this.scene.popMatrix();

		//parachoques frente
		this.scene.pushMatrix();	
		this.scene.translate(5.2, 0.1, 1);
		this.scene.scale(0.2, 0.4, 2.5);
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
		this.baseCube.display();	
		this.scene.popMatrix();

		//parachoques tras
		this.scene.pushMatrix();	
		this.scene.translate(-1.3, 0.1, 1);
		this.scene.scale(0.2, 0.5, 2.5);
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
		this.baseCube.display();	
		this.scene.popMatrix();

		//farois
		this.scene.pushMatrix();
		this.scene.scale(0.4, 0.4, 0.4);	
		this.scene.translate(14, 2, 0.5);
		this.scene.rotate(90 * degToRad, 0, 0,1)
		this.lights.display();	
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.4, 0.4, 0.4);	
		this.scene.translate(14, 2, 4.5);
		this.scene.rotate(90 * degToRad, 0, 0,1)
		this.lights.display();	
		this.scene.popMatrix();

		//luzes dos farois
		this.scene.pushMatrix();	
		this.scene.scale(0.4, 0.4, 0.4);
		this.scene.translate(13, 2, 0.5);
		this.scene.rotate(90 * degToRad, 0, 1, 0)
		this.light.display();	
		this.scene.popMatrix();

		this.scene.pushMatrix();	
		this.scene.scale(0.4, 0.4, 0.4);
		this.scene.translate(13, 2, 4.5);
		this.scene.rotate(90 * degToRad, 0, 1, 0)
		this.light.display();	
		this.scene.popMatrix();

		//escapes
		this.scene.pushMatrix();	
		this.scene.translate(-1.6 , 0.0, 0.2);
		this.scene.rotate(90 * degToRad, 0, 1, 0)
		this.scene.scale(0.1, 0.1, 1);
		this.escape.display();	
		this.scene.popMatrix();
		
		this.scene.pushMatrix();	
		this.scene.translate(-1.6 , 0.0, 0.5);
		this.scene.rotate(90 * degToRad, 0, 1, 0)
		this.scene.scale(0.1, 0.1, 1);
		this.escape.display();	
        this.scene.popMatrix();

    }

	 };