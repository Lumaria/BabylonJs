# BabylonJS GridSystem

A customizable grid system for BabylonJS with an interactive GUI interface.

## Features

- Resizable grid with width and height controls
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
```

## Configuration

The grid system offers the following parameters:

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| width | Grid width | 10 |
| height | Grid height | 10 |
| gridRatio | Spacing between lines | 1 |
| majorUnit | Frequency of major lines | 5 |
| gridOpacity | Grid opacity | 0.5 |
| mainColor | Main color | #FFFFFF |
| lineColor | Line color | #808080 |

## License

MIT