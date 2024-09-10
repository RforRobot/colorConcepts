// HTML elements
const canvas = document.getElementById('imgWindow');

const canvas2 = document.getElementById('imgWindow2');
const canvas3 = document.getElementById('imgWindow3');
const canvas4 = document.getElementById('imgWindow4');


const buttonGray = document.getElementById('gray');

const buttonDecomp = document.getElementById('decomp');

const pixelCanvas = document.getElementById('pixelWindow');

const pixelRed = document.getElementById('pixR');

const pixelGreen = document.getElementById('pixG');

const pixelBlue = document.getElementById('pixB');

const buttonRed = document.getElementById('red');

const buttonGreen = document.getElementById('green');

const buttonBlue = document.getElementById('blue');

const reload = document.getElementById('reload');

// vars
var ctx = canvas.getContext('2d');

var pcCtx = pixelCanvas.getContext('2d');

var backup; // For restoring the image to the original state

//
var ctx2 = canvas2.getContext('2d');
var ctx3 = canvas3.getContext('2d');
var ctx4 = canvas4.getContext('2d');

var imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
var imageData3 = ctx3.getImageData(0, 0, canvas3.width, canvas3.height);
var imageData4 = ctx4.getImageData(0, 0, canvas4.width, canvas4.height);

var data2 = imageData2.data;
var data3 = imageData3.data;
var data4 = imageData4.data;
//


// Functions

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

function grayScale() {

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var data = imageData.data;

    for(var i=0;i<30;i++) console.log(data[i]);


    var grayness;

    for (var i = 0; i < data.length; i += 4) {

        grayness = (data[i + 0] + data[i + 1] + data[i + 2])/3;
        data[i + 0] = grayness;
        data[i + 1] = grayness;
        data[i + 2] = grayness;
    }

    ctx.putImageData(imageData, 0, 0);

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

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {

        data[i + color] = 0;
    }

    ctx.putImageData(imageData, 0, 0);

    //console.log("End color drain");
}

async function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function reset() {
    const input = document.querySelector('input');
    console.log(input.files)

    const base64 = await toBase64(input.files[0]);
    // console.log(base64)

    const src = base64;

    backup = src;

    var img = new Image();
    img.onload = function () {
        // console.log(this)
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas

        ctx.drawImage(img, 0, 0);
        console.log(ctx.getImageData(100, 100, 1, 1));
    }
    img.src = src;
}

function reLoadImg() {

    const src = backup;

    var img = new Image();
    img.onload = function () {
        // console.log(this)
        ctx.drawImage(img, 0, 0);
        console.log(ctx.getImageData(100, 100, 1, 1));
    }
    img.src = src;

}

function decomposeImg() {

    console.log('Start decompose');

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    var data = imageData.data;
   
    for (var i = 0; i < data.length; i ++) {
        data2[i] = 0;
        data3[i] = 0;
        data4[i] = 0;      
    }


    for (var i = 0; i < data.length; i += 4) {
        data2[i + 0] = data[i + 0]; // R value
        data3[i + 1] = data[i + 1]; // G value
        data4[i + 2] = data[i + 2]; // B value
        
        data2[i + 3] = data[i + 3]; // A value <- Alpha, transparency 
        data3[i + 3] = data[i + 3]; // A value <- Alpha, transparency 
        data4[i + 3] = data[i + 3]; // A value <- Alpha, transparency 
    }
 
    ctx2.putImageData(imageData2, 0, 0);
    ctx3.putImageData(imageData3, 0, 0);
    ctx4.putImageData(imageData4, 0, 0);

    console.log('End decompose');

}

canvas.addEventListener('mousedown', function (e) {
    getCursorPosition(e)
})

canvas2.addEventListener('mousedown', function (e) {
    getCursorPosition(e)
})

canvas3.addEventListener('mousedown', function (e) {
    getCursorPosition(e)
})

canvas4.addEventListener('mousedown', function (e) {
    getCursorPosition(e)
})

buttonGray.addEventListener("click", grayScale);
buttonDecomp.addEventListener("click", decomposeImg);
buttonRed.addEventListener("click", drainColorR);
buttonGreen.addEventListener("click", drainColorG);
buttonBlue.addEventListener("click", drainColorB);

reload.addEventListener("click", reLoadImg);