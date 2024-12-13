import { Scene, Mesh, MeshBuilder, Color3, StandardMaterial } from '@babylonjs/core';
import { GridMaterial } from '@babylonjs/materials/grid';
import * as dat from 'dat.gui';

interface GridConfig {
    width: number;
    height: number;
    gridRatio: number;
    majorUnit: number;
    gridOpacity: number;
    mainColor: string;
    lineColor: string;
}

const gridConfig: GridConfig = {
    width: 10,
    height: 10,
    gridRatio: 1,
    majorUnit: 5,
    gridOpacity: 0.5,
    mainColor: "#FFFFFF",
    lineColor: "#808080"
};

export class GridSystem {
    private scene: Scene;
    private ground: Mesh | null = null;

    constructor(scene: Scene) {
        this.scene = scene;
        this.createGrid();
        this.setupGUI();
    }

    private createGrid(): void {
        if (this.ground) {
            this.ground.dispose();
        }

        this.ground = MeshBuilder.CreateGround("ground", {
            width: gridConfig.width,
            height: gridConfig.height,
            subdivisions: 1
        }, this.scene);

        if (GridMaterial) {
            const gridMaterial = new GridMaterial("gridMaterial", this.scene);
            gridMaterial.opacity = gridConfig.gridOpacity;
            gridMaterial.mainColor = Color3.FromHexString(gridConfig.mainColor);
            gridMaterial.lineColor = Color3.FromHexString(gridConfig.lineColor);
            gridMaterial.gridRatio = gridConfig.gridRatio;
            gridMaterial.majorUnitFrequency = gridConfig.majorUnit;
            gridMaterial.backFaceCulling = false;

            this.ground.material = gridMaterial;
        } else {
            console.error("GridMaterial isn't loaded!");
            const backupMaterial = new StandardMaterial("backupMaterial", this.scene);
            backupMaterial.wireframe = true;
            this.ground.material = backupMaterial;
        }
    }

    private updateGridMaterial(): void {
        if (this.ground?.material && this.ground.material.getClassName() === "GridMaterial") {
            const material = this.ground.material as GridMaterial;
            material.opacity = gridConfig.gridOpacity;
            material.mainColor = Color3.FromHexString(gridConfig.mainColor);
            material.lineColor = Color3.FromHexString(gridConfig.lineColor);
            material.gridRatio = gridConfig.gridRatio;
            material.majorUnitFrequency = gridConfig.majorUnit;
        }
    }

    private setupGUI(): void {
        const gui = new dat.GUI();
        const gridFolder = gui.addFolder('Grid Settings');
        
        gridFolder.add(gridConfig, 'width', 1, 50)
            .onChange(() => this.createGrid());
        
        gridFolder.add(gridConfig, 'height', 1, 50)
            .onChange(() => this.createGrid());
        
        gridFolder.add(gridConfig, 'gridRatio', 0.1, 5)
            .step(0.1)
            .onChange(() => this.updateGridMaterial());
        
        gridFolder.add(gridConfig, 'majorUnit', 1, 10)
            .step(1)
            .onChange(() => this.updateGridMaterial());
        
        gridFolder.add(gridConfig, 'gridOpacity', 0, 1)
            .onChange(() => this.updateGridMaterial());
        
        gridFolder.addColor(gridConfig, 'mainColor')
            .onChange(() => this.updateGridMaterial());
        
        gridFolder.addColor(gridConfig, 'lineColor')
            .onChange(() => this.updateGridMaterial());
        
        gridFolder.open();
    }

    public setGridSize(width: number, height: number): void {
        gridConfig.width = width;
        gridConfig.height = height;
        this.createGrid();
    }
} 