import '../App.css';
import AppMenu from './AppMenu';
import AppFooter from './AppFooter';
import IAppLayoutProps from '../interfaces/IAppLayoutProps';

function AppLayout(props: IAppLayoutProps) {
  return (
    <>
      <AppMenu/>
      {props.children}
      <AppFooter/>
    </>
  );
}

export default AppLayout;
