const gridSettings = {
    width: 60,
    height: 80,
    gridSize: 100,
};

let gridWrapper;
let grid;

// Initialize grid and set up the initial layout
export function initGrid() {
    gridWrapper = document.getElementById('grid-wrapper');
    grid = document.getElementById('grid');
    updateGrid(gridSettings.width, gridSettings.height);
}

// Resize the grid based on available space
export function resizeGrid() {
    updateGrid(gridSettings.width, gridSettings.height);
}

// Update the grid dimensions and layout
function updateGrid(gridWidth, gridHeight) {
    clearGrid();

    const cellWidth = gridWrapper.clientWidth / gridWidth;
    const cellHeight = gridWrapper.clientHeight / gridHeight;
    const cellSize = Math.min(cellWidth, cellHeight);

    grid.style.width = `${cellSize * gridWidth}px`;
    grid.style.height = `${cellSize * gridHeight}px`;
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${gridWidth}, minmax(0, 1fr))`;
    grid.style.gridTemplateRows = `repeat(${gridHeight}, minmax(0, 1fr))`;
    grid.style.backgroundImage = `radial-gradient(rgb(100 116 139 / 0.2) 1px, transparent 0), radial-gradient(rgb(100 116 139 / 0.2) 1px, transparent 0)`;
    grid.style.backgroundSize = `${cellSize}px ${cellSize}px`;
    grid.style.backgroundPosition = `-${cellSize / 2}px -${cellSize / 2}px`;
}

// Clear the current grid and create a new one
function clearGrid() {
    if (grid) {
        gridWrapper.removeChild(grid);
    }
    grid = document.createElement('div');
    grid.id = 'grid';
    grid.classList.add('bg-white');
    gridWrapper.appendChild(grid);
}

// Expose gridSettings for external use (like in settings.js)
export { gridSettings };
