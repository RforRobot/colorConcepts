var lastCanvas;
var lastPixel;


function getCursorPosition(event) {
    
    lastCanvas = event.target;

    const rect = lastCanvas.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);

    console.log("x: " + x + " y: " + y);        

    var pixelIndex = 4 * (lastCanvas.width * y + x);
    
    lastPixel = pixelIndex;
    
    getPixelColor(pixelIndex,lastCanvas);
}

function getPixelColor(pixelIndex,canvas) {

    var _ctx = canvas.getContext('2d');

    var imageData = _ctx.getImageData(0, 0, canvas.width, canvas.height);

    var data = imageData.data;
    
    console.log("Red: " + data[pixelIndex + 0]);
    console.log("Green: " + data[pixelIndex + 1]);
    console.log("Blue: " + data[pixelIndex + 2]);

    pixelRed.value = data[pixelIndex + 0];
    pixelGreen.value = data[pixelIndex + 1];
    pixelBlue.value = data[pixelIndex + 2];

    var hsl = RGB2HSL(pixelRed.value, pixelGreen.value, pixelBlue.value);

    pixHue.value = +hsl.h.toFixed(2);
    pixSat.value = +hsl.s.toFixed(2);
    pixLight.value = +hsl.l.toFixed(2);

    drawToPixelCanvas();
}

function drawToPixelCanvas() {

    var pcCtx = pixelCanvas.getContext('2d');

    var pcImageData = pcCtx.getImageData(0, 0, pixelCanvas.width, pixelCanvas.height);

    var pcData = pcImageData.data;

    for (var i = 0; i < pcData.length; i += 4) {
        pcData[i + 0] = pixelRed.value; // R value
        pcData[i + 1] = pixelGreen.value; // G value
        pcData[i + 2] = pixelBlue.value; // B value
        pcData[i + 3] = 255; // A value <- Alpha, transparency 
    }

    pcCtx.putImageData(pcImageData, 0, 0);

}