import { useState } from 'react';
import classes from  './ExpenseForm.module.css'

const ExpenseForm = (props) => {
const [enteredExpense,setEnteredExpense]=  useState('')
const [enteredDetails,setEnteredDetails] = useState('')
const [enteredCategory,setEnteredCategory] = useState('')


const expenseHandler  =(event) =>{

  setEnteredExpense(event.target.value)  
}
const detailsHandler=(event)=>{

    setEnteredDetails(event.target.value)  
}
const categoryHandler =(event)=>{

    setEnteredCategory(event.target.value)  
}
const SubmitHandler = (event) =>{
event.preventDefault()
const obj = {
    enteredExpense,
    enteredDetails,
    enteredCategory
}
props.ondata(obj)

}

  return (
    <div  className={classes.expensefrom}>
      <h2>EXPENSE TRACKER</h2><br/>
      <form  onSubmit={SubmitHandler}>
        <div className={classes.input}>
          <div>
            {" "}
            <label htmlFor="Expense Amount">Expense Amount</label>
          </div>{" "}
          <div>
            <input type="number" value={enteredExpense} onChange={expenseHandler}></input>
          </div>
          <div>
            {" "}
            <label htmlFor="Details">Details</label>
          </div>{" "}
          <div>
            <input type="text"  value={enteredDetails} onChange={detailsHandler}></input>
          </div>
         <div>
            <label htmlFor="category">Category</label>
            <select onChange={categoryHandler}  value={enteredCategory} >
                <option>Food</option>
                <option>Petrol</option>
                <option>Salary</option>
                <option>Travlling</option>
                <option>Study</option>
                <option>House Keeping</option>
            </select>
         </div>
        </div>
        <div><button>Submit</button></div>
      </form>
    </div>
  );
};
export default ExpenseForm;