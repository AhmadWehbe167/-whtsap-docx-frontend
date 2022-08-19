import Resizer from "react-image-file-resizer";

const resizeFile = (file, width, height, quality) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width, //608
      height, //608
      "JPEG",
      quality, //70
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

// const toBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// const get64Encoding = async (event, width, height, quality) => {
//   try {
//     const file = event.target.files[0];
//     const img = await resizeFile(file, width, height, quality);
//     var imgEnc = await toBase64(img);
//     imgEnc = imgEnc.replace("data:image/jpeg;base64,", "");
//     imgEnc = "b'" + imgEnc + "'";
//     const shape = "(" + img.size + ", " + "1" + ")";
//     return { imgEnc: imgEnc, shape: shape };
//   } catch (err) {
//     console.log(err);
//   }
// };

export default resizeFile;
