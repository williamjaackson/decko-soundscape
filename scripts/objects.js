import { gridSettings, screenSettings, getScreenPosition } from './grid.js';
import { inventoryData } from './inventory.js';

export function itemData(itemID) {
    const itemData = inventoryData.items.find(item => item.id === itemID) 
    if (!itemData) return;
    return itemData;
}

export function itemPlacement(gridPos, itemData) {
    const itemGridSize = {
        width: itemData.width / gridSettings.cellSize,
        height: itemData.height / gridSettings.cellSize,
    }

    const itemGridPos = {
        col: gridPos.col - Math.round((itemGridSize.width + 0.5) / 2),
        row: gridPos.row - Math.round((itemGridSize.height + 0.5) / 2) ,
    }
    
    itemGridPos.col = Math.max(0, Math.min(itemGridPos.col, gridSettings.width - itemGridSize.width));
    itemGridPos.row = Math.max(0, Math.min(itemGridPos.row, gridSettings.height - itemGridSize.height));

    const screenPos = getScreenPosition(grid, itemGridPos.row, itemGridPos.col);
    const screenSize = {
        width: itemGridSize.width * screenSettings.cellSize,
        height: itemGridSize.height * screenSettings.cellSize,
    }

    const returnData = { position: screenPos, size: screenSize };
    return returnData;
}

export function createItem(size, itemData) {
    const item = document.createElement('img');
    item.src = itemData.image;
    item.alt = itemData.name;
    item.style.width = `${size.width}px`;
    item.style.height = `${size.height}px`;
    item.style.position = 'absolute';
    // item.style.left = `${position.x}px`;
    // item.style.top = `${position.y}px`;

    return item;

}

// This function creates an item and snaps it to the grid using grid coordinates
export function createItemOnGrid(grid, gridPos, itemID) {
    const itemData = inventoryData.items.find(item => item.id === itemID) 
    if (!itemData) return;

    const { position, size } = itemPlacement(gridPos, itemData);
    console.log(position, size)

    const newItem = document.createElement('img');
    newItem.src = itemData.image;
    newItem.style.width = `${size.width}px`;
    newItem.style.height = `${size.height}px`;
    newItem.style.position = 'absolute';
    newItem.style.left = `${position.x}px`;
    newItem.style.top = `${position.y}px`;

    // Append the new item to the grid
    grid.appendChild(newItem);
}