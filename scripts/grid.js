const gridSettings = {
    width: 60,
    height: 80,
    gridSize: 100,
};

let gridWrapper;
let grid;

export function initGrid() {
    gridWrapper = document.getElementById('grid-wrapper');
    grid = document.getElementById('grid');
    updateGrid(gridSettings.width, gridSettings.height);

    // Attach dragover and drop event listeners to the grid
    grid.addEventListener('dragover', handleDragOver);
    grid.addEventListener('drop', handleDrop);
}

// Handle the dragover event (needed to allow drop)
function handleDragOver(event) {
    event.preventDefault(); // Necessary to allow drop
    event.dataTransfer.dropEffect = 'move'; // Indicate that the item will be moved
}

// Handle the drop event
function handleDrop(event) {
    event.preventDefault(); // Prevent default behaviour

    // Get the item data (src and dimensions) from dataTransfer
    const itemData = JSON.parse(event.dataTransfer.getData('text/plain'));

    // Create a new image element to represent the dropped item
    const newItem = document.createElement('img');
    newItem.src = itemData.src;
    newItem.alt = 'Dropped item';
    newItem.classList.add('dropped-item', 'absolute', 'object-scale-down');
    newItem.style.width = '100px';  // You can change this to use item dimensions if available
    newItem.style.height = '100px';

    // Position the item relative to the grid based on drop coordinates
    const dropX = event.clientX - grid.getBoundingClientRect().left;
    const dropY = event.clientY - grid.getBoundingClientRect().top;
    newItem.style.position = 'absolute';
    newItem.style.left = `${dropX}px`;
    newItem.style.top = `${dropY}px`;

    // Append the new item to the grid
    grid.appendChild(newItem);
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

export function getGridPosition(grid, mouseX, mouseY) {
    const gridRect = grid.getBoundingClientRect();

    // Calculate the relative mouse position within the grid
    const xRelative = mouseX - gridRect.left;
    const yRelative = mouseY - gridRect.top;

    // Determine the size of a single cell based on the current grid settings
    const cellWidth = gridRect.width / gridSettings.width;
    const cellHeight = gridRect.height / gridSettings.height;

    // Calculate which cell the item was dropped on
    const col = Math.floor(xRelative / cellWidth);
    const row = Math.floor(yRelative / cellHeight);

    return { row, col };
}

// Expose gridSettings for external use (like in settings.js)
export { gridSettings };