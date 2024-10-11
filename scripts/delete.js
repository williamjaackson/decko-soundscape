import { lastSelection } from "./grid.js";
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