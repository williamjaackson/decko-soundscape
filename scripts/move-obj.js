import { lastSelection, validateObjectPosition, placeObject, screenCellPos, objectInsideObject } from './grid.js';
import { itemData } from './inventory.js';
import { createObject } from './objects.js';
import { moveElement } from './spawning.js';

export let displayElementsContainer;

document.addEventListener('DOMContentLoaded', () => {
    displayElementsContainer = document.getElementById('display-elements');
})

export const ghost = {object: null};
let lastPosition;

function clearGhosts() {
    if (ghost.object) {
        displayElementsContainer.removeChild(ghost.object);
        ghost.object = null;
    }
}

export function setupObjectMovement(object) {
    object.addEventListener('mousedown', (event) => {
        event.preventDefault()
        clearGhosts()

        // Create a ghost object to show where the item will be dropped
        ghost.object = createObject(itemData(object.dataset.id));
        ghost.object.style.position = 'absolute';
        ghost.object.classList.add('moving-indicator');
        ghost.object.dataset.cellwidth = object.dataset.cellwidth
        ghost.object.dataset.cellheight = object.dataset.cellheight
        ghost.object.dataset.id = object.dataset.id
        displayElementsContainer.appendChild(ghost.object);
        moveElement(ghost.object, {x: event.pageX, y: event.pageY}, true);

        lastPosition = {x: object.dataset.cellx, y: object.dataset.celly}
        setTimeout(() => {lastSelection.object = ghost.object;}, 100)

        grid.removeChild(object);
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

        const object = createObject(itemData(ghost.object.dataset.id));
        object.style.position = 'absolute';
        object.classList.add('object');
        grid.appendChild(object);
        object.dataset.cellwidth = ghost.object.dataset.cellwidth;
        object.dataset.cellheight = ghost.object.dataset.cellheight;
        object.style.userSelect = 'none'

        if (objectInsideObject(cellPos.x, cellPos.y, parseInt(ghost.object.dataset.cellwidth), parseInt(ghost.object.dataset.cellheight))) {
            object.dataset.cellx = lastPosition.x
            object.dataset.celly = lastPosition.y
        } else if (validateObjectPosition(cellPos.x, cellPos.y, parseInt(ghost.object.dataset.cellwidth), parseInt(ghost.object.dataset.cellheight))) {
            object.dataset.cellx = cellPos.x - parseInt(ghost.object.dataset.cellwidth) / 2;
            object.dataset.celly = cellPos.y - parseInt(ghost.object.dataset.cellheight) / 2;
        } else {
            // delete object
            grid.removeChild(object)
        }

        placeObject(object)
        lastSelection.object = object;

        // moveElement(object, {x: event.pageX, y: event.pageY});
        clearGhosts()
    }
});