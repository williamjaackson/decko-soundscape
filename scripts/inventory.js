import { inventoryItem } from './spawning.js';

const inventoryList = document.getElementById('inventory');
const inventoryData = {}

document.addEventListener('DOMContentLoaded', () => {
    // Load all items from items.json
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            // Create inventory list and store the data
            inventoryData.items = data;
            // Create inventory list
            data.forEach(item => {
                const itemWrapper = document.createElement('div');

                const itemDiv = document.createElement('div');
                itemDiv.classList.add('flex', 'flex-col', 'justify-center', 'select-none');
                itemDiv.title = item.title;
                itemDiv.dataset.id = item.id; // Store the item ID

                const itemImage = document.createElement('img');
                itemImage.src = item.image;
                itemImage.alt = item.name;
                itemImage.classList.add('w-full', 'object-scale-down', 'aspect-square', 'bg-slate-200', 'hover:bg-slate-300', 'cursor-pointer', 'rounded-md', 'p-3');
                itemImage.draggable = false;

                const itemName = document.createElement('span');
                itemName.classList.add('text-sm', 'font-bold', 'w-min', 'mx-auto');
                itemName.innerHTML = `${item.width}x${item.height}`;

                itemDiv.appendChild(itemImage);
                itemDiv.appendChild(itemName);

                itemWrapper.appendChild(itemDiv);
                inventoryList.appendChild(itemWrapper);

                inventoryItem(itemDiv); // Attach the drag and drop behavior
            });
        });
});

export function itemData(itemID) {
    const itemData = inventoryData.items.find(item => item.id === itemID) 
    if (!itemData) return;
    return itemData;
}