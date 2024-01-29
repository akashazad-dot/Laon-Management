import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Loans } from "../api/collections/loans";

function LoanRequest({ role, email }) {
  const [loanAmount, setLoanAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.call("loans.request", { email, loanAmount }, (error) => {
      if (error) {
        console.error("Error creating loan request:", error.reason);
      } else {
        setLoanAmount(0);
        console.log("Loan created successfully");
      }
    });
  };

  const { loans, loading } = useTracker(() => {
    const subscription = Meteor.subscribe("userLoans", email);

    const loans = Loans.find({ "borrowerInfo.email": email }).fetch();

    return {
      loans,
      loading: !subscription.ready(),
    };
  });

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-light mb-4">Loan Request</h1>
      <div className="flex flex-col md:flex-row">
        <form
          className="flex flex-col w-full md:w-1/2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col mb-4">
            <label className="mb-2">Amount</label>
            <input
              type="number"
              className="bg-gray-100 p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 focus:outline-none"
          >
            Request
          </button>
        </form>
        <div className="bg-gray-300 border-l p-4 ml-2 w-full md:w-1/2">
          <h1 className="text-md font-semibold mb-2">Past Loans</h1>
          <div className="w-full">
            {loans.map((loan) => (
              <div
                className="flex w-full justify-between items-center mb-4"
                key={loan._id}
              >
                <p className="text-lg">💲{loan.borrowerInfo.loanAmount}</p>
                <p className="text-sm md:text-md font-light hidden md:block">
                  🕕 {new Date(loan.createdAt).toLocaleString()}
                </p>
                <p
                  className={`text-sm md:text-md font-semibold ${
                    loan.status === "Pending"
                      ? "text-red-500"
                      : "text-green-400"
                  }`}
                >
                  {loan.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanRequest;
