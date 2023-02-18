import React from "react";
import  classes from './ExpenseInput.module.css'
const ExpenseInput =(props)=>{
console.log(  props.printexpense,'from inpuptpage' )

    return (
        <React.Fragment>
<div  className={classes.expenseInput}>
    <h2>Your Expenses...</h2>
 <ul>
      {props.printexpense.map((item)=>(
        <li  >
            <label>Expense Amount:</label>
       <span className={classes.data}>{item.enteredExpense} </span>
       <label>Details:</label>
      <span className={classes.data}> {item.enteredDetails}</span> 
      <label>Category:</label>
      <span className={classes.data}> {item.enteredCategory}</span> 
      <hr/>
        </li>
      ))}
    </ul> 
    </div>
    </React.Fragment>
    )
}
export default ExpenseInput;