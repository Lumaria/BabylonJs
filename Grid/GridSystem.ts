import { Scene, Mesh, MeshBuilder, Color3, Vector3 } from '@babylonjs/core';
import { GridMaterial } from '@babylonjs/materials/grid';
import * as dat from 'dat.gui';

interface GridConfig {
    width: number;
    height: number;
    length: number;
    gridRatio: number;
    majorUnit: number;
    gridOpacity: number;
    mainColor: string;
    lineColor: string;
    isVertical: boolean;
    verticalFaces: number;
}

export class GridSystem {
    private scene: Scene;
    private ground: Mesh | null = null;
    private static config: GridConfig = {
        width: 10, height: 10, length: 10,
        gridRatio: 1, majorUnit: 5, gridOpacity: 0.5,
        mainColor: "#FFFFFF", lineColor: "#808080",
        isVertical: false, verticalFaces: 1
    };

    constructor(scene: Scene) {
        this.scene = scene;
        this.createGrid();
        this.setupGUI();
    }

    private createGrid(): void {
        this.ground?.dispose();
        for (let i = 0; i < 4; i++) {
            this.scene.getMeshByName(`verticalGround_${i}`)?.dispose();
        }

        this.ground = MeshBuilder.CreateGround("ground", {
            width: GridSystem.config.width,
            height: GridSystem.config.length,
            subdivisions: 1
        }, this.scene);

        
        const material = new GridMaterial("gridMaterial", this.scene);
        this.setupGridMaterial(material);
        this.ground.material = material;

        
        if (GridSystem.config.isVertical && GridSystem.config.verticalFaces > 0) {
            [
                { 
                    dim: { w: GridSystem.config.width, h: GridSystem.config.height },
                    pos: new Vector3(0, GridSystem.config.height / 2, -GridSystem.config.length/2),
                    rot: new Vector3(Math.PI / 2, 0, 0)
                },
                { 
                    dim: { w: GridSystem.config.length, h: GridSystem.config.height },
                    pos: new Vector3(GridSystem.config.width/2, GridSystem.config.height / 2, 0),
                    rot: new Vector3(Math.PI / 2, Math.PI / 2, 0)
                },
                { 
                    dim: { w: GridSystem.config.width, h: GridSystem.config.height },
                    pos: new Vector3(0, GridSystem.config.height / 2, GridSystem.config.length/2),
                    rot: new Vector3(Math.PI / 2, Math.PI, 0)
                },
                { 
                    dim: { w: GridSystem.config.length, h: GridSystem.config.height },
                    pos: new Vector3(-GridSystem.config.width/2, GridSystem.config.height / 2, 0),
                    rot: new Vector3(Math.PI / 2, -Math.PI / 2, 0)
                }
            ].slice(0, GridSystem.config.verticalFaces).forEach((face, i) => {
                const grid = MeshBuilder.CreateGround(
                    `verticalGround_${i}`,
                    { width: face.dim.w, height: face.dim.h, subdivisions: 1 },
                    this.scene
                ) as Mesh;
                grid.position = face.pos;
                grid.rotation = face.rot;
                grid.material = new GridMaterial(`gridMaterial_${i}`, this.scene);
                this.setupGridMaterial(grid.material as GridMaterial);
            });
        }
    }

    private setupGridMaterial(material: GridMaterial): void {
        material.opacity = GridSystem.config.gridOpacity;
        material.mainColor = Color3.FromHexString(GridSystem.config.mainColor);
        material.lineColor = Color3.FromHexString(GridSystem.config.lineColor);
        material.gridRatio = GridSystem.config.gridRatio;
        material.majorUnitFrequency = GridSystem.config.majorUnit;
        material.backFaceCulling = false;
    }

    private setupGUI(): void {
        const gui = new dat.GUI();
        const folder = gui.addFolder('Grid Settings');
        
        const dimensions: (keyof GridConfig)[] = ['width', 'length', 'height'];
        
        dimensions.forEach(dim => {
            folder.add(GridSystem.config, dim, 1, 50)
                .name(`${dim.charAt(0).toUpperCase() + dim.slice(1)} (${dim === 'height' ? 'Y' : dim === 'width' ? 'X' : 'Z'})`)
                .onChange(() => this.createGrid());
        });
        
        folder.add(GridSystem.config, 'gridRatio', 0.1, 5).step(0.1).onChange(() => this.createGrid());
        folder.add(GridSystem.config, 'majorUnit', 1, 10).step(1).onChange(() => this.createGrid());
        folder.add(GridSystem.config, 'gridOpacity', 0, 1).onChange(() => this.createGrid());
        folder.addColor(GridSystem.config, 'mainColor').onChange(() => this.createGrid());
        folder.addColor(GridSystem.config, 'lineColor').onChange(() => this.createGrid());
        folder.add(GridSystem.config, 'isVertical').name('Vertical Grid').onChange(() => this.createGrid());
        folder.add(GridSystem.config, 'verticalFaces', 0, 4).step(1).onChange(() => this.createGrid());
        
        folder.open();
    }

    public setGridSize(width: number, height: number): void {
        GridSystem.config.width = width;
        GridSystem.config.height = height;
        this.createGrid();
    }

    public setVertical(isVertical: boolean): void {
        GridSystem.config.isVertical = isVertical;
        this.createGrid();
    }
} 