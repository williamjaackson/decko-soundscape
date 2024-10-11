import { gridSettings, grid } from './grid.js';


document.addEventListener('DOMContentLoaded', () => {
    // Default export is a4 paper, portrait, using millimeters for units

    const exportBtn = document.getElementById('export-btn');
    // const maxSize = Math.sqrt(268435456)-100;
    const maxSize = 16000;
    // const cellSize = maxSize / (Math.max(gridSettings.width, gridSettings.height));
    const cellSize = 64;
    exportBtn.addEventListener('click', () => {
        // build a canvas image
        console.log('exporting...')
        const canvas = document.createElement('canvas');
        canvas.width = gridSettings.width * cellSize;
        canvas.height = gridSettings.height * cellSize;
        const ctx = canvas.getContext('2d');
        console.log('building canvas...')
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        console.log('filling canvas...')
        
        grid.querySelectorAll('.object').forEach((object) => {
            console.log('element...')
            const cellX = parseInt(object.dataset.cellx);
            const cellY = parseInt(object.dataset.celly);
            const cellWidth = parseInt(object.dataset.cellwidth);
            const cellHeight = parseInt(object.dataset.cellheight);
            
            // fill with image
            ctx.drawImage(object.querySelector('img'), cellX * cellSize, cellY * cellSize, cellWidth * cellSize, cellHeight * cellSize);
        });
        console.log('output...')

        // // export to image
        const dataURL = canvas.toDataURL('image/png');

        // const pdfBody = document.createElement('div');
        const jsonTable = JSON.stringify({
            panels: {"Oak (Small)": 8, "Oak (Large)": 2},
            boxes: {"Oak (Small)": 2, "Oak (Large)": 1},
        })

        // Base URL for your PDF page
        const pdfURL = "pdf.html";

        // Encode the parameters to safely include them in the URL
        const encodedImage = encodeURIComponent(dataURL);
        const encodedTable = encodeURIComponent(jsonTable);

        // Construct the URL with the query parameters
        const fullURL = `${pdfURL}?image=${encodedImage}&table=${encodedTable}`;
        console.log(dataURL)

        // Open the new window with the updated URL
        const printWindow = window.open(fullURL, "mywindow", "menubar=1,resizable=1,width=350,height=250");

        printWindow.onload = () => {
            printWindow.print();
        };


    });
});