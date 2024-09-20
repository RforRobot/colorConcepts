function drainColorR() {
    pixelRed.value = 0;
    drainColor(0);
}

function drainColorG() {
    pixelGreen.value = 0;
    drainColor(1);
}

function drainColorB() {
    pixelBlue.value = 0;
    drainColor(2);
}

function drainColor(color) {

    var imageData = contextLst[0].getImageData(0, 0, canvasLst[0].width, canvasLst[0].height);

    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {

        data[i + color] = 0;
    }

    contextLst[0].putImageData(imageData, 0, 0);

    if (lastCanvas == canvasLst[0]) {
        getPixelColor(lastPixel, lastCanvas);
    }

    //console.log("End color drain");
}