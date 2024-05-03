import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import "./ExpenseList.css";

const ExpenseList = ({ expenses }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter expenses based on selected month, year, and search term
  const filteredExpenses = expenses.filter((expense) => {
    const expenseMonth = new Date(expense.date).getMonth() + 1;
    const expenseYear = new Date(expense.date).getFullYear();
    const expenseDescription = expense.description.toLowerCase();
    const searchTermLowerCase = searchTerm.toLowerCase();

    return (
      (selectedMonth === "" || expenseMonth === parseInt(selectedMonth)) &&
      (selectedYear === "" || expenseYear === parseInt(selectedYear)) &&
      (searchTerm === "" ||
        expenseDescription.includes(searchTermLowerCase) ||
        expense.date.includes(searchTermLowerCase) ||
        expenseYear.toString().includes(searchTermLowerCase))
    );
  });

  // Calculate total expenses for the year
  const totalYearlyExpense = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );

  // Calculate total expenses for each month
  const monthlyExpenses = {};
  expenses.forEach((expense) => {
    const month = new Date(expense.date).getMonth();
    if (!monthlyExpenses[month]) {
      monthlyExpenses[month] = 0;
    }
    monthlyExpenses[month] += parseFloat(expense.amount);
  });

  return (
    <div className="root-container">
      <h2>Expense List</h2>
      <div className="input-container">
        <Select
          className="white-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <MenuItem value="">All Months</MenuItem>
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {new Date(2024, i).toLocaleString("default", { month: "long" })}
            </MenuItem>
          ))}
        </Select>
        <Select
          className="white-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <MenuItem value="">All Years</MenuItem>
          {Array.from({ length: 5 }, (_, i) => (
            <MenuItem key={2024 - i} value={2024 - i}>
              {2024 - i}
            </MenuItem>
          ))}
        </Select>
        <TextField
          className="white-textfield"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <p>Total Expense for the Year: ${totalYearlyExpense}</p>
      <h3>Monthly Expenses</h3>
      <ul>
        {Object.keys(monthlyExpenses).map((monthIndex) => (
          <li key={monthIndex}>
            <p>
              Month:{" "}
              {new Date(2024, monthIndex).toLocaleString("default", {
                month: "long",
              })}
            </p>
            <p>Total: ${monthlyExpenses[monthIndex]}</p>
          </li>
        ))}
      </ul>
      <h3>All Expenses</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell>{expense.date}</TableCell>
                <TableCell>${expense.amount}</TableCell>
                <TableCell>{expense.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExpenseList;
