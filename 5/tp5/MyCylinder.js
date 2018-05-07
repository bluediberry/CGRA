/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
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
		var angulo = (2*Math.PI)/this.slices;
		var variacaoAngulo = 0;
		var indice = 0;
		var altura = 1/this.stacks;
		var variacaoAltura = 0;

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var variacaoS = 1/this.slices;
		var variacaoT = 1/this.stacks;
	
		this.maxT = 1; 

	/*	var variacaoS = 1/this.slices;
		var variacaoT = 1/this.stacks;
	
		var t = 1; */

		
		for (var j = 0; j < this.stacks; j++) {

			this.minS = 0;

			this.vertices.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), variacaoAltura);
			this.normals.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), 0);

			this.vertices.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), variacaoAltura + altura);
			this.normals.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), 0);
			
			this.texCoords.push(this.minS, this.maxT);
			this.texCoords.push(this.minS, this.maxT - variacaoT);
			
			this.minS += variacaoS;

			variacaoAngulo += angulo;



			for(var i = 0; i < this.slices; i++) {

				this.vertices.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), variacaoAltura);
				this.normals.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), 0);

				this.vertices.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), variacaoAltura + altura);
				this.normals.push(Math.cos(variacaoAngulo), Math.sin(variacaoAngulo), 0);
				
				variacaoAngulo += angulo;

				this.indices.push(indice + 2, indice + 1, indice);
				this.indices.push(indice + 1, indice + 2, indice + 3);

				this.texCoords.push(this.minS, this.maxT);
				this.texCoords.push(this.minS, this.maxT - variacaoT);
				
				this.minS += variacaoS;

				indice += 2;

			}
			indice += 2;
			variacaoAltura += altura;
			var variacaoAngulo = 0;
			this.maxT -= variacaoT;

		}
	
		 this.primitiveType = this.scene.gl.TRIANGLES;
		 this.initGLBuffers();
		};
	 };