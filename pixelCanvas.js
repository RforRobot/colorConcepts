function getCursorPosition(event) {
    
    const _canvas = event.target;

    console.log(_canvas);

    const rect = _canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    console.log("x: " + x + " y: " + y)        

    var pixelIndex = 4 * (_canvas.width * y + x)
    
    getPixelColor(pixelIndex,_canvas);
}

function getPixelColor(pixelIndex,_canvas) {

    var _ctx = _canvas.getContext('2d');

    var imageData = _ctx.getImageData(0, 0, _canvas.width, _canvas.height);

    var data = imageData.data;
    
    console.log("Red: " + data[pixelIndex + 0]);
    console.log("Green: " + data[pixelIndex + 1]);
    console.log("Blue: " + data[pixelIndex + 2]);

    pixelRed.value = data[pixelIndex + 0];
    pixelGreen.value = data[pixelIndex + 1];
    pixelBlue.value = data[pixelIndex + 2];

    var pcCtx = pixelCanvas.getContext('2d');

    var pcImageData = pcCtx.getImageData(0, 0, pixelCanvas.width, pixelCanvas.height);

    var pcData = pcImageData.data;

    for (var i = 0; i < pcData.length; i += 4) {
        pcData[i + 0] = data[pixelIndex + 0]; // R value
        pcData[i + 1] = data[pixelIndex + 1]; // G value
        pcData[i + 2] = data[pixelIndex + 2]; // B value
        pcData[i + 3] = data[pixelIndex + 3]; // A value <- Alpha, transparency 
    }

    pcCtx.putImageData(pcImageData, 0, 0);

}