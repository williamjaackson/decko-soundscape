document.addEventListener('DOMContentLoaded', () => {
    // Get all filter buttons
    const filterButtons = document.getElementById('filter-buttons').querySelectorAll('button');
    const inventoryContainer = document.getElementById('inventory');

    const activeFilters = {
        oak: false,
        ebondy: false,
        beech: false,
        maple: false,
    }

    filterButtons.forEach((button) => {
        button.style.borderColor = button.dataset.colour;
        button.style.color = button.dataset.colour;
        // hover color: white
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = button.dataset.colour;
            button.style.color = 'white';
        });
        button.addEventListener('mouseout', () => {
            // check if button is in active filters. if its not go back to default.
            if (!activeFilters[button.dataset.filter]) {
                button.style.backgroundColor = 'transparent';
                button.style.color = button.dataset.colour;
            }
        });
        button.addEventListener('click', () => {
            activeFilters[button.dataset.filter] = !activeFilters[button.dataset.filter];
            // update filter
            inventoryContainer.querySelectorAll('.inventory-item').forEach((item) => {
                // check if any filter is active
                if (!(activeFilters.oak || activeFilters.ebondy || activeFilters.beech || activeFilters.maple)) {
                    item.style.display = 'block';
                } else {
                    if (activeFilters[item.dataset.material]) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
            
    });
});