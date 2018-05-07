/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
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

			for(var i = 0; i < this.slices; i++) {

				this.vertices.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), variacaoAltura);
				this.vertices.push(Math.cos(variacaoAngulo + angulo), Math.sin(variacaoAngulo + angulo), variacaoAltura);
				this.vertices.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), variacaoAltura + altura);
				this.vertices.push(Math.cos(variacaoAngulo + angulo), Math.sin(variacaoAngulo + angulo), variacaoAltura + altura);
				this.indices.push(indice, indice + 1, indice + 2);
				this.indices.push(indice + 1, indice + 3, indice + 2);

				variacaoAngulo += angulo;

				this.normals.push(Math.cos(variacaoAngulo - angulo/2), Math.sin(variacaoAngulo - angulo/2), 0);
				this.normals.push(Math.cos(variacaoAngulo - angulo/2), Math.sin(variacaoAngulo - angulo/2), 0);
				this.normals.push(Math.cos(variacaoAngulo - angulo/2), Math.sin(variacaoAngulo - angulo/2), 0);
				this.normals.push(Math.cos(variacaoAngulo - angulo/2), Math.sin(variacaoAngulo - angulo/2), 0);

				indice += 4;

			}

			variacaoAltura += altura;
		}
	
		 this.primitiveType = this.scene.gl.TRIANGLES;
		 this.initGLBuffers();
		};
	 };