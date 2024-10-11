import { gridSettings, resizeGrid } from './grid.js';

// Cache DOM elements for room settings form
const roomWidth = document.getElementById('room-width');
const roomHeight = document.getElementById('room-height');
const saveRoomSettings = document.getElementById('save-room-settings');
const roomSettingsError = document.getElementById('room-settings-error');

// Initialize room settings and event listeners
export function initRoomSettings() {
    roomWidth.addEventListener('input', checkUnsavedChanges);
    roomHeight.addEventListener('input', checkUnsavedChanges);
    saveRoomSettings.addEventListener('click', saveNewRoomSettings);

    // Set initial grid size from input
    gridSettings.width = Math.floor(parseInt(roomWidth.value) / gridSettings.gridSize);
    gridSettings.height = Math.floor(parseInt(roomHeight.value) / gridSettings.gridSize);
    resizeGrid();
}

// Check for unsaved changes and show the save button if necessary
function checkUnsavedChanges() {
    const currentWidth = Math.floor(parseInt(roomWidth.value) / gridSettings.gridSize);
    const currentHeight = Math.floor(parseInt(roomHeight.value) / gridSettings.gridSize);

    if (currentWidth !== gridSettings.width || currentHeight !== gridSettings.height) {
        saveRoomSettings.classList.remove('hidden');
    }
}

// Save new grid settings if valid
function saveNewRoomSettings() {
    const width = parseInt(roomWidth.value);
    const height = parseInt(roomHeight.value);

    if (!validateRoomDimensions(width, height)) {
        return;
    }

    gridSettings.width = Math.floor(width / gridSettings.gridSize);
    gridSettings.height = Math.floor(height / gridSettings.gridSize);

    saveRoomSettings.classList.add('hidden');
    resizeGrid();
}

// Validate room dimensions input
function validateRoomDimensions(width, height) {
    if (width === '' || height === '') {
        showError('Value cannot be empty');
        return false;
    }

    if (isNaN(width) || isNaN(height)) {
        showError('Value must be a number');
        return false;
    }

    if (width < 100 || height < 100) {
        showError('Value cannot be less than 100mm');
        return false;
    }

    if (width >= 20000 || height >= 20000) {
        showError('Value cannot exceed 20,000mm');
        return false;
    }

    hideError();
    return true;
}

// Display an error message
function showError(message) {
    roomSettingsError.innerHTML = message;
    roomSettingsError.classList.remove('hidden');
}

// Hide the error message
function hideError() {
    roomSettingsError.classList.add('hidden');
}
