import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FadeLoader from 'react-spinners/FadeLoader';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [sortOption, setSortOption] = useState('id'); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const filterEmployees = employees.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  
  const sortedEmployees = [...filterEmployees].sort((a, b) => {
    switch (sortOption) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'createdAt':
        return new Date(b.createdAt) - new Date(a.createdAt); 
      case 'email':
        return a.email.localeCompare(b.email);
      case 'id':
      default:
        return a._id.localeCompare(b._id); 
    }
  });

  // Pagination
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    transition: Bounce
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      toast.success('Employee data deleted successfully', toastOptions);
      setEmployees(prevEmployees => prevEmployees.filter(emp => emp._id !== id));
      setConfirmDeleteId(null); 
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/employees/');
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching employee data:', error, toastOptions);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="flex absolute flex-col gap-4 md:gap-8 w-full min-h-screen items-center text-center m-auto justify-center">
        <h1 className="font-ten text-[18px] md:text-[24px] font-bold text-red-400"> Please wait... </h1>
        <FadeLoader size={150} color="#f54242" />
        <h1 className="font-ten text-[14px] md:text-[20px] font-bold text-red-400"> Fetching employees data</h1>
      </div>
    );
  }

  return (
    <div className='mt-20 mb-20 min-h-screen'>
      <div className='flex items-center justify-center flex-col gap-10'>
        <Link to='/create-employee' className='btn-custom'>Add Employee</Link>
        <input 
          placeholder='Search by name' 
          className='w-2/3 md:w-1/2 bg-transparent p-4 border-2 border-r-8 outline-none dark:text-white border-b-8 border-black dark:border-red-400' 
          onChange={(e) => setSearch(e.target.value)} 
        />
        
        {/* Sorting */}
        <select 
          className='input-custom w-1/4'
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="id">Sort by ID</option>
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
          <option value="createdAt">Sort by Create Date</option>
        </select>
        
        <div className='w-full flex items-center justify-center overflow-auto p-4 pl-[600px] md:pl-32 lg:pl-0'>
        <table className='border-r-8 w-[80%] border-b-8 border-black dark:border-red-400'>
          <thead>
            <tr>
              <th className='th-custom'>ID</th>
              <th className='th-custom'>Image</th>
              <th className='th-custom'>Name</th>
              <th className='th-custom'>Email</th>
              <th className='th-custom'>Mobile</th>
              <th className='th-custom'>Designation</th>
              <th className='th-custom'>Gender</th>
              <th className='th-custom'>Course</th>
              <th className='th-custom'>Create date</th>
              <th className='th-custom'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee._id}>
                <td className='td-custom'>{employee._id}</td>
                <td className='td-custom'>
                  {employee.image && (
                    <img
                      src={`${employee.image}`}
                      alt={`${employee.name}'s profile`}
                      style={{ width: '100px', height: '100px' }}
                    />
                  )}
                </td>
                <td className='td-custom'>{employee.name}</td>
                <td className='td-custom'>{employee.email}</td>
                <td className='td-custom'>{employee.mobile}</td>
                <td className='td-custom'>{employee.designation}</td>
                <td className='td-custom'>{employee.gender}</td>
                <td className='td-custom'>{employee.course.join(', ')}</td>
                <td className='td-custom'>{moment(employee.createdAt).format('YYYY-MMM-DD')}</td>
                <td className='td-custom space-x-2'>

                  <div className='flex flex-wrap gap-2 items-center justify-center'>
                  <Link to={`/edit-employee/${employee._id}`} className='p-2 border-2 text-white bg-indigo-500 hover:bg-indigo-800 rounded-md transition duration-300'>Edit</Link>
                  <button className='p-2 border-2 text-white bg-red-500 hover:bg-red-800 rounded-md transition duration-300' onClick={() => setConfirmDeleteId(employee._id)}>Delete</button>
                  </div>

                  {confirmDeleteId === employee._id && (
                    <div className='absolute border-2 border-black dark:border-red-400 bg-white dark:bg-black w-64 h-32 p-4 rounded-md shadow-lg z-10'>
                      <h1 className="text-lg font-bold">Are you sure?</h1>
                      <div className="flex justify-between mt-4">
                        <button className='p-2 border-2 text-white bg-red-500 hover:bg-red-800 rounded-md transition duration-300' onClick={() => handleDelete(employee._id)}>Delete</button>
                        <button className='p-2 border-2 text-gray-200 bg-black hover:bg-gray-500 rounded-md transition duration-300' onClick={() => setConfirmDeleteId(null)}>Cancel</button>
                      </div>
                    </div>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-4 mt-4 mb-10">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border-2 text-white font-semibold font-ten bg-indigo-400 hover:bg-indigo-800 rounded-md transition duration-300"
          >
            Previous
          </button>
          <span className='dark:text-white'>{`Page ${currentPage} of ${totalPages}`}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 border-2 text-white font-semibold font-ten bg-indigo-400 hover:bg-indigo-800 rounded-md transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeList;
