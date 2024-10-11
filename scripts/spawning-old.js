// import { getGridPosition } from './grid.js';
// import { createItemOnGrid, itemPlacement, createItem } from './objects.js';

export function inventoryItem(item) {
    let isDragging = false;
    let offsetX, offsetY;
    let clone = null;
    let ghostItem = null;

    item.addEventListener('mousedown', (event) => {
        event.preventDefault();

        // Create a clone of the item for dragging
        clone = item.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.pointerEvents = 'none';
        clone.style.zIndex = 1000;
        clone.style.opacity = 0.5;
        clone.style.width = `${item.offsetWidth}px`;
        clone.style.height = `${item.offsetHeight}px`;
        clone.classList.add('item-indicator');
        document.body.appendChild(clone);

        // create a ghost item to show where the item will be dropped
        
        const { size: ghostSize } = itemPlacement({x: 0, y: 0}, itemData(item.dataset.id));
        ghostItem = createItem(ghostSize, { id: item.dataset.id, name: item.title, image: item.querySelector('img').src });

        ghostItem.classList.add('item-indicator');
        ghostItem.style.opacity = 0.5;
        document.body.appendChild(ghostItem);

        // Center the item on the mouse
        const rect = item.getBoundingClientRect();
        offsetX = rect.width / 2;
        offsetY = rect.height / 2;

        // Start dragging
        isDragging = true;
        moveClone(event.pageX, event.pageY);
        moveGhost(event.pageX, event.pageY);
    });
    
    document.addEventListener('mousemove', (event) => {
        if (!isDragging || !clone) return;
        // Move the cloned item with the mouse
        moveClone(event.pageX, event.pageY);
        moveGhost(event.pageX, event.pageY);
    });

    document.addEventListener('mouseup', (event) => {
        if (isDragging) {
            const grid = document.getElementById('grid');
            const gridWrapper = document.getElementById('grid-wrapper');
            const gridRect = gridWrapper.getBoundingClientRect();
            
            // Check if the item was dropped within the grid
            if (event.pageX >= gridRect.left && event.pageX <= gridRect.right && event.pageY >= gridRect.top && event.pageY <= gridRect.bottom) {
                const gridPos = getGridPosition(grid, event.pageX, event.pageY);
                
                // Spawn the item at the calculated grid position
                
                createItemOnGrid(grid, gridPos, item.dataset.id);
                console.log(`Item ID: ${item.dataset.id}, Dropped at:`, gridPos);
            } else {
                console.log('Dropped outside the grid');
            }
            
            // Clean up
            isDragging = false;
            if (clone) {
                document.body.removeChild(clone);
                clone = null;
            }
            document.querySelectorAll('.item-indicator').forEach(indicator => indicator.remove());
        }
    });
    
    // Helper to move the clone along with the mouse
    function moveClone(pageX, pageY) {
        clone.style.left = `${pageX - offsetX}px`;
        clone.style.top = `${pageY - offsetY}px`;
    }
    
    function moveGhost(pageX, pageY) {
        const gridWrapper = document.getElementById('grid-wrapper');
        const gridRect = gridWrapper.getBoundingClientRect();
        if (pageX >= gridRect.left && pageX <= gridRect.right && pageY >= gridRect.top && pageY <= gridRect.bottom) {
            ghostItem.style.display = 'block';
        } else {
            ghostItem.style.display = 'none';
        }

        const { position: ghostPosition, size: ghostSize } = itemPlacement(getGridPosition(grid, pageX, pageY), itemData(item.dataset.id));
        ghostItem.style.left = `${ghostPosition.x}px`;
        ghostItem.style.top = `${ghostPosition.y}px`;
    }
}
