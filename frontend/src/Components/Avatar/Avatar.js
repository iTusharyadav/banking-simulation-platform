import React, { useEffect, useState } from 'react';
import axios from '../Utills/AxiosWithJWT.js';
import './Avatar.css';
import noFillPng from '../../assets/images/nofillpng.png';
import { BsFillCameraFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useBankingSystem } from '../Context/UserContext.js';

const Avatar = () => {
  const token = sessionStorage.getItem("jwtToken");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const userId = sessionStorage.getItem("userId");
  const { BASE_URL } = useBankingSystem();
  const navigateTo = useNavigate();
  const [src, setSrc] = useState();
  const [image, setImage] = useState();

  const getUserImage = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/api/v1/user/image/${userId}`, { responseType: 'arraybuffer' });
      const blob = new Blob([resp.data], { type: resp.headers['content-type'] });
      const objectUrl = URL.createObjectURL(blob);
      setSrc(objectUrl);
    } catch {
      setSrc(noFillPng);
    }
  };

  useEffect(() => {
    getUserImage();
  }, [userId]);

  const handleBothFileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!image) {
      toast.error("Please select an image first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      const resp = await axios.post(`${BASE_URL}/api/v1/user/image/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (resp.status === 201) {
        toast.success("Profile image updated!");
        getUserImage();
      }
    } catch {
      toast.error("Failed to upload image!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-8">
      <div className="upload relative flex flex-col items-center">
        <img className="defaultClass" src={src || noFillPng} alt="User Avatar" />

        <label
          htmlFor="file-upload"
          className="absolute bottom-4 right-4 w-10 h-10 bg-white border border-gray-300 shadow-md flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 transition"
        >
          <BsFillCameraFill className="text-gray-700 text-lg" />
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleBothFileImageChange}
          />
        </label>

        <button
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition"
          onClick={handleImageUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Avatar;
