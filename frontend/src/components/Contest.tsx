import '../App.css';
import AppContainer from './AppContainer';
import AppLayout from './AppLayout';
import React from 'react';

export default function Contest() {
  return (
    <>
      <AppLayout children={
        [<AppContainer
          containerHeader='Class Submissions'
          children={[
            <p>Welcome to the contest page! Here, you can see the images submitted by everyone in class. Please vote for your 3 favorites! Once you've voted, you will not be able to vote again.</p>,
            ]}/>]}/>
    </>
  );
}
