import { Typography } from '@mui/material';
import '../App.css';
import IAppContainerProps from '../interfaces/IAppContainerProps';

export default function AppContainer(props: IAppContainerProps) {
  return (
    <>
      <Typography variant='h3'>{props.containerHeader}</Typography>
      {props.children}
    </>
  );
}
