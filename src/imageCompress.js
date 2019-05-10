import Compressor from "compressorjs";

export default function compressImage(file) {
  return new Promise((resolve, reject) => {
   
    new Compressor(file, {
      height: 460,
      quality: 0.5,
      success(result) {
       
        resolve(result);
      },
      error(err) {
        reject(err);
      }
    });
  });
}
