import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Loans } from "../api/collections/loans";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const { allLoans } = useTracker(() => {
    const handle = Meteor.subscribe("allLoans");
    if (!handle.ready()) return { allLoans: [] };
    const allLoans = Loans.find().fetch();
    return { allLoans };
  });

  return (
    <div className="w-full p-1">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <thead className="text-xs bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Borrower info</th>
              <th className="px-6 py-3">Loan amount</th>
              <th className="px-6 py-3">Requested on</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Approved by</th>
              <th className="px-6 py-3">Approved time</th>
            </tr>
          </thead>
          <tbody>
            {allLoans.map((loan) => (
              <tr
                key={loan._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {loan.borrowerInfo.email}
                </td>
                <td className="px-6 py-4">{loan.borrowerInfo.loanAmount}</td>
                <td className="px-6 py-4">
                  {new Date(loan.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4">{loan.status}</td>
                <td className="px-6 py-4">
                  {loan.approvedBy ? loan.approvedBy : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {loan.approvedTime
                    ? new Date(loan.approvedTime).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
