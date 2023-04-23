import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const fetchData = async () => {
  try  {
    const res = await axios.get('http://localhost:8000');
    console.log(res.data);
  } catch (err) {
    console.error("Error fetching data", err)
    return err;
  }
}

function App() {
  useEffect(() => {
    fetchData();
  }, []);
    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
