// Listeners
for (var i = 0; i < canvasLst.length; i++) {
    canvasLst[i].addEventListener('mousedown', function (e) {
        getCursorPosition(e)
    })
}

buttonRainbow.addEventListener("click", drawRainbow);

buttonGray.addEventListener("click", grayScale);

buttonDecomp.addEventListener("click", decomposeImg);

buttonRed.addEventListener("click", drainColorR);
buttonGreen.addEventListener("click", drainColorG);
buttonBlue.addEventListener("click", drainColorB);

reload.addEventListener("click", reLoadImg);

buttonHue.addEventListener("click", shiftHue);
buttonSat.addEventListener("click", shiftSat);
buttonLight.addEventListener("click", shiftLight);

// vars

var backup; // For restoring the image to the original state

// image data vars
var contextLst = [];
var imageDataLst = [];
var dataLst = [];


for (var i = 0; i < canvasLst.length; i++) {
    contextLst.push(canvasLst[i].getContext('2d'));
    imageDataLst.push(contextLst[i].getImageData(0, 0, canvasLst[i].width, canvasLst[i].height));
    dataLst.push(imageDataLst[i].data);
}

// functions 
function grayScale() {

    var imageData = contextLst[0].getImageData(0, 0, canvasLst[0].width, canvasLst[0].height);

    var data = imageData.data;


    for (var i = 0; i < 30; i++) console.log(data[i]);


    var grayness;

    for (var i = 0; i < data.length; i += 4) {

        grayness = (data[i + 0] + data[i + 1] + data[i + 2]) / 3;
        data[i + 0] = grayness;
        data[i + 1] = grayness;
        data[i + 2] = grayness;
    }

    contextLst[0].putImageData(imageData, 0, 0);

    if (lastCanvas == canvasLst[0]) {
        getPixelColor(lastPixel, lastCanvas);
    }

}

function decomposeImg() {

    console.log('Start decompose');

    var imageData = contextLst[0].getImageData(0, 0, canvasLst[0].width, canvasLst[0].height);

    var data = imageData.data;

    // clear other canvases
    for (var i = 0; i < data.length; i++) {
        dataLst[1][i] = 0;
        dataLst[2][i] = 0;
        dataLst[3][i] = 0;
    }


    // copy respective color and transparency to other canvases
    for (var i = 0; i < data.length; i += 4) {
        dataLst[1][i + 0] = data[i + 0]; // R value
        dataLst[2][i + 1] = data[i + 1]; // G value
        dataLst[3][i + 2] = data[i + 2]; // B value

        dataLst[1][i + 3] = data[i + 3]; // A value <- Alpha, transparency 
        dataLst[2][i + 3] = data[i + 3]; // A value <- Alpha, transparency 
        dataLst[3][i + 3] = data[i + 3]; // A value <- Alpha, transparency 
    }


    for (var i = 1; i < canvasLst.length; i++) {
        contextLst[i].putImageData(imageDataLst[i], 0, 0);
    }

}

function reLoadImg() {

    const src = backup;

    var img = new Image();
    img.onload = function () {
        // console.log(this)
        contextLst[0].drawImage(img, 0, 0);
        console.log(contextLst[0].getImageData(100, 100, 1, 1));
    }
    img.src = src;

}
