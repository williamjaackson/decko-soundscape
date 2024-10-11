{/* <div class="flex flex-col justify-center" title="DECKO SOUNDSCAPE Acoustic Wall - OAK - Square - Price/Box of 5 Panels">
        <img src="./images/oak-square.png" alt="Item 1" class="w-full object-scale-down aspect-square bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-md p-3" draggable="false">
        <span class="text-sm font-bold w-min mx-auto">600x600</span>
    </div> */}

document.addEventListener('DOMContentLoaded', () => {
    // load all items from items.json
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            // create inventory list
            const inventoryList = document.getElementById('inventory');
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('flex', 'flex-col', 'justify-center', 'select-none');
                itemDiv.title = item.title;

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

                inventoryList.appendChild(itemDiv);
            });
        });
});