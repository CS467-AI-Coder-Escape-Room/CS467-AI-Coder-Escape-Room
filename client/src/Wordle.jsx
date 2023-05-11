import React, { Component } from 'react';

class Wordle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secretWord: '',
      guesses: [],
      currentGuess: '',
      maxGuesses: 6,
    };
  }

  componentDidMount() {
    this.fetchSecretWord();
  }

  fetchSecretWord() {
    // Replace with a proper API call or word list in a real implementation
    const sampleWords = ['apple', 'water', 'table', 'chair', 'grape'];
    const secretWord = sampleWords[Math.floor(Math.random() * sampleWords.length)];

    this.setState({ secretWord });
  }

  handleInputChange(e) {
    const currentGuess = e.target.value.toLowerCase();
    if (currentGuess.length <= this.state.secretWord.length) {
      this.setState({ currentGuess });
    }
  }

  handleGuess(e) {
    e.preventDefault();
    const { currentGuess, guesses, maxGuesses } = this.state;

    if (guesses.length < maxGuesses && currentGuess.length === this.state.secretWord.length) {
      this.setState((prevState) => ({
        guesses: [...prevState.guesses, currentGuess],
        currentGuess: '',
      }));
    }
  }

  renderKeyboard() {
    const { secretWord, guesses } = this.state;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const incorrectGuesses = new Set();

    guesses.forEach((guess) => {
      guess.split('').forEach((char, idx) => {
        if (!secretWord.includes(char) && !incorrectGuesses.has(char)) {
          incorrectGuesses.add(char);
        }
      });
    });

    const buttonStyle = (char) => ({
      backgroundColor: incorrectGuesses.has(char) ? 'grey' : 'white',
      border: '1px solid black',
      borderRadius: '4px',
      padding: '5px 10px',
      margin: '5px',
      cursor: incorrectGuesses.has(char) ? 'not-allowed' : 'pointer',
    });

    return (
      <div>
        {alphabet.map((char) => (
          <button
            key={char}
            style={buttonStyle(char)}
            onClick={() => this.handleLetterClick(char)}
            disabled={incorrectGuesses.has(char)}
          >
            {char}
          </button>
        ))}
      </div>
    );
  }

  handleLetterClick(char) {
    this.setState((prevState) => ({
      currentGuess: prevState.currentGuess + char,
    }));
  }

  render() {
  const { secretWord, currentGuess, guesses, maxGuesses } = this.state;

  const highlightColor = (guess, idx) => {
      if (secretWord[idx] === guess[idx]) {
        return 'green';
      } else if (secretWord.includes(guess[idx])) {
        return 'yellow';
      } else {
        return 'red';
      }
  };

  const tileStyle = (color) => ({
      display: 'inline-block',
      width: '30px',
      height: '30px',
      lineHeight: '30px',
      textAlign: 'center',
      backgroundColor: color,
      borderRadius: '4px',
      marginRight: '5px',
      color: 'black',
      fontWeight: 'bold',
  });

  return (
    <div>
      <h1>Wordle</h1>
      <div>
        {guesses.map((guess, index) => (
          <p key={index}>
            {guess.split('').map((char, idx) => (
              <span key={idx} style={tileStyle(highlightColor(guess, idx))}>
                {char}
              </span>
            ))}
          </p>
        ))}
      </div>
      <form onSubmit={(e) => this.handleGuess(e)}>
        <input
          type="text"
          value={currentGuess}
          onChange={(e) => this.handleInputChange(e)}
          disabled={guesses.length >= maxGuesses || secretWord === currentGuess}
        />
        <button type="submit" disabled={guesses.length >= maxGuesses || secretWord === currentGuess}>
          Guess
        </button>
      </form>
      {secretWord === currentGuess && <p>Congratulations! You guessed the word!</p>}
      {guesses.length >= maxGuesses && <p>Sorry, you have reached the maximum number of guesses!</p>}
      {this.renderKeyboard()}
    </div>
  );
}
}

export default Wordle;
