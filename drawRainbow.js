function drawRainbow() {

    // calculate an HSL band:
    var rgbPixels = [];

    for (var xi = 0; xi < canvasLst[0].width; xi++) {

        var h = xi % 360;
        var s = 100;
        var l = 50;

        var rgbPixel = HSL2RGB(h, s, l);
        rgbPixels.push(rgbPixel);

    }

    // extend to canvas
    for (var yi = 0; yi < canvasLst[0].height; yi++) {

        for (var xi = 0; xi < canvasLst[0].width; xi++) {

            var rgbPixel = rgbPixels[xi];
            var pixelIndex = 4 * (canvasLst[0].width * yi + xi);

            dataLst[0][pixelIndex + 0] = rgbPixel.r;
            dataLst[0][pixelIndex + 1] = rgbPixel.g;
            dataLst[0][pixelIndex + 2] = rgbPixel.b;
            dataLst[0][pixelIndex + 3] = 255;
        }
    }


    // y limits for bands:
    var yLim = [0];

    var colorBandSize = 4;
    var blackBandSize = 1;
    var totalSize = 7 * colorBandSize + 6 * blackBandSize;

    var yLimLast = 0;

    for (var i = 0; i <= totalSize; i += 2) {

        yLimLast = Math.floor(yLimLast + colorBandSize / totalSize * canvasLst[0].height) 
        yLim.push(yLimLast);

        yLimLast = Math.floor(yLimLast + blackBandSize / totalSize * canvasLst[0].height);
        yLim.push(yLimLast);
    }

    for (var xi = 0; xi < canvasLst[0].width; xi++) {

        var rgbPixel = rgbPixels[xi];

        // red band overwrite
        for (var yi = yLim[0]; yi < yLim[1]; yi++) {

            var pixelIndex = 4 * (canvasLst[0].width * yi + xi);

            dataLst[0][pixelIndex + 1] = 0;
            dataLst[0][pixelIndex + 2] = 0;

        }

        // green band overwrite

        for (var yi = yLim[4]; yi < yLim[5]; yi++) {

            var pixelIndex = 4 * (canvasLst[0].width * yi + xi);

            dataLst[0][pixelIndex + 0] = 0;
            dataLst[0][pixelIndex + 2] = 0;

        }

        // blue band overwrite

        for (var yi = yLim[8]; yi < yLim[9]; yi++) {

            var pixelIndex = 4 * (canvasLst[0].width * yi + xi);

            dataLst[0][pixelIndex + 0] = 0;
            dataLst[0][pixelIndex + 1] = 0;

        }

        // 2nd red band overwrite
        for (var yi = yLim[12]; yi < yLim[13]; yi++) {

            var pixelIndex = 4 * (canvasLst[0].width * yi + xi);

            dataLst[0][pixelIndex + 1] = 0;
            dataLst[0][pixelIndex + 2] = 0;

        }

        // black bands
        for (var i = 1; i < yLim.length; i += 2) {

            for (var yi = yLim[i]; yi < yLim[i + 1]; yi++) {

                var pixelIndex = 4 * (canvasLst[0].width * yi + xi);

                dataLst[0][pixelIndex + 0] = 0;
                dataLst[0][pixelIndex + 1] = 0;
                dataLst[0][pixelIndex + 2] = 0;

            }
        }

    }

    contextLst[0].putImageData(imageDataLst[0], 0, 0);
}