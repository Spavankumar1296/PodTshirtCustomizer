import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useHotkeys } from 'react-hotkeys-hook';
import './index.css';

const themes = ["theme-one", "theme-two", "theme-three"];

const App = () => {
  const [themeIndex, setThemeIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const imageInputRef = useRef(null);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      height: 180,
      weight: 80,
      build: "athletic",
      text1: "",
      text2: "",
      text3: "",
    },
  });

  useHotkeys('alt+q', () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  });

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const currentTheme = themes[themeIndex];
  const values = watch();

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-10'>
        <div className='flex justify-center mb-12' >
              <div className="w-full md:w-1/3 bg-gray-100 flex justify-center items-center border rounded h-96 mr-12">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="h-full object-contain" />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
                </div>
                <div
                  className="border border-dashed p-4 rounded bg-gray-50 text-center cursor-pointer"
                  onClick={() => imageInputRef.current.click()}
                  onDrop={onDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <input type="file" accept="image/*" hidden ref={imageInputRef} onChange={onFileChange} />
                  <p className="text-gray-500">Drop an image here or click to upload</p>
                  {previewImage && <img src={previewImage} alt="Small Preview" className="mx-auto h-16 mt-2" />}
                </div>
        </div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>

        <div >
          <label className="block mb-1">Height (cm)</label>
          <input type="number" {...register("height")} className=" border p-2 rounded" />

          <label className="block mt-3 mb-1">Weight (kg)</label>
          <input type="number" {...register("weight")} className=" border p-2 rounded" />

          <label className="block mt-3 mb-1">Build</label>
          <select {...register("build")} className=" border p-2 rounded">
            <option value="lean">Lean</option>
            <option value="reg">Regular</option>
            <option value="athletic">Athletic</option>
            <option value="big">Big</option>
          </select>
        </div>
         <div >
          <label className="block mb-1">T-Shirt Text (Max 3 lines)</label>
          <textarea
            {...register("text1")}
            placeholder="Line 1"
            className=" border mb-1 p-2 ml-6 rounded"
            maxLength={50}
          />
          <textarea
            {...register("text2")}
            placeholder="Line 2"
            className=" border mb-1 ml-6 p-2 rounded"
            maxLength={50}
          />
          <textarea
            {...register("text3")}
            placeholder="Line 3"
            className=" border ml-6 p-2 rounded"
            maxLength={50}
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
          Submit Customization
        </button>
      </form>
    
    </div>
  );
};

export default App;
