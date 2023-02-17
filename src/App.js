
import { Fragment } from 'react';
import { Route, Switch} from 'react-router-dom';
import AuthForm from './components/AuthForm/AuthForm'
// import MainNavigation from './components/Layout/MainNavigation';
import ProfileForm from './components/Profile/ProfileForm';
import Layout from './components/Layout/Layout';
import StartingPageContent from './components/StartingPage/StartingPageContent';

function App() {
  return (
    <Fragment>
      <Layout/>
      <Switch>
        <Route path="/" exact>
          <AuthForm />
        </Route>
        <Route path="/login">
          <AuthForm />
        </Route>
        <Route path="/home">
          <StartingPageContent />
        </Route>
        <Route path="/profile">
          <ProfileForm />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;

