import axios from "axios";
import { ExpenseAction } from "../../store/auth-redux";
if (!localStorage.getItem("email")) {
  localStorage.setItem("email", "");
}

 const  email = localStorage.getItem("email").replace(".", "").replace("@", "");
 console.log(`local storage email ${email}`)

export const fectingAllData = () => {
  return async (dispatch) => {
    const fecthData = async () => {
        const res = await axios.get(
          `https://react-movie-c353a-default-rtdb.firebaseio.com/${email}.json`
        );
        const loadedExpenses = [];
        for (const key in res.data) {
          loadedExpenses.push({
            id: key,
            enteredExpense: res.data[key].enteredExpense,
            enteredDetails: res.data[key].enteredDetails,
            enteredCategory: res.data[key].enteredCategory,
          });
        }
        console.log(`fetch req done ${email}`)
        return loadedExpenses;
    };
    const data = await fecthData();
    dispatch(ExpenseAction.fetchAllexpenses(data));
  };
};

export const addingExpenses = (obj) => {
  return async (dispatch) => {
    const addExpense = async () => {
        const res = await axios.post(
          `https://react-movie-c353a-default-rtdb.firebaseio.com/${email}.json`,
          obj
        );
        console.log(`post req done ${email} `)
        return res.data;

    };
    const id = await addExpense();
    const temp = { id: id, ...obj };
    dispatch(ExpenseAction.addexpense(temp));
  };
};

export const EditingExpenses = (id,obj) => {
    return async (dispatch) => {
      const editExpense = async () => {
        try {
          const res = await axios.put(
            `https://react-movie-c353a-default-rtdb.firebaseio.com/Expense${email}/${id}.json`, obj
          );
          console.log(res.data)
        } catch (error) {
          console.log(error);
        }
      };
      await editExpense();
      const temp = {id:id, ...obj}
      dispatch(ExpenseAction.editExpense(temp));
    };
  };

export const removingExpenses = (id) => {
  return async (dispatch) => {
    const removeExpense = async () => {
      try {
        const res = await axios.delete(
          `https://react-movie-c353a-default-rtdb.firebaseio.com/Expense${email}/${id}.json`
        );
      } catch (error) {
        console.log(error);
      }
    };
    await removeExpense();
    dispatch(ExpenseAction.removeExpense(id));
  };
};