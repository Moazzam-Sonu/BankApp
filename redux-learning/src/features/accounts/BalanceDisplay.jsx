import { useSelector } from "react-redux";
function BalanceDisplay() {
function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
const balance  = useSelector((store)=> {
  console.log(store)
  return store.acount?.balance})


  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
