import Dinero from "dinero.js"

const numbersOnlyRegex = /\d+/g

// Not really ideal to export this and pepper it through the UI code...
// But when I attempted to use this in the reducer (an ideal location)
// Adding this onto a previously formatted amount results in an output of
// 0$40.00
const formatCurrency = amount => {
  if (typeof amount === "number") {
    return Dinero({
      amount: amount,
      currency: "USD",
    }).toFormat("$0,0.00")
  } else {
    return "Provide an amount that is a typeof number."
  }
}

const convertCurrencyToInt = str => {
  if (str !== null && str.length > 0) {
    str = str.match(numbersOnlyRegex).join("")
    return parseInt(str)
  } else {
    return ""
  }
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
