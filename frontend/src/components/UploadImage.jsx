// import React, { useState } from "react";
// import Container from "./Container";
// import axios from "axios";
// import Button from "./Button";
// function UploadImage() {
//   const [fileName, setFileName] = useState("No file chosen");
//   const [imagePreview, setImagePreview] = useState("");
//   const [selectedImage , setSelectedImage] = useState(null)

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     console.log(file);
    
//     setFileName(file ? file.name : "No file chosen");
//     if (file) {
//       setSelectedImage(file)
//       const render = new FileReader();
//       render.onload = () => {
//         setImagePreview(render.result);
//       };
//       render.readAsDataURL(file);
//     }
//   };

//   async function uploadImage() {
//     const formData = new FormData();
//     formData.append("image", selectedImage);
//     console.log(formData);

//     try {
//       const response = await axios.post("http://localhost:3000/api/upload", formData , {
//         headers : {
//           "Content-Type" : "multipart/form-data"
//         },
//       })
//       console.log(response);
      
//     } catch (error) {
//       console.log(error);
      
//     }
    
//   }


//   return (
//     <Container flex={false} className="absolute top-0 left-0 right-0 bottom-0">
//       <div className="bg-white h-3/5 w-1/2 mx-auto mt-14 rounded-lg">
//         <span className="block items-center text-lg text-center font-semibold my-3">
//           Upload Image
//         </span>
//         <hr className="border-2" />
//         <div className="flex justify-center h-full w-full">
//           {/* Custom File Upload */}
//           <div>
//             {imagePreview && (<>
//             {/* <Button className="w-20 h-10 absolute left-2/3 top-2/4 " onClick={uploadImage}>Upload</Button> */}
//               <img
//                 src={imagePreview}
//                 alt="preview"
//                 className="rounded-lg mt-4 transition-opacity duration-500 ease-in-out opacity-0"
//                 style={{ width: "320px", height: "320px", objectFit: "cover" }}
//                 onLoad={(e) => (e.currentTarget.style.opacity = 1)}
//                 />
//                 </>
//             )}
//           </div>
//           <div className="flex flex-col justify-center items-center h-3/4 mx-3">
//             <label
//               htmlFor="fileInput"
//               className="cursor-pointer border-2 border-gray-400 p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
//             >
//               Choose File
//             </label>
           
//             <input
//               id="fileInput"
//               type="file"
//               className="hidden"
//               onChange={handleFileChange}
//             />
//             <span className="mt-3 text-gray-600 block">{fileName}</span>
//             <button onClick={uploadImage} className="cursor-pointer border p-3 rounded-lg bg-blue-700 mt-4
//              text-white hover:bg-blue-600 shadow-lg">Upload Image</button>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// }

// export default UploadImage;
import React, { useState } from "react";
import axios from "axios";
import Container from "./Container";
import { useDispatch } from "react-redux";
import {profileImage } from "../Store/Slices/UserSlice";
function UploadImage() {
  const [fileName, setFileName] = useState("No file chosen");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "No file chosen");

    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function uploadImage() {
    if (!selectedImage) {
      setUploadStatus("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setIsUploading(true);
      setUploadStatus(null);

      const response = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(profileImage({ profileImage: response.data.fileUrl }));
      setUploadStatus("File uploaded successfully!");
      console.log("Server Response:", response.data);
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      console.error("Upload Error:", error);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Container flex={false} className="absolute top-0 left-0 right-0 bottom-0">
      <div className="bg-slate-200 h-3/5 w-1/2 mx-auto mt-14 rounded-lg shadow-lg border-b-2">
        <h2 className="text-center text-xl font-semibold mb-4">Upload Image</h2>
        <hr className="border-2 mb-6" />
        <div className="flex justify-center h-full w-full">
          {/* Image Preview */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-lg mb-4 transition-opacity duration-500 ease-in-out opacity-0"
              style={{ width: "320px", height: "320px", objectFit: "cover" }}
              onLoad={(e) => (e.currentTarget.style.opacity = 1)}
            />
          )}
          {/* File Input */}

          <div className="flex flex-col justify-center items-center h-3/4 mx-3">
          <label
            htmlFor="fileInput"
            className="cursor-pointer border-2 border-gray-400 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
            Choose File
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            />
          <span className="mt-3 text-gray-600">{fileName}</span>
          {/* Upload Button */}
          <button
            onClick={uploadImage}
            disabled={isUploading}
            className={`cursor-pointer border px-4 py-2 rounded-lg bg-blue-700 mt-4 text-white hover:bg-blue-600 shadow-lg ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            >
            {isUploading ? "Uploading..." : "Upload Image"}
          </button>
          {/* Status Message */}
          {uploadStatus && (
            <p
            className={`mt-3 ${
              uploadStatus.includes("successfully")
              ? "text-green-500"
              : "text-red-500"
            }`}
            >
              {uploadStatus}
            </p>
              
          )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default UploadImage;
