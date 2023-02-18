import { Fragment } from 'react';
import ExpenseShow from '../Expense/ExpenseShow';
import VerifyEmailForm from '../VerifyEmail/VerifyEmailForm';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {

  return (
    <Fragment>
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      <VerifyEmailForm/><br/>
      <h3>Complete Your Profile as Soon as Possible...</h3>
      <h4>If done then ignore this message</h4>
      <ExpenseShow/>
    </section>
    
    </Fragment>
  );
};

export default StartingPageContent;
