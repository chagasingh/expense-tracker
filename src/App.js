
import { Fragment } from 'react';
import { Route, Switch} from 'react-router-dom';
import AuthForm from './components/AuthForm/AuthForm'
import ProfileForm from './components/Profile/ProfileForm';
import Layout from './components/Layout/Layout';
import StartingPageContent from './components/StartingPage/StartingPageContent';
import ForgotPassword from './components/ForgotPassword/ForgotPassword'


import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './components/AuthForm/Dark_lightMode.css'
import {authActions,ExpenseAction,themeAction} from "./store/auth-redux";
import { fectingAllData } from "./components/Expense/expenses-actions";




function App() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const premium = useSelector((state) => state.theme.premium);
  const activePremium = useSelector((state) => state.theme.cvandDark);

  const toggleThem = () => {
    dispatch(themeAction.changeTheme());
    console.log('change theme called')
  };

  useEffect(() => {
    dispatch(fectingAllData())
  }, [dispatch])

  return (
    <Fragment>
      <div id={darkMode}>
      <Layout/>
        {isLoggedIn && activePremium && (
          <div className="switch">
            <label>{darkMode === "light" ? "Light Mode" : "Dark Mode"}</label>
            <button onClick={toggleThem}>toggle</button>
          </div>
        )}
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
        <Route path="/forgot">
          <ForgotPassword/>
        </Route>
      </Switch>
      </div>
    </Fragment>
  );
}

export default App;

