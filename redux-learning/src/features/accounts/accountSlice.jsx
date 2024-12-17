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

// redux toolkit
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