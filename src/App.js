
import { Fragment } from 'react';
import { Route, Switch} from 'react-router-dom';
import AuthForm from './components/AuthForm/AuthForm'
// import Layout from './components/Layout/Layout';
import StartingPageContent from './components/StartingPage/StartingPageContent';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path='/' exact><AuthForm/></Route>
        <Route path="/home" exact>
          <StartingPageContent />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;

