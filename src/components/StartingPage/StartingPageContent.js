import { Fragment } from 'react';
import ExpenseForm from '../Expense/ExpenseForm';

import VerifyEmailForm from '../VerifyEmail/VerifyEmailForm';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {

  return (
    <Fragment>
    <section className={classes.starting}>
      <h1>Control Your Expences...</h1>
      <VerifyEmailForm/><br/>
      <h3>Complete Your Profile as Soon as Possible...</h3>
      <h4>If done then ignore this message</h4>
      <ExpenseForm/>
    </section>
    
    </Fragment>
  );
};

export default StartingPageContent;
