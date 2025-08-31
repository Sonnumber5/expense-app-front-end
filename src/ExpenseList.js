import React from "react";
import Expense from "./Expense";
import "./Expense.css";

const ExpenseList = (props) => {

    const expenses = (props.expenseList || []).map((expense) => (
        <Expense 
        key={expense.id}
        id={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
        description={expense.description}
        deleteExpense={props.deleteExpense}
        onEditClick={props.onEditClick}
        />
    ));

    return (
        <>
            <div className="expense-group">
                {expenses.length > 0 ? expenses : <p>No expenses yet</p>}
            </div>
        </>
    );
}

export default ExpenseList;