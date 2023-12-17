import '../App.css';
import AppContainer from './AppContainer';
import AppLayout from './AppLayout';
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import { getImageFromPrompt } from '../api/api';
import { Link } from 'react-router-dom';

export default function Imagine() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [didPromptFail, setDidPromptFail] = useState(false);

  async function submitCurrentPrompt() {
    if(prompt) {
      const result = await getImageFromPrompt(prompt);
      if(result){
        setImageUrl(result);
      } else {
        setDidPromptFail(true);
      }
    } else {
      console.warn('Tried to submit an empty prompt, cannot imagine without user input!');
    }
  }

  async function submitToClassContest(){

  }

  return (
      <AppLayout children={
        [<AppContainer
          containerHeader='Create an Image with DALL-E'
          children={[
            <div>
              <Typography>Using the following textbox, provide a description to generate an image. DALL-E can understand many languages, however you may see the most consistent results with English or Spanish.</Typography>
              <Typography variant="h5">Example descriptions</Typography>
              <ul>
                <li>An extremely large bottle of soda</li>
                <li>una manzana de caricatura</li>
                <li>Halloween-Müsli</li>
              </ul>

              <TextField
                className="imagine-text-field"
                id="imagine-prompt-textfield"
                label="Provide a prompt for DALL-E"
                value={prompt}
                onChange={(event) => {
                  setPrompt(event.target.value);}}
                variant="filled"/>
              <Button
                className="imagine-prompt-submit-button"
                variant="contained"
                onClick={() => {
                  submitCurrentPrompt();
                }}
                endIcon={<Check />}>
                  Submit your prompt!
              </Button>
              <Typography><i>Keep in mind there are content policies in place monitoring all input. Only use appropriate language.</i></Typography>

              <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                <Typography variant="h5">Generated Image</Typography>
                <img src={imageUrl} alt={prompt}/>
                <Typography>Like this image? Submit it to the class contest! You can see your current submission on the <Link to="/contest">Contest</Link> page. Selecting the submit button will overwrite your current entry.</Typography>
                <Button
                className="imagine-prompt-submit-button"
                variant="contained"
                onClick={() => {
                  submitToClassContest();
                }}
                endIcon={<Check />}>
                  Submit your image!
              </Button>
              </Box>
            </div>
          ]} />
        ]} />
  );
}
