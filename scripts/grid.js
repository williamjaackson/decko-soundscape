const gridSettings = {
    width: 30,
    height: 30,
    cellSize: null,      
};

export const lastSelection = {
    object: null,
}

// const screenSettings = {
//     gridWidth: null,
//     gridHeight: null,
//     cellSize: null,
// }

let gridWrapper;
let grid;
let gridRect;

document.addEventListener('DOMContentLoaded', () => {
    gridWrapper = document.getElementById('grid-wrapper');
    grid = document.getElementById('grid');
    
    window.addEventListener('resize', updateGrid)
    setTimeout(updateGrid, 100)
});

// Update the grid dimensions and layout
export function updateGrid() {
    // set height and width to zero
    gridWrapper.removeChild(grid);

    const cellWidth = gridWrapper.clientWidth / gridSettings.width;
    const cellHeight = gridWrapper.clientHeight / gridSettings.height;
    gridSettings.cellSize = Math.min(cellWidth, cellHeight);

    grid.style.width = `${gridSettings.cellSize * gridSettings.width}px`;
    grid.style.height = `${gridSettings.cellSize * gridSettings.height}px`;
    grid.style.backgroundSize = `${gridSettings.cellSize}px ${gridSettings.cellSize}px`;
    grid.style.backgroundPosition = `-${gridSettings.cellSize / 2}px -${gridSettings.cellSize / 2}px`;
    // remove the parts of the grid that are outside the grid
    grid.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%)`;

    gridWrapper.appendChild(grid);

    gridRect = grid.getBoundingClientRect();

    // update positions of each child
    grid.querySelectorAll('.object').forEach((object) => {
        placeObject(object);
        // check if the object is outside the grid
        if (!objectInsideGrid(parseInt(object.dataset.cellx), parseInt(object.dataset.celly), parseInt(object.dataset.cellwidth), parseInt(object.dataset.cellheight), false)) {
            grid.removeChild(object)
        }
    })
}

// Calculate the grid position (row/col) based on screen mouse coordinates
export function getGridPosition(grid, mouseX, mouseY) {
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

// Convert the grid (row/col) back into screen coordinates for absolute positioning
export function getScreenPosition(grid, row, col) {
    // Determine the size of a single cell based on the current grid settings
    const cellWidth = gridRect.width / gridSettings.width;
    const cellHeight = gridRect.height / gridSettings.height;

    // Calculate the screen position for the given row and col
    const xScreen = gridRect.left + col * cellWidth;
    const yScreen = gridRect.top + row * cellHeight;

    return { x: xScreen, y: yScreen };
}

// Expose gridSettings for external use (like in settings.js)
export { grid, gridSettings };

// takes in a screen position, outputs the cell position
export function screenCellPos(screenX, screenY) {
    // Calculate the relative mouse position within the grid
    const xRelative = screenX - gridRect.left;
    const yRelative = screenY - gridRect.top;
    
    // Determine the size of a single cell based on the current grid settings
    const cellWidth = gridRect.width / gridSettings.width;
    const cellHeight = gridRect.height / gridSettings.height;
    
    // Calculate which cell the item was dropped on
    const x = Math.floor(xRelative / cellWidth);
    const y = Math.floor(yRelative / cellHeight);

    return { x, y };
    
}

export function cellScreenPos(cellX, cellY) {
    let x = gridRect.left + cellX * gridSettings.cellSize;
    let y = gridRect.top + cellY * gridSettings.cellSize;

    return { x, y };
}

export function objectInsideGrid(cellX, cellY, cellWidth, cellHeight, centered = true) {
    if (centered) {
        cellX = cellX - (cellWidth / 2)
        cellY = cellY - (cellHeight / 2)
    }

    let insideLeft = (cellX + cellWidth) > 0
    let insideRight = (cellX) < gridSettings.width
    let insideTop = (cellY + cellHeight) > 0
    let insideBottom = (cellY) < gridSettings.height

    return insideLeft && insideRight && insideTop && insideBottom;
}

export function objectInsideObject(cellX, cellY, cellWidth, cellHeight) {
    cellX = cellX - (cellWidth / 2)
    cellY = cellY - (cellHeight / 2)

    let collision = false;
    grid.querySelectorAll('.object').forEach((object) => {
        const objectCellX = parseInt(object.dataset.cellx)
        const objectCellY = parseInt(object.dataset.celly)
        const objectCellWidth = parseInt(object.dataset.cellwidth)
        const objectCellHeight = parseInt(object.dataset.cellheight)

        if (cellX < objectCellX + objectCellWidth && cellX + cellWidth > objectCellX && cellY < objectCellY + objectCellHeight && cellY + cellHeight > objectCellY) {
            collision = true;
        }
    })

    return collision;
}

export function validateObjectPosition(cellX, cellY, cellWidth, cellHeight)  {
    const insideBounds = objectInsideGrid(cellX, cellY, cellWidth, cellHeight);
    const insideObject = objectInsideObject(cellX, cellY, cellWidth, cellHeight);

    return insideBounds && !insideObject
}

export function placeObject(object) {
    let cellPos = {x: object.dataset.cellx, y: object.dataset.celly}
    let screenPos = cellScreenPos(cellPos.x, cellPos.y);
    object.style.left = `${screenPos.x}px`;
    object.style.top = `${screenPos.y}px`;

    object.style.width = `${object.dataset.cellwidth * gridSettings.cellSize}px`;
    object.style.height = `${object.dataset.cellheight * gridSettings.cellSize}px`;
}