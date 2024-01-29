import { Meteor } from 'meteor/meteor';
import { Loans } from '../imports/api/collections/loans'


Meteor.methods({
  'users.signup'({ email,role,password }) {
    try {
      const existingUser = Meteor.users.findOne({email: email});
      console.log(existingUser)
      if (existingUser) {
        throw new Meteor.Error('user-exists', 'User with this email already exists.');
      }
      const newUser = {
        email: email,
        password:password,
        role:role
      };
      const userId = Meteor.users.insert(newUser);
      return userId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Meteor.Error('signup-failed', 'Signup failed. Please try again.');
    }
  },
  'users.login'({email,password}){
    const user = Meteor.users.findOne({ email });
    
    if (!user) {
      throw new Meteor.Error('user-not-found', 'User with this email does not exist.');
    }
        if (user.password === password) {
      return {
        role: user.role,
      };
    } else {
      throw new Meteor.Error('login-failed', 'Incorrect password.');
    }
  },
    'loans.request'(email, amount) {
     
      const loanId = Loans.insert({
        borrowerInfo: email,
        status:'Pending',
        amount,
        createdAt: new Date(),
        isApproved:false,
        approvedBy:'',
        approvedTime:''
      });
      
      return loanId;
    },

    'approveLoan'(loanId, lenderEmail) {
      const loan = Loans.findOne({_id :loanId});
  
      if (!loan) {
        throw new Meteor.Error('loan-not-found', 'Loan not found.');
      }
  
      if (loan.isApproved) {
        throw new Meteor.Error('loan-already-approved', 'This loan has already been approved.');
      }

      Loans.update(loanId, {
        $set: {
          status:"Approved",
          isApproved: true,
          approvedBy: lenderEmail,
          approvedTime:new Date()
        },
      });
    },
  

    
});

Meteor.publish('allLoans', function () {
  return Loans.find();
});

Meteor.publish('userLoans', function (userId) {
  return Loans.find({ 'borrowerInfo.email': userId });
});

