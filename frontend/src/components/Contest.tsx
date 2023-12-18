import { useEffect, useState } from 'react';
import '../App.css';
import AppContainer from './AppContainer';
import AppLayout from './AppLayout';
import { Typography } from '@mui/material';
import { getAllEntries } from '../api/api';

export default function Contest() {
  const [email, setEmail] = useState<string>(localStorage.getItem('email') ?? '');
  const [entries, setEntries] = useState<Array<any> | null>(null);
  const [userEntry, setUserEntry] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllEntries();
        setEntries(response);
        setUserEntry(response?.find(e => e.user == email));
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
  
  return (
    <>
      <AppLayout children={
        [<AppContainer
          containerHeader='Class Submissions'
          children={[
            <p>Welcome to the contest page! Here, you can see the images submitted by everyone in class. Please vote for your 3 favorites! Once you've voted, you will not be able to vote again.</p>,
            <div className='imagine-input-container'>
                <Typography variant="h5">My Contest Entry</Typography>
                { userEntry && <div>
                    <img src={userEntry.url} alt={userEntry.prompt} className='image-fmt'/>
                    <Typography>{userEntry.prompt}</Typography>
                  </div>
                }
                { !userEntry && <Typography><i>I haven't submitted anything to the contest!</i></Typography>}
            </div>,
            <div>

            </div>
            ]}/>]}/>
    </>
  );
}
