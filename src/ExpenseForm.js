import React, {useState, useEffect, use} from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    let expense = {
        title: title,
        amount: amount,
        date: date,
        description: description
    };

    useEffect(() => {
        if (props.expenseToUpdate){
            setTitle(props.expenseToUpdate.title);
            setAmount(props.expenseToUpdate.amount);
            setDate(props.expenseToUpdate.date);
            setDescription(props.expenseToUpdate.description);
        }
    }, [props.expenseToUpdate]);

    const handleSaveExpense = (e) => {
        e.preventDefault();
        props.saveExpense(expense);
        resetValues();
    }

    const handleCancelUpdate = (e) => {
        e.preventDefault();
        props.handleCancelUpdate();
        resetValues();
    }

    const resetValues = () => {
        setTitle("");
        setAmount("");
        setDate("");
        setDescription("");
    }

    const populateButtons = () => {
        if (props.expenseToUpdate){
            return (
                <div className="btn-group">
                    <button onClick={handleCancelUpdate} className="expense-form-edit-btn">Cancel</button> 
                    <button type="submit" className="expense-form-update-btn">Update</button> 
                </div>
            );
        } else{
            return (
                <div className="btn-group">
                    <button type="submit" className="submit-btn">Add</button>  
                </div>
            );
        }
    }

    return (
        <>
        <div>
            <form onSubmit={handleSaveExpense}>
                <div className="input-fields">
                    <div className="">
                        <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} className="form-control" placeholder="Title" required/>                
                    </div>
                    <div className="">
                        <input type="number" value={amount} onChange={(e) => {setAmount(e.target.value)}} className="form-control" placeholder="Amount" required/>
                    </div>
                    <div className="">
                        <input type="date" value={date} onChange={(e) => {setDate(e.target.value)}} className="form-control" id="date" required/>
                    </div>
                    <div className="">
                        <input type="text" value={description} onChange={(e) => {setDescription(e.target.value)}} className="form-control" placeholder="Description" id="description"/>
                    </div>
                    <div className="btn-container">
                        {populateButtons()}
                    </div>
                </div>
            </form>
        </div>
        </>
    );
}

export default ExpenseForm;