import Dinero from "dinero.js"

// Not really ideal to export this and pepper it through the UI code...
// But when I attempted to use this in the reducer (an ideal location)
// Adding this onto a previously formatted amount results in an output of
// 0$40.00
// Is there some way to inverse the previously formatted amount built into the
// dinero lib?
const formatCurrency = amount =>
  Dinero({
    amount: amount,
    currency: "USD",
  }).toFormat("$0,0.00")

export default formatCurrency
