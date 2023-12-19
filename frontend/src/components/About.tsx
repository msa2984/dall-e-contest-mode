
import { Link } from 'react-router-dom';
import '../App.css';
import AppContainer from './AppContainer';
import AppLayout from './AppLayout';

export default function About() {
  return (
      <AppLayout children={
        [<AppContainer
          containerHeader='About This Site'
          children={[
          <p>The code for this application can be found in <Link to="https://github.com/msa2984/dall-e-contest-mode">this Github repository</Link>.</p>,
          <div>
            <p>It leverages the following nodejs packages:</p>
            <ul>
                <li>
                    <Link to="https://mui.com/material-ui/">Material UI React Component Library</Link>
                </li>
                <li>
                    <Link to="https://www.npmjs.com/package/react-router-dom">React Router DOM for Page Routing</Link>
                </li>
            </ul>
          </div>]} />
        ]} />
  );
}
