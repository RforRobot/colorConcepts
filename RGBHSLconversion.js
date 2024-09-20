// function mostly from https://deepai.org/chat, very slight readability changes by me

function RGB2HSL(r, g, b) {
    // Normalize the RGB values to the range 0-1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find the maximum and minimum values among R, G, and B
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        // Achromatic (gray)
        h = s = 0; // Hue and saturation are undefined
    } else {
        const d = max - min;

        // Calculate saturation
        if(l > 0.5) {
            s = d / (1 - l) / 2;
        } else {
            s = d / l / 2;
        }

        // Calculate hue
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
            //    console.log("g:" + g + "b:" + b + "d:" + d + "h:" + h)  
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6; // Normalize to [0, 1]
    }

//    console.log("h:" + h*360, "s:" + s*100, "l:" + l*100);

    // Convert hue to degrees and saturation/lightness to percentages
    return {
        h: h * 360, // Convert to degrees
        s: s * 100, // Convert to percentage
        l: l * 100  // Convert to percentage
    };
}

// Example usage:
// const rgbPixel = { r: 255, g: 0, b: 0 }; // Red
// const hslPixel = RGB2HSL(rgbPixel.r, rgbPixel.g, rgbPixel.b);
// console.log(hslPixel); // { h: 0, s: 100, l: 50 }


function HSL2RGB(h, s, l) {
    // Convert HSL to RGB
    let r, g, b;

    // Convert the saturation and lightness from percentages to a fraction
    s /= 100;
    l /= 100;

    // If the saturation is 0, the color is a shade of gray
    if (s === 0) {
        r = g = b = l * 255; // Achromatic (gray)
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - (l * s);
        const p = 2 * l - q;

        r = hue2rgb(p, q, h / 360 + 1/3) * 255;
        g = hue2rgb(p, q, h / 360) * 255;
        b = hue2rgb(p, q, h / 360 - 1/3) * 255;
    }

//    console.log("r:" + r, "g:" + g, "b:" + b);


    return {
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b)
    };

}