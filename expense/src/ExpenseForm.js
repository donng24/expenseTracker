import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./ExpenseForm.css";

const ExpenseForm = ({ onAddExpense }) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      date,
      amount,
      description,
    };
    onAddExpense(newExpense);
    setDate("");
    setAmount("");
    setDescription("");
  };

  return (
    <form className="root-form" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <TextField
        className="styled-textfield"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <TextField
        className="styled-textfield"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <TextField
        className="styled-textfield"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button
        className="styled-button"
        type="submit"
        variant="contained"
        color="primary"
      >
        Add Expense
      </Button>
    </form>
  );
};

export default ExpenseForm;
