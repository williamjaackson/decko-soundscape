import { getGridPosition } from './grid.js';

export function inventoryItem(item) {
    let isDragging = false;
    let offsetX, offsetY;
    let clone = null;

    item.addEventListener('mousedown', (event) => {
        event.preventDefault();

        // Create a clone of the item for dragging
        clone = item.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.pointerEvents = 'none';
        clone.style.zIndex = 1000;
        clone.style.width = `${item.offsetWidth}px`;
        clone.style.height = `${item.offsetHeight}px`;
        clone.classList.add('item-indicator');
        document.body.appendChild(clone);

        // Calculate the offset between the mouse position and the top-left corner of the item
        const rect = item.getBoundingClientRect();
        // offsetX = event.clientX - rect.left;
        // offsetY = event.clientY - rect.top;
        
        // position mouse in the center
        offsetX = rect.width / 2;
        offsetY = rect.height / 2;

        // Start dragging
        isDragging = true;
        moveClone(event.pageX, event.pageY);
    });

    document.addEventListener('mousemove', (event) => {
        if (!isDragging || !clone) return;
        // Move the cloned item with the mouse
        moveClone(event.pageX, event.pageY);
    });

    document.addEventListener('mouseup', (event) => {
        if (isDragging) {
            // Calculate the grid position where the item was "dropped"
            const grid = document.getElementById('grid');
            const gridRect = grid.getBoundingClientRect();
            
            // Check if the item was dropped within the grid
            if (event.pageX >= gridRect.left && event.pageX <= gridRect.right && event.pageY >= gridRect.top && event.pageY <= gridRect.bottom) {
                const gridPos = getGridPosition(grid, event.pageX, event.pageY);
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
}
