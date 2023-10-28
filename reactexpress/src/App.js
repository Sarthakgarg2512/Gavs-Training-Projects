import React, { useState} from 'react';
import axios from 'axios';
import './App.css';
import Nav from './Nav';

function App() {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [emailid, setEmail] = useState('');

  const fetchData = () => {
    axios.get('http://localhost:9901/getAll')
      .then((response) => {
        setData(response.data);
        setShowData(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const hideData = () => {
    setShowData(false);
  };

  const insertUser = () => {
    axios.post('http://localhost:9901/insert', {
      userid: userid,
      password: password,
      emailid: emailid,
    })
      .then((res) => {
        console.log(res);
        fetchData(); // Reload data after insert
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const updateUser = () => {
    axios.put(`http://localhost:9901/update/${userid}`, {
      password: password,
      emailid: emailid,
    })
      .then((res) => {
        console.log(res);
        fetchData(); // Reload data after update
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteUser = () => {
    axios.delete('http://localhost:9901/delete', {
      data: {
        userid: userid,
      },
    })
      .then((res) => {
        console.log(res);
        fetchData(); // Reload data after delete
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <Nav />
      <center>
        <form className="form" onSubmit={insertUser}>
          <b>User ID: </b>
          <input type="text" value={userid} onChange={(e) => setUserId(e.target.value)} /><br /><br />
          <b>Password: </b>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
          <b>Email ID: </b>
          <input type="email" value={emailid} onChange={(e) => setEmail(e.target.value)} /><br /><br /><br />
          <input type="button" value="Add" onClick={insertUser} />&nbsp;&nbsp;

        </form><br />
        <input type="button" value="Update" onClick={updateUser} />&nbsp;&nbsp;
        <input type="button" value="Delete" onClick={deleteUser} />&nbsp;&nbsp;
        <input type="button" value="Fetch" onClick={fetchData} />&nbsp;&nbsp;
        <input type="button" value="Hide" onClick={hideData} />

        {showData && data.length > 0 && (
          <div className="divOutput">
            <h2>Fetched Data:</h2>
            <ul>
              {data.map((item) => (
                <li key={item.userid}>
                  <b>ID:</b> {item.userid}&nbsp;&nbsp;
                  <b>Password:</b> {item.password}&nbsp;&nbsp;
                  <b>Email Id:</b> {item.emailid}
                </li>
              ))}
            </ul>
          </div>
        )}
      </center>
    </div>
  );
}

export default App;
