// import React, { useState } from "react";
// import ReactCrop from "react-image-crop";
// import "react-image-crop/src/ReactCrop.scss";
// export default function Crop() {
//   const [src, setSrc] = useState("https://i.ibb.co/d2gnZyg/44.jpg");

//   const [crop, setCrop] = useState({
//     unit: "%", // Can be 'px' or '%'
//     x: 25,
//     y: 25,
//     width: 50,
//     height: 50,
//   });

//   function getCroppedImg(e) {
//     const canvas = document.createElement("canvas");
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     canvas.width = crop.width;
//     canvas.height = crop.height;
//     const ctx = canvas.getContext("2d");

//     ctx.drawImage(
//       image,
//       crop.x * scaleX,
//       crop.y * scaleY,
//       crop.width * scaleX,
//       crop.height * scaleY,
//       0,
//       0,
//       crop.height,
//       canvas.width
//     );

//     canvas.toBlob((blob) => {
//       console.log(blob);
//     });
//   }
//   return (
//     <div>
//       <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
//         <img src={src} onChange={onImageLoad} />
//       </ReactCrop>
//     </div>
//   );
// }
