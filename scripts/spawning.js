import { 
    lastSelection,
    screenCellPos, 
    cellScreenPos, 
    validateObjectPosition,
    grid,
    placeObject,
} from './grid.js';
import { createObject } from './objects.js';
import { itemData } from './inventory.js';

let displayElementsContainer;

document.addEventListener('DOMContentLoaded', () => {
    displayElementsContainer = document.getElementById('display-elements');
})

export const ghost = {object: null};
// let ghostItem;

function clearGhosts() {
    if (ghost.object) {
        displayElementsContainer.removeChild(ghost.object);
        ghost.object = null;
    }
    // if (ghostItem) {
    //     displayElementsContainer.removeChild(ghostItem);
    //     ghostItem = null;
    // }
}

export function moveElement(element, {x = element.offsetLeft, y = element.offsetTop}, snapToGrid = false) {
    if (snapToGrid) {
        let cellPos = screenCellPos(x, y);
        let screenPos = cellScreenPos(cellPos.x, cellPos.y);

        x = screenPos.x;
        y = screenPos.y;

        // check if element is inside the grid. if its not hide it.
        if (!validateObjectPosition(cellPos.x , cellPos.y, parseInt(element.dataset.cellwidth), parseInt(element.dataset.cellheight))) {
            // element.style.display = 'none';
            // red overlay
            element.style.backgroundColor = 'rgba(255, 0, 0, 1)';
        } else {
            // element.style.display = 'block';
            element.style.backgroundColor = 'transparent';
        }
    }
    element.style.left = `${x - element.offsetWidth / 2}px`;
    element.style.top = `${y - element.offsetHeight / 2}px`;
}

export function inventoryItem(item) {

    item.addEventListener('mousedown', (event) => {
        event.preventDefault()
        clearGhosts()

        // Create a ghost object to show where the item will be dropped
        ghost.object = createObject(itemData(item.dataset.id));
        ghost.object.style.position = 'absolute';
        ghost.object.classList.add('spawning-indicator');
        ghost.object.dataset.cellwidth = itemData(item.dataset.id).width;
        ghost.object.dataset.cellheight = itemData(item.dataset.id).height;
        ghost.object.dataset.id = item.dataset.id
        displayElementsContainer.appendChild(ghost.object);
        moveElement(ghost.object, {x: event.pageX, y: event.pageY}, true);
        
        lastSelection.object = ghost.object;
        
        // Create a clone of the item for dragging
        // ghostItem = item.cloneNode(true);
        // ghostItem.style.position = 'absolute';
        // ghostItem.style.width = `${item.offsetWidth}px`;
        // ghostItem.style.height = `${item.offsetHeight}px`;
        // ghostItem.classList.add('spawning-indicator', 'bg-white', 'rounded-md');

        // displayElementsContainer.appendChild(ghostItem);
        // moveElement(ghostItem, {x: event.pageX, y: event.pageY});
    });

    
}

window.addEventListener('mousemove', (event) => {
    if (ghost.object) {
        event.preventDefault();
        moveElement(ghost.object, {x: event.pageX, y: event.pageY}, true);
    }
    // if (ghostItem) {
    //     event.preventDefault();
    //     moveElement(ghostItem, {x: event.pageX, y: event.pageY});
    // }
});

window.addEventListener('mouseup', (event) => {
    if (ghost.object) { // && ghostItem
        let cellPos = screenCellPos(event.pageX, event.pageY);

        if (validateObjectPosition(cellPos.x, cellPos.y, parseInt(ghost.object.dataset.cellwidth), parseInt(ghost.object.dataset.cellheight))) {
            const object = createObject(itemData(ghost.object.dataset.id));
            object.style.position = 'absolute';
            object.classList.add('object');
            grid.appendChild(object);
            object.dataset.cellx = cellPos.x - parseInt(ghost.object.dataset.cellwidth) / 2;
            object.dataset.celly = cellPos.y - parseInt(ghost.object.dataset.cellheight) / 2;
            object.dataset.cellwidth = ghost.object.dataset.cellwidth;
            object.dataset.cellheight = ghost.object.dataset.cellheight;
            object.style.userSelect = 'none'
            placeObject(object)
            lastSelection.object = object;
        }

        // moveElement(object, {x: event.pageX, y: event.pageY});
        clearGhosts()
    }
});