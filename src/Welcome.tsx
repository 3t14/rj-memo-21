import React from 'react';
// import './App.css';

type WelcomeProps = {
  name: string
}
const Welcome = ({ name }: WelcomeProps) => (
  <h1>やぁ, {name} ! </h1>
);

export default Welcome;

