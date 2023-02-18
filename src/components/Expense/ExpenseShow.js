import { Fragment ,useContext,useState,useEffect} from "react";
import AuthContext from "../../store/auth-context";
import ExpenseForm from "./ExpenseForm";
import ExpenseInput from "./ExpenseInput";

const ExpenseShow=()=>{

  const AuthCtx=useContext(AuthContext);
  const [printexpense, setPrintExpense] = useState([]);
  const [getdata, setGetdata] = useState([]);
useEffect(()=>{
  async function fetchExpenses(){
    try{
      const res = await fetch('https://react-movie-c353a-default-rtdb.firebaseio.com/Expense.json',{
        method:"GET",
        headers:{
          "Content-Type": "application/json"
        },
      })
      const data = await res.json();
      if(res.ok){
        const newdata = [];
        for(let key in data){
          newdata.push({id:key,...data[key]});
        }
        setGetdata(newdata)
        setPrintExpense(newdata)
      }else{
        throw data.error
      }
    }catch(error){
      console.log(error.message)
    }
  }
  fetchExpenses()

},[])
 
console.log(getdata,'from expenseShow useeffect get data')



  const inputvalueHandler = (expense) => {

    fetch("https://react-movie-c353a-default-rtdb.firebaseio.com/Expense.json", {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res, "form post data");
        return res.json();
      })
      .catch((err) => {
        console.log(err.message);
      });

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