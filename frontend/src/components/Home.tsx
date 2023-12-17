
import { Link } from 'react-router-dom';
import '../App.css';
import AppContainer from './AppContainer';
import AppLayout from './AppLayout';
import React from 'react';

export default function Home() {
  return (
    <>
      <AppLayout children={
        [<AppContainer
          containerHeader='Getting Started'
          children={[
            <p>This Application uses OpenAI's DALL-E to let users generate images based on their text input.To learn more, visit the <Link to={"/about"}>About</Link> page.</p>,
            <p>Otherwise, navigate to the <Link to={"/imagine"}>Imagine with DALL-E</Link> page to get started.</p>]}/>]}/>
    </>
  );
}
