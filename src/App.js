import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users?page=2');
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className='input-wraper'>
        <div className='input-container'>
          <img width="25" height="25" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-search-instagram-flatart-icons-outline-flatarticons.png" alt="external-search-instagram-flatart-icons-outline-flatarticons" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="search by first name"
          />
        </div>
      </div>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <div className="user-item">
              <div className="image-wrapper">
                <img src={user.avatar} alt={user.first_name} />
                <span className="user-id">{user.id}</span>
                <div className="user-name">{user.first_name}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;


