// load the image.
// function load image ra base64 = canvas
export function getImageBase64(url: string, ratio = 1) {
  return new Promise<string>((resolve, reject) => {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    const img = new Image();
    // source hình
    img.src = url;
    img.onload = function (e) {
      c.width = img.naturalWidth * ratio;
      c.height = img.naturalHeight * ratio;
      ctx.drawImage(img, 0, 0, c.width, c.height);
      const base64String = c.toDataURL();
      resolve(base64String);
    };
  });
}

export function base64convert(url: any) {
  return new Promise((resolve) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(blob);
      });
  });
}
