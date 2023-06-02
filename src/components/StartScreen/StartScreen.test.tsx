// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import StartScreen from './StartScreen.component';

// test('renders game title, keyhole image, and start button', () => {
//   const { getByText, getByAltText } = render(<StartScreen />);
//   const title = getByText(/AI Coder Escape Room/i);
//   const keyhole = getByAltText(/Keyhole/i);
//   const startButton = getByText(/Start Game/i);

//   expect(title).toBeInTheDocument();
//   expect(keyhole).toBeInTheDocument();
//   expect(startButton).toBeInTheDocument();
// });

// test('button click redirects to the first escape room', () => {
//   delete window.location;
//   window.location = { href: '' } as any;

//   const { getByText } = render(<StartScreen />);
//   const startButton = getByText(/Start Game/i);

//   fireEvent.click(startButton);

//   expect(window.location.href).toEqual('/escape-room-1');
// });
