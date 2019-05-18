import Dinero from "dinero.js"
// -1 point against dinero.js <- it won't go over 10,000.00

const numbersOnlyRegex = /\d+/g

// Not really ideal to export this and pepper it through the UI code...
// But when I attempted to use this in the reducer (an ideal location)
// Adding this onto a previously formatted amount results in an output of
// 0$40.00
// Is there some way to inverse the previously formatted amount built into the
// dinero lib?
const formatCurrency = amount => {
  console.log("typeof amount: ", typeof amount)
  console.log("amount: ", amount)
  if (typeof amount === "number") {
    return Dinero({
      amount: amount,
      currency: "USD",
    }).toFormat("$0,0.00")
  } else {
    return "something went wrong"
  }
}

const convertCurrencyToInt = str => {
  if (str !== null && str.length > 0) {
    str = str.match(numbersOnlyRegex).join("")
    return parseInt(str)
  } else {
    return ""
  }

  // if (str[0] === "$") {
  //   return parseInt(
  //     str
  //       .slice(1, str.length)
  //       .split(".")
  //       .join("")
  //   )
  // } else {
  //   return parseInt(str)
  // }
}

const convertStringToCurrency = value => {
  const amount = convertCurrencyToInt(value)
  const newValue = formatCurrency(parseInt(amount))
  return newValue
}

export default {
  formatCurrency,
  convertCurrencyToInt,
  convertStringToCurrency,
}
