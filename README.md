# CS467-AI-Coder-Escape-Room
This is the Oregon State University capstone project repo for Ryan Johns, Heather Fillerup-Miller, and Steven Ruzicka

# React Escape Room AI Explorer

React Escape Room AI Explorer is a web application built using React, Three.js, Express.js, and MongoDB, designed to create a unique escape room experience that was built by comparing and utilizing different generative AI tools such as ChatGPT-3.5 and 4, Bard, GitHub CoPilot, AWS CodeWhisperer, and DALL-E based image based generators to name a few. The primary goal of this project is to demonstrate how AI technologies can help developers, junior and senior, be more productive. The secondary goal is to create a fun and engaging experience for everyone.

## Features

- Interactive 3D escape room environment built using React and Three.js.
- Leaderboard to showcase top players and encourage friendly competition.

## Installation and Setup
1. Clone the repository
    ## For the client (React app)
    ```bash
    git clone https://github.com/yourusername/CS467-AI-Coder-Escape-Room.git
    ```

    ## For the server (Express app)
    ```bash
    git clone https://github.com/CS467-AI-Coder-Escape-Room/CS467-AI-Coder-Escape-Room-Backend.git
    ```

2. Change into the project directory:
    ## For the client (React app)
    ```bash
    cd CS467-AI-Coder-Escape-Room
    ```

    ## For the server (Express app)
    ```bash
    cd CS467-AI-Coder-Escape-Room-Backend
    ```

3. Install dependencies:
    ## For the client (React app)
    ```bash
    cd client
    npm install
    ```

    ## For the server (Express app)
    ```bash
    cd server
    npm install
    ```

4. Set up your MongoDB database:

* For a local MongoDB database, follow the instructions [here](https://docs.mongodb.com/manual/installation/) and update the connectionString in the server's .env file to match your local database.
* For a MongoDB Atlas database, follow the instructions [here](https://docs.atlas.mongodb.com/getting-started/) and update the connectionString in the server's .env file to match your Atlas database.

Store your MongoDB connection string in a environment variable called MONGODB_URI in a .env file in the server directory.

5. Start the development servers:
    ## For the client (React app)
    ```bash
    cd client
    npm start
    ```

    ## For the server (Express app)
    ```bash
    cd server
    npm start
    ```

The React app will be available at http://localhost:3000, and the Express.js backend will run in process.env.PORT or by default  http://localhost:8000.

## How to Play
To play the game, simply visit the website and click on the "Start Game" button to start the escape room experience. You will then be prompted to create a username and password. Once you have created a username and password, you can start playing the game. The game is divided into a series of rooms. Each room contains a puzzle that you must solve in order to progress to the next room. The puzzles are designed to be challenging, but they are also fair. Complete the escape room by solving all the puzzles and challenges. After you've escaped, check the leaderboard to compare your performance with other players.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
We welcome contributions from the community! If you would like to contribute to the project, please follow these steps:

## Contributing
Fork the repository.
Create a new branch for your changes.
Implement your changes and push them to your forked repository.
Create a pull request with a clear description of your changes.




