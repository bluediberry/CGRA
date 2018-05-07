/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
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
		var indice = 0;
		var altura = 1/this.stacks;
		var variacaoAltura = 0;

		this.vertices = [];
		this.indices = [];
		this.normals = [];

		
		for (var j = 0; j < this.stacks; j++) {

			this.vertices.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), variacaoAltura);
			this.normals.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), 0);

			this.vertices.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), variacaoAltura + altura);
			this.normals.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), 0);
			
			variacaoAngulo += angulo;


			for(var i = 0; i < this.slices; i++) {

				this.vertices.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), variacaoAltura);
				this.normals.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), 0);

				this.vertices.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), variacaoAltura + altura);
				this.normals.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), 0);
				
				variacaoAngulo += angulo;

				this.indices.push(indice + 2, indice + 1, indice);
				this.indices.push(indice + 1, indice + 2, indice + 3);


				indice += 2;

			}
			indice += 2;
			variacaoAltura += altura;
			var variacaoAngulo = 0;

		}
	
		 this.primitiveType = this.scene.gl.TRIANGLES;
		 this.initGLBuffers();
		};
	 };