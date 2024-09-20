
function shiftHue() {
    HSLshift(Number(inputHue.value), 0, 0);
}

function shiftSat() {
    HSLshift(0, Number(inputSat.value), 0);
}

function shiftLight() {
    HSLshift(0, 0, Number(inputLight.value));
}

function HSLshift(hueShift, satShift, lightShift) {

    // console.log("HLSshift called, with (hueShift,satShift,lightShift)" 
    // + hueShift + "," + satShift + "," + lightShift);

    var imageData = contextLst[0].getImageData(0, 0, canvasLst[0].width, canvasLst[0].height);

    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        var pixel = { r: data[i + 0], g: data[i + 1], b: data[i + 2] };
        var HSLpixel = RGB2HSL(pixel.r, pixel.g, pixel.b);

        HSLpixel.h = (HSLpixel.h + hueShift) % 360;
        HSLpixel.s = Math.min(100, Math.max(0, HSLpixel.s + satShift));
        HSLpixel.l = Math.min(100, Math.max(0, HSLpixel.l + lightShift));

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

    if (lastCanvas == canvasLst[0]) {
        getPixelColor(lastPixel, lastCanvas);
    }

}