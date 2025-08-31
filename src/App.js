import { useState, useEffect } from "react";
import dataSource from "./DataSource";
import ExpenseList from "./ExpenseList";
import "./App.css";
import ExpenseForm from "./ExpenseForm";

function App() {
  const [expenseList, setExpenseList] = useState([]);
  const [expenseListLoading, setExpenseListLoading] = useState(true);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);
  const [activateEditForm, setActivateEditForm] = useState(false);

  const loadExpenses = async () => {
    try {
      const response = await dataSource.get("/expenses");
      setExpenseList(response.data);
      calculateExpenses(response.data);
      setExpenseListLoading(false);
    } catch (error) {
      console.log("Error fetching expenses", error);
      setExpenseListLoading(false);
    }
  }

  const handleCancelUpdate = () => {
    setActivateEditForm(false);
    setExpenseToUpdate(null);
  }

  const loadEditForm = () => {
    if (activateEditForm === true){
      return (
        <>
          <ExpenseForm handleCancelUpdate={handleCancelUpdate} expenseToUpdate={expenseToUpdate} saveExpense={saveExpense}/>
        </>
      );
    } else{
      return (
        <>
          <ExpenseForm saveExpense={saveExpense}/>
        </>
      )
    }
  }

  const calculateExpenses = (expenses) => {
    let total = 0;
    expenses.forEach(expense => {
      total += expense.amount;
    });
    setTotalExpenses(total);
  }

  const onEditClick = async (id) => {
    try{
      const response = await dataSource.get(`/expenses/${id}`);
      setExpenseToUpdate(response.data);
      setActivateEditForm(true);
    } catch(error){
      console.log("Error fetching expense to edit", error);
    }
  }

  const populateExpenses = () => {
    if (expenseListLoading) {
      return (
        <>
          <p>Loading...</p>
        </>
      );
    } else {
      return (   
        <>
        <div className="main-content">
          <div className="total-amount-element">
            Total: <b>${totalExpenses}</b>
          </div>
          {loadEditForm()}
          <div className="expense-content">
            <ExpenseList onEditClick={onEditClick} deleteExpense={deleteExpense} expenseList={expenseList}/>
          </div>
        </div>
        </>
      );
    }
  }

  const deleteExpense = async (id) => {
    try{
      const response = await dataSource.delete(`/expenses/${id}`);
      loadExpenses();
    } catch(error){
      console.log("Unable to delete expense", error);
    }
  }

  const saveExpense = async (expense) => {
    if (expenseToUpdate){
      try{
        const response = await dataSource.put(`/expenses/${expenseToUpdate.id}`, expense);
        loadExpenses();
      }catch(error){
        console.log("Error creating expense", error);
      }
    } else{
      try{
        const response = await dataSource.post("/expenses", expense);
        loadExpenses();
      }catch(error){
        console.log("Error creating expense", error);
      }
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <>
      {populateExpenses()}
    </>
  );
}

export default App;
