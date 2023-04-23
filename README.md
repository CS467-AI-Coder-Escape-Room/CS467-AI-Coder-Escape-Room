# CS467-AI-Coder-Escape-Room
This is the Oregon State University capstone project repo for Ryan Johns, Heather Fillerup-Miller, and Steven Ruzicka

# React Escape Room AI Explorer

React Escape Room AI Explorer is a web application built using React, Three.js, Express.js, and MongoDB, designed to create a unique escape room experience that compares and utilizes different AI tools to enhance user interactions and solve puzzles. Our goal is to demonstrate how AI technologies can be integrated into a gaming context, providing an immersive and challenging experience for users.

## Features

- Interactive 3D escape room environment built using React and Three.js.
- Integration of various AI tools to solve puzzles and facilitate user interactions.
- User authentication and progress tracking using Express.js and MongoDB.
- Sleek and responsive design for seamless gaming experience across devices.
- Leaderboard to showcase top players and encourage friendly competition.

## Installation and Setup
1. Clone the repository

```bash
git clone https://github.com/yourusername/CS467-AI-Coder-Escape-Room.git
```

2. Change into the project directory:

```bash
cd CS467-AI-Coder-Escape-Room
```

3. Install dependencies:
    ## For the client (React app)
    ```bash
    cd client
    npm install
    ```

    ## For the server (Express app)
    ```bash
    cd ../server
    npm install
    ```

4. Set up your MongoDB database:

* For a local MongoDB database, follow the instructions [here](https://docs.mongodb.com/manual/installation/) and update the connectionString in the server's .env file to match your local database.
* For a MongoDB Atlas database, follow the instructions [here](https://docs.atlas.mongodb.com/getting-started/) and update the connectionString in the server's .env file to match your Atlas database.

5. Start the development servers:
    ## For the client (React app)
    ```bash
    cd client
    npm start
    ```

    ## For the server (Express app)
    ```bash
    cd ../server
    npm start
    ```

The React app will be available at http://localhost:3000, and the Express.js backend will run on http://localhost:5000.

## Usage
Visit http://localhost:3000 to start the escape room experience.
Register an account or sign in to track your progress and compete on the leaderboard.
Navigate through the 3D environment and interact with various AI-powered tools and puzzles.
Complete the escape room by solving all the puzzles and challenges, using the integrated AI tools.
Check the leaderboard to compare your performance with other players.

We welcome contributions from the community! If you would like to contribute to the project, please follow these steps:
Fork the repository.
Create a new branch for your changes.
Implement your changes and push them to your forked repository.
Create a pull request with a clear description of your changes.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


## How to Play
To play the game, simply visit the website and click on the "Start Game" button. You will then be prompted to create a username and password. Once you have created a username and password, you can start playing the game.
The game is divided into a series of rooms. Each room contains a puzzle that you must solve in order to progress to the next room. The puzzles are designed to be challenging, but they are also fair