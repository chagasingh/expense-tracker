
import classes from "./ExpenseForm.module.css";
import ExpenseInput from "./ExpenseInput";
import React, { Fragment, useEffect, useState } from "react";

import { themeAction } from "../../store/auth-redux";
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import { addingExpenses, EditingExpenses } from "./expenses-actions";


let id = "";
let totalAmount =0
const ExpenseForm = (props) => {
  const showExpense = useSelector((state) => state.expenseitem.expense);
  const activePremium = useSelector((state) => state.theme.cvandDark);
  const dispatch = useDispatch();

  const [enteredExpense, setEnteredExpense] = useState("");
  const [enteredDetails, setEnteredDetails] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [itemToBeEdit, setItemToBeEdit] = useState(false);
  const [premium, setPrmium] = useState(false);

  const activePremiumHandler = () => {
    dispatch(themeAction.cvDarkMode(true));
    setPrmium(true)
  };
  const headers = [
    { label: "Expense Amount", key: "enteredExpense" },
    { label: "Details", key: "enteredDetails" },
    { label: "Category", key: "enteredCategory" },
  ];

  const csvLink = {
    filename: "file.csv",
    headers: headers,
    data: showExpense,
  };

  const EditExpenseHandler = (data) => {
    setEnteredExpense(data.enteredExpense);
    setEnteredDetails(data.enteredDetails);
    setEnteredCategory(data.enteredCategory);
    setItemToBeEdit(true);
    id = data.id;
  };

  const expenseHandler = (event) => {
    setEnteredExpense(event.target.value);
  };
  const detailsHandler = (event) => {
    setEnteredDetails(event.target.value);
  };
  const categoryHandler = (event) => {
    setEnteredCategory(event.target.value);
  };
  const SubmitHandler = (event) => {
    event.preventDefault();
    if (itemToBeEdit) {
      const obj = {
        enteredExpense,
        enteredDetails,
        enteredCategory,
      };
      console.log(id);
      dispatch(EditingExpenses(id, obj));
    } else {
      const obj = {
        enteredExpense,
        enteredDetails,
        enteredCategory,
      };
      dispatch(addingExpenses(obj));
    }
    setEnteredExpense("");
    setEnteredDetails("");
    setEnteredCategory("");
  };

  totalAmount = showExpense?.reduce(
    (ack, item) => (ack += Number(item.enteredExpense)),
    0
  );

  useEffect(() => {
    console.log(totalAmount)
    if (totalAmount >= 10000) {
      setPrmium(true);
    }else {
      setPrmium(false)
    }
   },[]) 

  return (
    <Fragment>
      {premium && (
        <div className={classes.premium}>
          <button onClick={activePremiumHandler}>Active Premium</button>
        </div>
      )}<br/>
      <div className={classes.expensefrom}>
        <h2>EXPENSE TRACKER</h2>
        <form onSubmit={SubmitHandler}>
          <div className={classes.input}>
            <div>
              {" "}
              <label htmlFor="Expense Amount">Expense Amount:</label>
            </div>{" "}
            <div>
              <input
                type="text"
                id="enteredExpense"
                value={enteredExpense}
                onChange={expenseHandler}
              ></input>
            </div>
            <div>
              {" "}
              <label htmlFor="Details">Details:</label>
            </div>{" "}
            <div>
              <input
                type="text"
                id="enteredDetails"
                value={enteredDetails}
                onChange={detailsHandler}
              ></input>
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <select
                id="enteredCategory"
                onChange={categoryHandler}
                value={enteredCategory}
              >
                <option>Food</option>
                <option>Petrol</option>
                <option>Salary</option>
                <option>Travlling</option>
                <option>Study</option>
                <option>House Keeping</option>
              </select>
            </div>
          </div>
          <div>
              <button>Submit</button>
            </div>
        </form><br/>
      </div>
      <div className={classes.text}>
      <h2>Your Expenses...</h2></div>
      {showExpense.map((item) => (
        <ExpenseInput
          key={item.__id}
          id={item.id}
          item={item}
          EditExpenseHandler={EditExpenseHandler}
        />
      ))}
      <div>
     <h1>Total Amount = {totalAmount}</h1>
     </div>
     {premium && activePremium && (
       <div className={classes.csv}>
        <CSVLink {...csvLink}>
           <button>Premimum Only Download CSV</button>
        </CSVLink>
       </div>
     )}<br/>
   </Fragment>
  );
};
export default ExpenseForm;