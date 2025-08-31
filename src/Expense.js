import React from "react";
import "./Expense.css";

const Expense = (props) => {

    const handleDeleteExpense = async () => {
        props.deleteExpense(props.id);
    };

    const handleEditClick = async () => {
        props.onEditClick(props.id);
    };

    return (
        <>
            <div className="expense-body">
                <div className="expense-details">
                        <span className="title-element">{props.title}</span>
                        <span className="amount-element">${props.amount}</span>
                        <span className="date-element">{props.date}</span>
                        <span className="expense-description">{props.description}</span>
                </div>
                <div className="expense-buttons">
                    <button className="expense-btn edit-btn" onClick={handleEditClick}>Edit</button>
                    <button className="expense-btn delete-btn" onClick={handleDeleteExpense}>Delete</button>
                </div>
            </div>
        </>
    );
}

export default Expense;