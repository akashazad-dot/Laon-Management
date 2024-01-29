// collections/loans.js
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


export const Loans = new Mongo.Collection('loans');

Loans.Schema = new SimpleSchema({
    borrowerInfo: {
      type: Object,
    },
    'borrowerInfo.email': {
      type: String,
    },
    'borrowerInfo.loanAmount': {
      type: String,
    },
    status: {
      type: String,
      allowedValues: ['Pending', 'Approved', 'Rejected'],
    },
    isApproved: {
      type: Boolean,
      defaultValue: false, // Loans start as not approved
    },
    approvedBy: {
      type: String,
      optional: true, // Store the lender's email who approved the loan
    },
    lenderDecisions: {
      type: Array,
      optional: true,
    },
    'lenderDecisions.$': {
      type: new SimpleSchema({
        lenderEmail: {
          type: String,
        },
        decision: {
          type: String,
          allowedValues: ['Approved', 'Rejected'],
        },
        decisionDate: {
          type: Date,
        },
      }),
    },
    confirmedPayments: {
      type: Array,
      optional: true,
    },
    'confirmedPayments.$': {
      type: new SimpleSchema({
        paymentDate: {
          type: Date,
        },
        amount: {
          type: String,
        },
        confirmedBy: {
          type: String,
        },
      }),
    },
    createdAt: {
      type: Date,
      autoValue: function () {
        if (this.isInsert) {
          return new Date();
        } else {
          this.unset(); // Prevent updates to createdAt
        }
      },
    },
  }).newContext();

