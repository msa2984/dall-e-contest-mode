import { useEffect, useState } from 'react';
import '../App.css';
import AppContainer from './AppContainer';
import AppLayout from './AppLayout';
import { Button, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { getAllEntries, getVotingRecord, voteForImages} from '../api/api';
import { Check, HowToVote } from '@mui/icons-material';

export default function Contest() {
  const email = localStorage.getItem('email') ?? '';
  const [entries, setEntries] = useState<Array<any> | null>(null);
  const [didVoteSucceed, setDidVoteSucceed] = useState<boolean | null>(null);
  const [didUserVote, setDidUserVote] = useState<boolean | null>(null);
  const [selectedEntries, setSelectedEntries] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSelectedEntries([]);
        const entry_response = await getAllEntries();
        setEntries(entry_response);

        const voter_response = await getVotingRecord(email);
        setDidUserVote(voter_response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Invoke the async function

    // If you need to clean up something when the component unmounts,
    // return a function from useEffect
    return () => {
      // Cleanup code (if needed)
    };
  }, []); 

  async function submitVotes(){
    try {
      const result = await voteForImages(selectedEntries, email);
      setDidVoteSucceed(result == null);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // function updateSelectedEntries(selectedEntry: string){
  //   if(selectedEntries.find(s => s == selectedEntry)){
  //     setSelectedEntries(selectedEntries.filter(s => s == selectedEntry));
  //   } else {
  //     if(selectedEntries.length <= 3) {
  //       setSelectedEntries(selectedEntries.concat(selectedEntry));
  //     }
  //   }
  // }
  
  return (
    <>
      <AppLayout children={
        [<AppContainer
          containerHeader='Contest Submissions'
          children={[
            <p>Welcome to the contest page! Here, you can see the images submitted by everyone in class. Please vote for your 3 favorites! Once you've voted, you will not be able to vote again.</p>,
            <div className='imagine-contest-container'>
              {entries && <div>
                <Typography variant="h3">Class Entries</Typography>
                <ImageList sx={{ width: 360 }}>
                  {entries.map((entry) => (
                    <ImageListItem key={entry.id}>
                      <img
                        className='contest-image-fmt'
                        srcSet={entry.url}
                        src={entry.url}
                        alt={entry.prompt}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={entry.prompt}
                        subtitle={entry.user == email ? <span color='green'>Submitted by me!</span> : <span>Submitted by: {entry.user}</span>}
                        id={entry.id}
                        actionIcon={
                          <IconButton
                            aria-label={`Vote for ${entry.id}`}
                            color={selectedEntries.findIndex(s => s == entry.id) >= 0 ? 'primary' : 'secondary'}
                          >
                            <HowToVote />
                          </IconButton>
                        }
                        onClick={(event) => console.log(event.currentTarget.id)}
                        position="below"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>}
              {!entries && <span>Sorry, there are no entries to the contest!</span>}
            </div>,
            <div className='imagine-input-container'>
              <Typography variant='body1' color="secondary">This can only be performed once!</Typography>
              <Button
                  className="imagine-vote-submit-button"
                  variant="contained"
                  onClick={() => {
                    submitVotes();
                  }}
                  disabled={didVoteSucceed || didUserVote ? true : false}
                  endIcon={<Check />}>
                    Submit your votes!
              </Button>
            </div>
            ]}/>]}/>
    </>
  );
}
