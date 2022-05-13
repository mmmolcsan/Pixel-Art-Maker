const sizePicker = document.querySelector('.size-picker');
const artCanvas = document.querySelector('.art-canvas');
const colorFill = document.querySelector('.color-fill');
const eraserMode = document.querySelector('.eraser-mode');
const drawingMode = document.querySelector('.drawing-mode');

function makeGrid() {
  let gridHeight = document.querySelector('.input-height').value;
  let gridWidth = document.querySelector('.input-width').value;
  // If grid already present, clears any cells that have been filled in
  while (artCanvas.firstChild) {
    artCanvas.removeChild(artCanvas.firstChild);
    }
  // Creates rows and cells
  for (let i = 1; i <= gridHeight; i++) {
    let gridRow = document.createElement('tr');
    artCanvas.appendChild(gridRow);
    for (let j = 1; j <= gridWidth; j++) {
      let gridCell = document.createElement('td');
      gridRow.appendChild(gridCell);
      // Fills in cell with selected color upon mouse press ('mousedown', unlike 'click', doesn't also require release of mouse button)
      gridCell.addEventListener('mousedown', function() {
        const color = document.querySelector('.color-picker').value;
        this.style.backgroundColor = color;
      })
     }
  }
}


// Upon user's submitting height and width selections, callback function (inside method) calls makeGrid function. But event method preventDefault() first intercepts the 'submit' event, which would normally submit the form and refresh the page, preventing makeGrid() from being processed
sizePicker.addEventListener('submit', function(e) {
  e.preventDefault();
  makeGrid();
});

// Enables color dragging with selected color (code for filling in single cell is above). (No click on 'drawing' mode needed; this is default mode)
let down = false; // Tracks whether or not mouse pointer is pressed

// Listens for mouse pointer press and release on grid. Changes value to true when pressed, but sets it back to false as soon as released
artCanvas.addEventListener('mousedown', function(e) {
	down = true;
	artCanvas.addEventListener('mouseup', function() {
		down = false;
	});
  // Ensures cells won't be colored if grid is left while pointer is held down
  artCanvas.addEventListener('mouseleave', function() {
    down = false;
  });

  artCanvas.addEventListener('mouseover', function(e) {
    // 'color' defined here rather than globally so JS checks whether user has changed color with each new mouse press on cell
    const color = document.querySelector('.color-picker').value;
    // While mouse pointer is pressed and within grid boundaries, fills cell with selected color. Inner if statement fixes bug that fills in entire grid
  	if (down) {
      // 'TD' capitalized because element.tagName returns upper case for DOM trees that represent HTML elements
      if (e.target.tagName === 'TD') {
      	e.target.style.backgroundColor = color;
      }
    }
  });
});

// Adds color-fill functionality. e.preventDefault(); intercepts page refresh on button click
colorFill.addEventListener('click', function(e) {
  e.preventDefault();
  const color = document.querySelector('.color-picker').value;
  artCanvas.querySelectorAll('td').forEach(td => td.style.backgroundColor = color);
});

// Removes color from cell upon double-click
artCanvas.addEventListener('dblclick', e => {
  e.target.style.backgroundColor = null;
});

// NONDEFAULT drawing AND eraser MODES:

// Allows for drag and single-cell erasing upon clicking 'eraser' button. Code for double-click eraser functionality (Without entering eraser mode) is above. Also note 'down' was set to false in variable above
eraserMode.addEventListener('click', function() {
  // Enables drag erasing while in eraser mode
  artCanvas.addEventListener('mousedown', function(e) {
  	down = true;
  	artCanvas.addEventListener('mouseup', function() {
  		down = false;
  	});
    // Ensures cells won't be eraserd if grid is left while pointer is held down
    artCanvas.addEventListener('mouseleave', function() {
      down = false;
    });
    artCanvas.addEventListener('mouseover', function(e) {
      // While mouse pointer is pressed and within grid boundaries, empties cell contents. Inner if statement fixes bug that fills in entire grid
    	if (down) {
        if (e.target.tagName === 'TD') {
        	e.target.style.backgroundColor = null;
        }
      }
    });
  });
  // Enables single-cell eraser while in eraser mode
  artCanvas.addEventListener('mousedown', function(e) {
    e.target.style.backgroundColor = null;
  });
});

// Allows user to return to (default) drawing mode after using 'eraser' button. Note 'down' was set to false in variable above
drawingMode.addEventListener('click', function() {
  artCanvas.addEventListener('mousedown', function(e) {
  	down = true;
  	artCanvas.addEventListener('mouseup', function() {
  		down = false;
  	});
    // Ensures cells won't be colored if grid is left while pointer is held down
    artCanvas.addEventListener('mouseleave', function() {
      down = false;
    });
    artCanvas.addEventListener('mouseover', function(e) {
      const color = document.querySelector('.color-picker').value;
      // While mouse pointer is pressed and within grid boundaries, fills cell with selected color. Inner if statement fixes bug that fills in entire grid
    	if (down) {
        if (e.target.tagName === 'TD') {
        	e.target.style.backgroundColor = color;
        }
      }
    });
  });
  // Enables single-cell coloring while in drawing mode
  artCanvas.addEventListener('mousedown', function(e) {
    if (e.target.tagName !== 'TD') return;
    const color = document.querySelector('.color-picker').value;
    e.target.style.backgroundColor = color;
  });
});

