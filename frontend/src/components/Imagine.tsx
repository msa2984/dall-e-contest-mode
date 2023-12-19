import '../App.css';
import AppContainer from './AppContainer';
import AppLayout from './AppLayout';
import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { getImageFromPrompt, submitCurrentImage } from '../api/api';

export default function Imagine() {
  const [email, setEmail] = useState<string>(localStorage.getItem('email') ?? '');
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [didPromptFail, setDidPromptFail] = useState<boolean>(false);
  const [didSubmissionSucceed, setDidSubmissionSucceed] = useState<boolean | null>(null);

  async function submitCurrentPrompt() {
    if(!email) {
      console.warn('Tried to submit without an email address!');
      return;
    }

    if(prompt) {
      setDidSubmissionSucceed(null);
      setDidPromptFail(false);
      setIsImageLoading(true);
      setImageUrl('');

      const result = await getImageFromPrompt(prompt, email);
      if(result){
        setImageUrl(result);
      } else {
        setDidPromptFail(true);
      }
      setIsImageLoading(false);
    } else {
      console.warn('Tried to submit an empty prompt, cannot imagine without user input!');
    }
  }

  async function submitToClassContest(){
    if(!email) {
      console.warn('Tried to submit without an email address!');
      return;
    }
    
    if(prompt && imageUrl) {
      const result = await submitCurrentImage(prompt, imageUrl, email);
      if(result) {
        setDidSubmissionSucceed(true);
      } else {
        setDidSubmissionSucceed(false);
      }
    }
  }

  return (
      <AppLayout children={
        [<AppContainer
          containerHeader='Create an Image with DALL-E'
          children={[
            <div>
              <TextField
                id="email-address-textfield"
                label="Provide your email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  localStorage.setItem('email', event.target.value);}}
                variant="filled"
                className="imagine-input-container"/>
              <Typography>Using the following textbox, provide a description to generate an image. DALL-E can understand many languages, however you may see the most consistent results with English or Spanish.</Typography>
              <Typography variant="h5">Example descriptions</Typography>
              <ul>
                <li key="english">An extremely large bottle of soda</li>
                <li key="spanish">una manzana de caricatura</li>
                <li key="german">Halloween-Müsli</li>
              </ul>

              <div className='imagine-input-container'>
                <TextField
                  className="imagine-text-field"
                  id="imagine-prompt-textfield"
                  label="Provide a prompt for DALL-E"
                  value={prompt}
                  onChange={(event) => {
                    setPrompt(event.target.value);}}
                  variant="filled"
                  multiline
                  rows={6} />
                <Typography
                  color='red'>
                    <i>Keep in mind there are content policies in place monitoring all input. Only use appropriate language.</i>
                </Typography>
                <Button
                  className="imagine-prompt-submit-button"
                  variant="contained"
                  onClick={submitCurrentPrompt}
                  endIcon={<Check />}>
                    Submit your prompt!
                </Button>
              </div>
              
              <div className='imagine-input-container'>
                {isImageLoading && <div>
                    <CircularProgress
                      size="40%"
                      sx={{
                        top: '50%',
                        left: '50%',
                        marginTop: "10%",
                        marginLeft: "30%"
                      }}
                      color="primary"
                    />
                  </div>
                }         
                {!isImageLoading && imageUrl && <div>
                    <Typography variant="h5">Generated Image</Typography>
                    <img src={imageUrl} alt={prompt} className='image-fmt'/>
                    <Typography>Like this image? Submit it to the class contest! You can see your current submission on the contest page. Selecting the submit button will overwrite your current entry.</Typography>
                    <Button
                    className="imagine-prompt-submit-button"
                    variant="contained"
                    onClick={() => {
                      submitToClassContest();
                    }}
                    disabled={didSubmissionSucceed ?? false}
                    endIcon={<Check />}>
                      Submit your image!
                    </Button>
                    {didSubmissionSucceed && <Typography color="secondary" variant="body1">
                      Thanks for your submission to the class contest! You can view it on the contest page.
                    </Typography>}
                    </div>}

                  {!isImageLoading && !imageUrl && didPromptFail && <div style={{marginTop: "24px"}}>
                    <Typography variant="body1">Sorry, there was a problem with your prompt. Please try again in a few minutes.</Typography>
                  </div>}
              </div>
            </div>
          ]} />
        ]} />
  );
}
