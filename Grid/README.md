# BabylonJS GridSystem

A customizable grid system for BabylonJS with an interactive GUI interface, supporting both horizontal and vertical grids.

## Features

- Fully customizable grid dimensions (X, Y, Z)
- Support for horizontal ground grid
- Support for up to 4 vertical wall grids
- Color customization (main and secondary lines)
- Opacity control
- Grid ratio adjustment
- Major unit configuration
- Interactive user interface with dat.gui

## Installation

```bash
npm install @babylonjs/core @babylonjs/materials dat.gui
```

## Usage

```typescript
import { Scene } from '@babylonjs/core';
import { GridSystem } from './GridSystem';

// Create a BabylonJS scene
const scene = new Scene(engine);

// Initialize the grid system
const gridSystem = new GridSystem(scene);

// Optional: Modify grid size programmatically
gridSystem.setGridSize(20, 20);

// Optional: Toggle vertical grids
gridSystem.setVertical(true);
```

## Configuration

The grid system offers the following parameters:

| Parameter | Description | Default Value | Range |
|-----------|-------------|---------------|--------|
| width | Grid width (X axis) | 10 | 1-50 |
| length | Grid length (Z axis) | 10 | 1-50 |
| height | Grid height (Y axis) | 10 | 1-50 |
| gridRatio | Spacing between lines | 1 | 0.1-5 |
| majorUnit | Frequency of major lines | 5 | 1-10 |
| gridOpacity | Grid opacity | 0.5 | 0-1 |
| mainColor | Main color | #FFFFFF | color |
| lineColor | Line color | #808080 | color |
| isVertical | Enable vertical grids | false | boolean |
| verticalFaces | Number of vertical faces | 0 | 0-4 |

## Methods

### setGridSize(width: number, height: number)
Programmatically modify the grid dimensions.

### setVertical(isVertical: boolean)
Toggle vertical grid faces on/off.

## License

MIT