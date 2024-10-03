import React, { useRef, useState } from 'react';
import axios from 'axios';
import FadeLoader from 'react-spinners/FadeLoader';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeForm = () => {
  const imgRef= useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState('');

  const toastOptions = {
    position: 'top-center',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
    transition: Bounce,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/employees', formData);

      if (response.data.success) {
        toast.success('Employee created successfully', toastOptions);
        setFormData({
          name: '',
          email: '',
          mobile: '',
          designation: '',
          gender: '',
          course: [],
          image: '',
        });
        setImg('');
        imgRef.current.value = '';
      }
    } catch (error) {
      console.error('Error response:', error.response); 

      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((err) =>
          toast.error(err.msg, toastOptions)
        );
      } else if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, toastOptions);
      } else {
        toast.error('An unexpected error occurred', toastOptions);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        course: checked
          ? [...prevData.course, value]
          : prevData.course.filter((course) => course !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImg(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    }
  };

  return (
    <>
    <div className='flex flex-col items-center justify-center mt-20 mb-20'>
      <h1 className='font-bold font-ten text-4xl text-red-400'>Create an Employee</h1>
      <form className='flex flex-col gap-8 w-2/3 lg:w-1/3 mt-5' onSubmit={handleSubmit}>

        <div className='flex flex-col gap-2'>
        <label className='label-custom'>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          className='input-custom'
          onChange={handleInputChange}
          required
        />
        </div>

        <div className='flex flex-col gap-2'>
        <label className='label-custom'>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className='input-custom'
          onChange={handleInputChange}
          required
        />
        </div>

        <div className='flex flex-col gap-2'>
        <label className='label-custom'>Mobile</label>
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          className='input-custom'
          value={formData.mobile}
          onChange={handleInputChange}
          required
        />
        </div>

        <div className='flex flex-col gap-2'>
        <label className='label-custom'>Designation</label>
        <select
          name="designation"
          className='input-custom'
          value={formData.designation}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Designation</option>
          <option value="Manager">Manager</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
        </select>
        </div>

     <div className='flex flex-col gap-2'>
     <label className='label-custom'>Gender</label>
        <div className='flex space-x-8 gap-2 text-lg dark:text-white'>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleInputChange}
              className='hidden peer'
              checked={formData.gender === 'Male'}
            />
            <span className='w-6 h-6 border border-gray-400 rounded-full peer-checked:bg-blue-600 flex justify-center items-center'>
              <span className='w-3 h-3 bg-white rounded-full hidden peer-checked:block'></span>
            </span>
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleInputChange}
              className='hidden peer'
              checked={formData.gender === 'Female'}
            />
            <span className='w-6 h-6 border border-gray-400 rounded-full peer-checked:bg-pink-600 flex justify-center items-center'>
              <span className='w-3 h-3 bg-white rounded-full hidden peer-checked:block'></span>
            </span>
            <span className="ml-2">Female</span>
          </label>
        </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='label-custom'>Course</label>
        <div className='flex space-x-8 gap-2 text-lg dark:text-white'>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="course"
              value="MCA"
              onChange={handleInputChange}
              className='hidden peer'
              checked={formData.course.includes("MCA")}
            />
            <span className='cb-custom'>
              <span className='text-white  peer-checked:block'>✔</span>
            </span>
            <span className="ml-2">MCA</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="course"
              value="BCA"
              onChange={handleInputChange}
              className='hidden peer'
              checked={formData.course.includes("BCA")}
            />
            <span className='cb-custom'>
              <span className='text-white peer-checked:block'>✔</span>
            </span>
            <span className="ml-2">BCA</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="course"
              value="BSC"
              onChange={handleInputChange}
              className='hidden peer'
              checked={formData.course.includes("BSC")}
            />
            <span className='cb-custom'>
              <span className='text-white  peer-checked:block '>✔</span>
            </span>
            <span className="ml-2">BSC</span>
          </label>
        </div>
        </div>

        <div className='flex flex-col gap-2'>
        <label className='label-custom'>Image Upload</label>
        <input
          type="file"
          ref={imgRef}
          name="image"
          accept='image/jpeg, image/png'
          className='input-custom'
          onChange={handleImageChange}
          required
        />
        </div>
        {img && <img src={img} alt="Uploaded Preview" style={{ maxWidth: '100px' }} />} 

        <button className='btn-custom' type="submit">Create Employee</button>
      </form>
      {loading && (<div className="flex absolute bg-black/80 flex-col gap-4 md:gap-8 w-full min-h-screen items-center text-center m-auto justify-center">
      <h1 className="font-ten text-[18px] md:text-[24px] font-bold text-red-400"> Please wait... </h1>
      <FadeLoader size={150} color="#f54242" />
      <h1 className="font-ten text-[14px] md:text-[20px] font-bold text-red-400"> Creating a New Employee</h1>
    </div>)}
    </div>
    <ToastContainer />
   </>
  );
};

export default EmployeeForm;
