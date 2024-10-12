import { grid, lastSelection } from "./grid.js";
import { ghost as ghost1, displayElementsContainer } from "./move-obj.js";
import { ghost as ghost2 } from "./spawning.js";

window.addEventListener('keydown', (event) => {
    // backspace
    if (event.key === 'Backspace') {
        if (lastSelection.object) {
            // clear all ghosts
            if (ghost1.object) {
                displayElementsContainer.removeChild(ghost1.object);
                ghost1.object = null;
            }
            if (ghost2.object) {
                displayElementsContainer.removeChild(ghost2.object);
                ghost2.object = null;
            }

            // clear last selection
            if (grid.contains(lastSelection.object)) {
                grid.removeChild(lastSelection.object);
            }
            lastSelection.object = null;
        }
    }
});

// clear lastobject if clicked elsewhere on page
window.addEventListener('mousedown', (e) => {
    if (lastSelection.object) {
        lastSelection.object = null;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('delete-btn').addEventListener('click', () => {
        document.getElementById('modal').classList.remove('hidden');
    })

    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('modal').classList.add('hidden');
    })
    document.getElementById('close-modal-btn').addEventListener('click', () => {
        document.getElementById('modal').classList.add('hidden');
    })
    document.getElementById('modal-bg').addEventListener('click', () => {
        document.getElementById('modal').classList.add('hidden');
    })

    document.getElementById('confirm-modal-btn').addEventListener('click', () => {
        document.getElementById('modal').classList.add('hidden');
        [...grid.childNodes].forEach((object) => {
            grid.removeChild(object)
        })
        lastSelection.object = null;
    })
    
})