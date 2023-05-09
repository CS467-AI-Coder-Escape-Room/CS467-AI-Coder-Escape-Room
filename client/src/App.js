import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

// EXAMPLES FOR CREATING AND READING FROM DATABASE
// // Test function for Creation
// const TestCreate = async () => {
//   const document = { initials: "JDD", time: 1200 };
//   // Create a new document
//   try {
//     const response = await axios.post(
//       "https://ai-coder-server.superindependentmedia.com/database/create",
//       document,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error fetching data: ", error);
//   }
// };

// Test funtion for finding if document exists
const TestRead = async () => {
  // Find document
  try {
    const response = await axios.get("https://ai-coder-server.superindependentmedia.com/database/leaderboard");
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

function App() {
  useEffect(() => {
    TestRead();
  }, []);

  return (
    <div classinitials="App">
      <header classinitials="App-header">
        <img src={logo} classinitials="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          classinitials="App-link"
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
