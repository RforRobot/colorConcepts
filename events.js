// Listeners
for(var i = 0; i < canvasLst.length; i++) {
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


for(var i = 0; i < canvasLst.length; i++) {
    contextLst.push(canvasLst[i].getContext('2d'));
    imageDataLst.push(contextLst[i].getImageData(0, 0, canvasLst[i].width, canvasLst[i].height));
    dataLst.push(imageDataLst[i].data);
}

// functions 
function drawRainbow() {

    console.log("data length: " + dataLst[0].length);

    console.log("ch: " + canvasLst[0].height);

    console.log("cw: " + canvasLst[0].width);



    for(var yi = 0; yi < canvasLst[0].height; yi++ )
    {
        for(var xi = 0; xi < canvasLst[0].width; xi++ )
        {
            var pixelIndex = 4 * (canvasLst[0].width * yi + xi);

            var h = xi % 360;
            var s = 100;
            var l = 50;

            var rgbPixel = HSL2RGB(h,s,l);

            dataLst[0][pixelIndex + 0] = rgbPixel.r;
            dataLst[0][pixelIndex + 1] = rgbPixel.g;
            dataLst[0][pixelIndex + 2] = rgbPixel.b;
            dataLst[0][pixelIndex + 3] = 255;


        }        
    }

    contextLst[0].putImageData(imageDataLst[0], 0, 0);

}

function grayScale() {

    var imageData = contextLst[0].getImageData(0, 0, canvasLst[0].width, canvasLst[0].height);

    var data = imageData.data;
    

    for(var i=0;i<30;i++) console.log(data[i]);


    var grayness;

    for (var i = 0; i < data.length; i += 4) {

        grayness = (data[i + 0] + data[i + 1] + data[i + 2])/3;
        data[i + 0] = grayness;
        data[i + 1] = grayness;
        data[i + 2] = grayness;
    }

    contextLst[0].putImageData(imageData, 0, 0);

}

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

    //console.log("End color drain");
}

function shiftHue() {
    HSLshift(Number(inputHue.value),0,0);
}

function shiftSat() {
    HSLshift(0,Number(inputSat.value),0);
}

function shiftLight() {
    HSLshift(0,0,Number(inputLight.value));
}

function HSLshift(hueShift,satShift,lightShift) {

    // console.log("HLSshift called, with (hueShift,satShift,lightShift)" 
    // + hueShift + "," + satShift + "," + lightShift);

    var imageData = contextLst[0].getImageData(0, 0, canvasLst[0].width, canvasLst[0].height);

    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        var pixel = {r: data[i + 0], g: data[i + 1], b: data[i + 2]};
        var HSLpixel = RGB2HSL(pixel.r, pixel.g, pixel.b);

        HSLpixel.h = (HSLpixel.h + hueShift) % 360;
        HSLpixel.s = Math.min(100,Math.max(0,HSLpixel.s + satShift));
        HSLpixel.l = Math.min(100,Math.max(0,HSLpixel.l + lightShift));

        // if( i % 1000 == 0) console.log("pix:"
        // + pixel.r + "," + pixel.g + "," + pixel.b);
        // if( i % 1000 == 0) console.log("HSLpix:"
        // + HSLpixel.h + "," + HSLpixel.s + "," + HSLpixel.l);

        pixel = HSL2RGB(HSLpixel.h, HSLpixel.s, HSLpixel.l);

        data[i + 0] = pixel.r;
        data[i + 1] = pixel.g;
        data[i + 2] = pixel.b;
    }

    contextLst[0].putImageData(imageData, 0, 0);

}

function decomposeImg() {

    console.log('Start decompose');

    var imageData = contextLst[0].getImageData(0, 0, canvasLst[0].width, canvasLst[0].height);
    
    var data = imageData.data;
   
    // clear other canvases
    for (var i = 0; i < data.length; i ++) {
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
 

    for(var i=1; i<canvasLst.length; i++) {
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
