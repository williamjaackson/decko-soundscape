import { 
    screenCellPos, 
    cellScreenPos, 
    objectInsideGrid,
    grid,
    placeObject
} from './grid.js';
import { createObject } from './objects.js';
import { itemData } from './inventory.js';

let displayElementsContainer;

document.addEventListener('DOMContentLoaded', () => {
    displayElementsContainer = document.getElementById('display-elements');
})

let ghostObject;
let ghostItem;

function clearGhosts() {
    if (ghostObject) {
        displayElementsContainer.removeChild(ghostObject);
        ghostObject = null;
    }
    if (ghostItem) {
        displayElementsContainer.removeChild(ghostItem);
        ghostItem = null;
    }
}

function moveElement(element, {x = element.offsetLeft, y = element.offsetTop}, snapToGrid = false) {
    if (snapToGrid) {
        let cellPos = screenCellPos(x, y);
        let screenPos = cellScreenPos(cellPos.x, cellPos.y);

        x = screenPos.x;
        y = screenPos.y;
        
        // check if element is inside the grid. if its not hide it.
        if (!objectInsideGrid(cellPos.x , cellPos.y, parseInt(element.dataset.cellwidth), parseInt(element.dataset.cellheight))) {
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
        ghostObject = createObject(itemData(item.dataset.id));
        ghostObject.style.position = 'absolute';
        ghostObject.classList.add('spawning-indicator');
        ghostObject.dataset.cellwidth = itemData(item.dataset.id).width;
        ghostObject.dataset.cellheight = itemData(item.dataset.id).height;
        displayElementsContainer.appendChild(ghostObject);
        moveElement(ghostObject, {x: event.pageX, y: event.pageY}, true);
        
        // Create a clone of the item for dragging
        ghostItem = item.cloneNode(true);
        ghostItem.style.position = 'absolute';
        ghostItem.style.width = `${item.offsetWidth}px`;
        ghostItem.style.height = `${item.offsetHeight}px`;
        ghostItem.classList.add('spawning-indicator', 'bg-white', 'rounded-md');

        displayElementsContainer.appendChild(ghostItem);
        moveElement(ghostItem, {x: event.pageX, y: event.pageY});
    });

    
}

window.addEventListener('mousemove', (event) => {
    if (ghostObject) {
        event.preventDefault();
        moveElement(ghostObject, {x: event.pageX, y: event.pageY}, true);
    }
    if (ghostItem) {
        event.preventDefault();
        moveElement(ghostItem, {x: event.pageX, y: event.pageY});
    }
});

window.addEventListener('mouseup', (event) => {
    if (ghostItem && ghostObject) {
        let cellPos = screenCellPos(event.pageX, event.pageY);
        let screenPos = cellScreenPos(cellPos.x, cellPos.y);

        if (objectInsideGrid(cellPos.x, cellPos.y, parseInt(ghostObject.dataset.cellwidth), parseInt(ghostObject.dataset.cellheight))) {
            const object = createObject(itemData(ghostItem.dataset.id));
            object.style.position = 'absolute';
            object.classList.add('object');
            grid.appendChild(object);
            object.dataset.cellx = cellPos.x - parseInt(ghostObject.dataset.cellwidth) / 2;
            object.dataset.celly = cellPos.y - parseInt(ghostObject.dataset.cellheight) / 2;
            object.dataset.cellwidth = ghostObject.dataset.cellwidth;
            object.dataset.cellheight = ghostObject.dataset.cellheight;
            // object.style.left = `${screenPos.x - object.offsetWidth / 2}px`;
            // object.style.top = `${screenPos.y - object.offsetHeight / 2}px`;
            placeObject(object)
        }

        // moveElement(object, {x: event.pageX, y: event.pageY});
        clearGhosts()
    }
});