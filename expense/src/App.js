import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout"; // Import the Logout component
import { auth, firestore } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [isRegistered, setIsRegistered] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchExpenses(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const fetchExpenses = async (user) => {
    try {
      const expensesRef = firestore
        .collection("expenses")
        .where("userId", "==", user.uid);
      const snapshot = await expensesRef.get();
      const fetchedExpenses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleRegisterClick = () => {
    setIsRegistered(false);
  };

  const handleLogout = () => {
    auth.signOut(); // Sign out the user
  };

  return (
    <div>
      {!user && isRegistered ? (
        <Login />
      ) : (
        <>
          {!user && !isRegistered && <Register />}
          {user && (
            <>
              <Logout onLogout={handleLogout} />{" "}
              {/* Include the Logout button */}
              <ExpenseForm user={user} />
              <ExpenseList expenses={expenses} />
            </>
          )}
        </>
      )}
      {!user && isRegistered && (
        <button onClick={handleRegisterClick}>Register</button>
      )}
    </div>
  );
}

export default App;
