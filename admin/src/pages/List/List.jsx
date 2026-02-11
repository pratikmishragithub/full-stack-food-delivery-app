


import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url, currency } from '../../assets/assets';

const List = () => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`); //api call
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // refresh only after success
      } else {
        toast.error("Failed to remove food");
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
             <p className="cursor" onClick={() => removeFood(item._id)}>x</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

