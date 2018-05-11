/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
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

	this.initBuffers();
	};


	initBuffers() 
	{

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var angulo = (2*Math.PI)/this.slices;
		var variacaoAngulo = 0;
		var indice = 0;
		var altura = 1/this.stacks;
		var variacaoAltura = 0;

		var variacaoS = 1/this.slices;
		var variacaoT = 1/this.stacks;
	
		this.maxT = 1;
	
		for (var j = 0; j < this.stacks; j++) {

			this.minS = 0;

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

				this.texCoords.push(this.minS, this.maxT);
				this.texCoords.push(this.minS + variacaoS, this.maxT);
				this.texCoords.push(this.minS, this.maxT - variacaoT);
				this.texCoords.push(this.minS + variacaoS, this.maxT - variacaoT);
						
				indice += 4;
				this.minS += variacaoS;

			}

			variacaoAltura += altura;
			this.maxT -= variacaoT;
		}
	
		 this.primitiveType = this.scene.gl.TRIANGLES;
		 this.initGLBuffers();
		};
	 };