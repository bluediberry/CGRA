/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyLamp extends CGFobject
{
	constructor(scene, slices, stacks)
	{
	super(scene);

	this.slices = slices;
	this.stacks = stacks;

	this.initBuffers();
	};


	initBuffers() 
	{
		var angulo = (2*Math.PI)/this.slices;
		var variacaoAngulo = 0;
		var indice = 1;
		var altura = 1/this.stacks;
		var variacaoAltura = 1;
		var raio =  0;

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		this.vertices.push(0, 1, 0);
		this.normals.push(0, 1, 0);
		this.texCoords.push(0.5, 0.5);

		variacaoAltura -= altura;


		raio = Math.sqrt(1- variacaoAltura*variacaoAltura);

		this.vertices.push(raio*Math.cos(variacaoAngulo), variacaoAltura, raio*Math.sin(variacaoAngulo));
		this.normals.push(raio*Math.cos(variacaoAngulo), variacaoAltura, raio*Math.sin(variacaoAngulo));
		this.texCoords.push(0.5 + (1-variacaoAltura)*0.5*Math.cos(variacaoAngulo),
				0.5 + (1-variacaoAltura)*0.5*Math.sin(variacaoAngulo));

		variacaoAngulo += angulo;


			for(var i = 0; i < this.slices; i++) {

				this.vertices.push(raio*Math.cos(variacaoAngulo), variacaoAltura, raio*Math.sin(variacaoAngulo));
				this.normals.push(raio*Math.cos(variacaoAngulo), variacaoAltura, raio*Math.sin(variacaoAngulo));
				this.texCoords.push(0.5 + (1-variacaoAltura)*0.5*Math.cos(variacaoAngulo),
				0.5 + (1-variacaoAltura)*0.5*Math.sin(variacaoAngulo));

				variacaoAngulo += angulo;

				this.indices.push(0, indice + 1, indice);


				indice += 1;
			}
	
			indice += 1;

			while(variacaoAltura -  altura >= 0) {

				variacaoAltura -= altura;
				raio = Math.sqrt(1- variacaoAltura*variacaoAltura);
				variacaoAngulo = 0;

				this.vertices.push(raio*Math.cos(variacaoAngulo), variacaoAltura, raio*Math.sin(variacaoAngulo));
				this.normals.push(raio*Math.cos(variacaoAngulo), variacaoAltura, raio*Math.sin(variacaoAngulo));
				this.texCoords.push(0.5 + (1-variacaoAltura)*0.5*Math.cos(variacaoAngulo),
				0.5 + (1-variacaoAltura)*0.5*Math.sin(variacaoAngulo));
				
				variacaoAngulo += angulo;

				for(var i = 0; i < this.slices; i++){

					this.vertices.push(raio*Math.cos(variacaoAngulo), variacaoAltura, raio*Math.sin(variacaoAngulo));
					this.normals.push(raio*Math.cos(variacaoAngulo), variacaoAltura, raio*Math.sin(variacaoAngulo));
					this.texCoords.push(0.5 + (1-variacaoAltura)*0.5*Math.cos(variacaoAngulo),
					0.5 + (1-variacaoAltura)*0.5*Math.sin(variacaoAngulo));
					
					variacaoAngulo += angulo;

					this.indices.push(indice, indice - this.slices-1, indice - this.slices);
					this.indices.push(indice, indice - this.slices, indice + 1);
					indice += 1;

				}
				indice += 1;
			}

		 this.primitiveType = this.scene.gl.TRIANGLES;
		 this.initGLBuffers();
		};
	 };