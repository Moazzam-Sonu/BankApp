This is a simple React-Redux project demonstrating state management using Redux Toolkit. The app allows users to create a bank customer, deposit or withdraw money, and request loans.

✨ Features
Create New Customer: Add a customer's name and national ID to set up an account.
Deposit & Withdraw: Perform basic banking operations with real-time state updates.
Loan Requests: Enter loan amount and purpose for requesting loans.
State Management: State changes are handled seamlessly with Redux Toolkit.
🚀 Technology Stack
React: UI development.
Redux Toolkit: Modern state management for predictable state handling.
React-Redux: Integration of Redux with React.
Vite: Development environment for optimized React performance.
🛠️ Setup Instructions
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/react-redux-bank.git
cd react-redux-bank
Install Dependencies:

bash
Copy code
npm install
Run the App:

bash
Copy code
npm run dev
Open in Browser: Navigate to http://localhost:5173.

🔑 Redux Store Structure
The Redux state tracks:

customer details (name, national ID)
account status (balance loan and purpose)
Example Slice (accountSlice.jsx)
import { createSlice, createStore } from '@reduxjs/toolkit'
const initialState={
    balance:0,
    loan:0,
    loanPurpose:"",
    isLoading:false,
}
// export default function reducer (state = initialState, action){
//     console.log(action);
//     switch(action.type){
//         case "account/deposit":
//          return{ ...state, balance: state.balance + action.payload , isLoading:false}
//         case "account/withdraw":
//          return{ ...state, balance: state.balance - action.payload }
//         case "account/requestLoan":
//             if(state.loan >0) return state;
//             return{...state, balance: state.balance + action.payload.amount, loan: action.payload.amount, loanPurpose: action.payload.purpose}
//         case "account/payLoan":
//          return{ ...state, loan:0,loanPurpose:"", balance: state.balance - state.loan }
//         case "account/converted":
//          return{ ...state, isLoading:true }
//         default:
//             return state;
//     }
// }
// export function deposit(amount,currency){
//     dispatch({type:"account/converted"})
//     if(currency === 'USD')
//      return {type :"account/deposit", payload: amount}
//     return async function(dispatch , getState) {
//         const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`);  
//         const data = await res.json();
//         const converted = data.rates.USD;
//         dispatch({type:"account/deposit" , payload:converted})
//     }
// }
// export function withdraw(amount){
//     return {type :"account/deposit", payload: amount}
// }
// export function requestLoan(amount, purpose) {
//     return {
//       type: "account/requestLoan",
//       payload: { amount, purpose },
//     };
//   }
// export function payLoan() {
//     return { type: "account/payLoan" };
//   }

// redux toolkit---------------------------------------------------------------------------------------------
const accountSlice = createSlice({
    name:"acount",
    initialState,
    reducers:{
        deposit(state,action){
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state,action){
            state.balance -= action.payload;
        },
        requestLoan:{
            prepare(amount, purpose){
              return {
                payload:{amount, purpose}
              }
            },
        reducer:(state, action)=>{
            if(state.loan >0) return state;
            state.balance= state.balance + action.payload.amount;
            state.loan= action.payload.amount;
            state.loanPurpose = action.payload.purpose;
        }
        },
        payLoan(state,action){
            state.balance -=action.loan;
            state.loan =0;
            state.purpose ="";
        },
        converted(state){
       state.isLoading = true;
        }
    }
})
export const { withdraw , requestLoan , payLoan } = accountSlice.actions;
export default accountSlice.reducer;
export function deposit(amount,currency){
        dispatch({type:"acount/converted"})
        if(currency === 'USD')
         return {type :"acount/deposit", payload: amount}
        return async function(dispatch , getState) {
            const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`);  
            const data = await res.json();
            const converted = data.rates.USD;
            dispatch({type:"acount/deposit" , payload:converted})
        }
    }
🧪 Testing
To test your app, run:

bash
Copy code
npm test
📷 Screenshots
1. Create New Customer
![image](https://github.com/user-attachments/assets/365c56f3-2aa4-46ce-ae99-2b584502e685)

2. Account Operations
![image](https://github.com/user-attachments/assets/d66ec035-3342-4da9-b194-308621f723ec)
