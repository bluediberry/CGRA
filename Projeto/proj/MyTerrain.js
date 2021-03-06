class MyTerrain extends CGFobject{

	//var TERRAIN_DIVISIONS = 100;
  
	constructor(scene)
	{
		super(scene);
		
	  this.terrain = new Plane(this.scene, 100);
  
  
		  // Terrain Texture
			this.terrainTexture = new CGFappearance(this.scene);
			this.terrainTexture.loadTexture('../resources/images/terrain8.png');
			//this.terrainTexture.setTextureWrap("REPEAT","REPEAT");
			this.terrainTexture.setAmbient(0.3,0.3,0.3,1);
			this.terrainTexture.setDiffuse(0.8,0.8,0.8,1);
			this.terrainTexture.setSpecular(0.33,0.18,0.05,1);
			this.terrainTexture.setShininess(1);

			this.initBuffers();
	};
  
	display(){
		this.scene.pushMatrix();
		if (typeof this.terrainTexture !== 'undefined') this.terrainTexture.apply();
		this.scene.translate(0, 0, 0);
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
		this.scene.scale(50, 50, 0.2);
		this.terrain.display();
	  this.scene.popMatrix();
	};
  }