import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;
