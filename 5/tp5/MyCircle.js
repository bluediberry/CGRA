/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCircle extends CGFobject
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

		this.texCoords = [];
		this.vertices.push(0,0,1);
		this.normals.push(0,0,1);
		this.texCoords.push(0.5,0.5);
		
		variacaoAngulo  = 0;
		this.vertices.push(Math.cos(variacaoAngulo ), Math.sin(variacaoAngulo ),1);
		this.normals.push(0,0,1);
		this.texCoords.push(0.5*Math.cos(variacaoAngulo )+0.5,-0.5*Math.sin(variacaoAngulo )+0.5);
		variacaoAngulo  += angulo;

		for (var i = 0; i < this.slices; i++){
			this.vertices.push(Math.cos(variacaoAngulo ), Math.sin(variacaoAngulo ),1);
			this.normals.push(0,0,1);
			this.texCoords.push(0.5*Math.cos(variacaoAngulo )+0.5,-0.5*Math.sin(variacaoAngulo )+0.5);

			this.indices.push(indice, indice + 1 + 1*i, indice + 2 + 1*i );
			variacaoAngulo  += angulo;
		}
			indice += this.slices + 2;


		 this.primitiveType = this.scene.gl.TRIANGLES;
		 this.initGLBuffers();
		};
	 };