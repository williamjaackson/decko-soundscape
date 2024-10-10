const gridSettings = {
    width: 60,
    height: 80,
    gridSize: 200,
}

function clearGrid() {
    const grid = document.getElementById('grid');
    const gridWrapper = document.getElementById('grid-wrapper');
    // remove grid from wrapper
    gridWrapper.removeChild(grid);

    // make new grid
    const newGrid = document.createElement('div');
    newGrid.id = 'grid';
    // overlay border on content
    newGrid.classList.add('bg-white');

    gridWrapper.appendChild(newGrid);
}

function resizeGrid() {
    clearGrid();

    const grid = document.getElementById('grid');
    const gridWrapper = document.getElementById('grid-wrapper');

    // find the size of the space available for the grid
    const gridWidth = gridWrapper.clientWidth;
    const gridHeight = gridWrapper.clientHeight;

    // Calculate the maximum width and height for each cell
    const cellWidth = gridWidth / gridSettings.width;
    const cellHeight = gridHeight / gridSettings.height;

    // choose the minimum of the two
    const cellSize = Math.min(cellWidth, cellHeight);

    // set the grid size
    grid.style.width = `${cellSize * gridSettings.width}px`;
    grid.style.height = `${cellSize * gridSettings.height}px`;

    // set columns and rows
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${gridSettings.width}, minmax(0, 1fr))`;
    grid.style.gridTemplateRows = `repeat(${gridSettings.height}, minmax(0, 1fr))`;

    grid.style.backgroundColor = '#fff';
    // grid.style.backgroundImage = `radial-gradient(black 1px, transparent 0), radial-gradient(black 1px, transparent 0)`;
    // slate:
    grid.style.backgroundImage = `radial-gradient(rgb(100 116 139 / 0.2) 1px, transparent 0), radial-gradient(rgb(100 116 139 / 0.2) 1px, transparent 0)`;
    grid.style.backgroundSize = `${cellSize}px ${cellSize}px`;
    grid.style.backgroundPosition = `-${cellSize / 2}px -${cellSize / 2}px`;

    // for (let i = 0; i < gridSettings.width; i++) {
    //     for (let j = 0; j < gridSettings.height; j++) {
    //         const cell = document.createElement('div');
    //         // cell.classList.add('hover:bg-slate-100', 'hover:scale-150', 'transition-all');
    //         grid.appendChild(cell);
    //     }
    // }

}

resizeGrid();
window.addEventListener('resize', resizeGrid);


document.addEventListener('DOMContentLoaded', () => {
    // get #room-width
    const roomWidth = document.getElementById('room-width');
    const roomHeight = document.getElementById('room-height');
    const saveRoomSettings = document.getElementById('save-room-settings');
    const roomSettingsError = document.getElementById('room-settings-error');

    gridSettings.width = Math.floor(parseInt(roomWidth.value) / gridSettings.gridSize);
    gridSettings.height = Math.floor(parseInt(roomHeight.value) / gridSettings.gridSize);
    resizeGrid();

    function unsavedDimensions() {
        if (roomWidth.value !== gridSettings.width || roomHeight.value !== gridSettings.height) {
            saveRoomSettings.classList.remove('hidden');
        }
    }

    // listen for changes
    roomWidth.addEventListener('input', unsavedDimensions);
    roomHeight.addEventListener('input', unsavedDimensions);

    // get #save-room-settings
    saveRoomSettings.addEventListener('click', () => {
        if (roomWidth.value === '' || roomHeight.value === '') {
            // highlight error and show error
            roomSettingsError.innerHTML = 'value cannot be empty';
            roomSettingsError.classList.remove('hidden');

            return;
        }

        // check if numbers
        if (isNaN(roomWidth.value) || isNaN(roomHeight.value)) {
            // highlight error and show error
            roomSettingsError.innerHTML = 'value must be a number';
            roomSettingsError.classList.remove('hidden');

            return;
        }

        if (roomWidth.value < 100 || roomHeight.value < 100) {
            // highlight error and show error
            roomSettingsError.innerHTML = 'value cannot be less than 100mm';
            roomSettingsError.classList.remove('hidden');

            return;
        }

        if (roomWidth.value >= 20000 || roomHeight.value >= 20000) {
            // highlight error and show error
            roomSettingsError.innerHTML = 'value cannot exceed 20,000mm';
            roomSettingsError.classList.remove('hidden');

            return;
        }

        gridSettings.width = Math.floor(parseInt(roomWidth.value) / gridSettings.gridSize);
        gridSettings.height = Math.floor(parseInt(roomHeight.value) / gridSettings.gridSize);

        console.log(gridSettings);

        saveRoomSettings.classList.add('hidden');

        resizeGrid();
    });
});