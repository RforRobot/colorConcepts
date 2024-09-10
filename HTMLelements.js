// HTML elements
var canvasLst = [];
for(var i = 1; i<5; i++) {
    canvasLst.push(document.getElementById('imgWindow' + i));    
}


// pixel Canvas
const pixelCanvas = document.getElementById('pixelWindow');

const pixelRed = document.getElementById('pixR');

const pixelGreen = document.getElementById('pixG');

const pixelBlue = document.getElementById('pixB');

const pixelHue = document.getElementById('pixHue');

const pixelSat = document.getElementById('pixSat');

const pixelLight = document.getElementById('pixLight');

// Buttons
const buttonGray = document.getElementById('gray');

const buttonDecomp = document.getElementById('decomp');

const buttonRed = document.getElementById('red');

const buttonGreen = document.getElementById('green');

const buttonBlue = document.getElementById('blue');

const reload = document.getElementById('reload');

const buttonHue = document.getElementById('hueShift');

const buttonSat = document.getElementById('satShift');

const buttonLight = document.getElementById('lightShift');

// HSL input fields
const inputHue = document.getElementById('hueInput');

const inputSat = document.getElementById('satInput');

const inputLight = document.getElementById('lightInput');
