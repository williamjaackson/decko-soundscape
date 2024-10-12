import { gridSettings, grid } from './grid.js';
import { itemData } from './inventory.js';

document.addEventListener('DOMContentLoaded', () => {
    const exportBtn = document.getElementById('export-btn');
    const cellSize = 64;

    exportBtn.addEventListener('click', () => {
        // Build a canvas image
        const canvas = document.createElement('canvas');
        canvas.width = gridSettings.width * cellSize;
        canvas.height = gridSettings.height * cellSize;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw images from grid
        grid.querySelectorAll('.object').forEach((object) => {
            const cellX = parseInt(object.dataset.cellx);
            const cellY = parseInt(object.dataset.celly);
            const cellWidth = parseInt(object.dataset.cellwidth);
            const cellHeight = parseInt(object.dataset.cellheight);
            ctx.drawImage(object.querySelector('img'), cellX * cellSize, cellY * cellSize, cellWidth * cellSize, cellHeight * cellSize);
        });
        
        const dataURL = canvas.toDataURL('image/png');

        const panels = {}
        let covered_area = 0
        grid.querySelectorAll('.object').forEach((object) => {
            let name = itemData(object.dataset.id).name
            panels[name] = panels[name] ? panels[name] + 1 : 1

            covered_area += object.dataset.cellwidth * object.dataset.cellheight
        });
        const boxes = {}
        const box_track = {}
        const box_limits = {}
        grid.querySelectorAll('.object').forEach((object) => {
            let data = itemData(object.dataset.id)
            let boxsize = data.box
            let boxname = data.name
            if (!box_limits[boxname]) {
                box_limits[boxname] = boxsize
            }
            // check if box exists
            if (box_track[boxname]) {
                box_track[boxname] = box_track[boxname] + 1
            } else {
                box_track[boxname] = 1
            }
        });

        // box_track.forEach((value, key) => {
        //     boxes[key] = Math.ceil(value % box_limits[key])
        // });
        // cannot do this to json
        for (const [key, value] of Object.entries(box_track)) {
            boxes[key] = Math.ceil(value / box_limits[key])
        }

        const tableData = JSON.stringify({
            panels: panels,
            boxes: boxes,
        });

        // Open the new window
        const newWindow = window.open('pdf.html');

        // After a short delay, send the data via postMessage
        newWindow.onload = () => {
            newWindow.postMessage({ image: dataURL, table: tableData, 
                width: gridSettings.width * 100, height: gridSettings.height * 100, covered: covered_area * 100,
            }, '*');
        }
    });
});
