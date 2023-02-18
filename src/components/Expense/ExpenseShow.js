import { Fragment ,useState} from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseInput from "./ExpenseInput";

const ExpenseShow=()=>{
  const [printexpense, setPrintExpense] = useState([]);
  const inputvalueHandler = (expense) => {
    setPrintExpense((prevexpense) => {
      return [expense, ...prevexpense];
    });
  };
  console.log(printexpense, "from expneseshow page");
  return (
    <Fragment>
      <ExpenseForm ondata={inputvalueHandler}></ExpenseForm>
      <ExpenseInput printexpense={printexpense}></ExpenseInput>
    </Fragment>
  );
}
export default ExpenseShow;