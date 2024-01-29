import React, { useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Loans } from "../api/collections/loans";
import { useNavigate } from "react-router-dom";

function Lender({ role, email }) {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    if (!role || !email) {
      navigate("/signup");
    }
  }, [navigate]);

  const { activeLoans } = useTracker(() => {
    const handle = Meteor.subscribe("allLoans");

    if (!handle.ready()) {
      return { activeLoans: [] };
    }

    const allLoans = Loans.find().fetch();
    const active = allLoans.filter((loan) => !loan.isApproved);

    return { activeLoans: active };
  });

  const { pastPayments, pastCnt } = useTracker(() => {
    const pastPayments = Loans.find({
      approvedBy: email,
      isApproved: true,
    }).fetch();
    const pastCnt = pastPayments.length;

    return { pastPayments, pastCnt };
  }, [email]);

  const handleApprove = (loanId) => {
    Meteor.call("approveLoan", loanId, email, (error) => {
      if (!error) {
        // Handle success
      }
    });
  };

  return (
    <div className="">
      <div className="w-full">
        <h1 className="text-xl font-light border-b mb-4 text-gray-700">
          Active Loans ({activeLoans.length})
        </h1>
        <div className="">
          {activeLoans.length === 0 ? (
            <p>No active loans</p>
          ) : (
            activeLoans.map((loan) => (
              <div
                className="flex w-full justify-between items-center"
                key={loan._id}
              >
                <p className="text-gray-800">
                  Loan amount - {loan.borrowerInfo.loanAmount}
                </p>
                <button
                  className="bg-green-500 text-white px-3 py-2 rounded-lg mt-3 hover:bg-green-600 focus:outline-none"
                  onClick={() => handleApprove(loan._id)}
                >
                  Approve
                </button>
              </div>
            ))
          )}
        </div>
        <h1 className="text-xl font-light border-b mb-4 mt-6 text-gray-700">
          Past Payments ({pastCnt})
        </h1>
        <div className="">
          {pastPayments.length === 0 ? (
            <p>No past payments</p>
          ) : (
            pastPayments.map((loan) => (
              <div
                className="flex w-full justify-between items-center mt-3"
                key={loan._id}
              >
                <p className="text-gray-800">
                  Rs. {loan.borrowerInfo.loanAmount}
                </p>
                <p className="text-gray-600">
                  {new Date(loan.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Lender;
