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
        contextLst[0].clearRect(0, 0, canvasLst[0].width, canvasLst[0].height); // clears canvas

        contextLst[0].drawImage(img, 0, 0);
        // console.log(contextLst[0].getImageData(100, 100, 1, 1));
    }
    img.src = src;
}