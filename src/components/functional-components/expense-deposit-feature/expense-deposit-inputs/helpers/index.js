import utils from "utils/currency"

const numbersOnlyRegex = /\d+/g

export const changeAmount = (value, setAmount) => {
  let newAmount = ""
  let err = false
  if (value.length > 0) {
    value = value.match(numbersOnlyRegex)
    // pesky null check...
    if (value !== null) {
      value = value.join("")
    }
  }
  const valueIsString = isNaN(value)
  console.log("the value: ", value)
  console.log("the parseInt value: ", parseInt(value))
  console.log("the typeof value: ", typeof value)
  // had to add the typeof valueIsString because a null value
  // made it's way to this point and caused a bug in displaying
  // this error message... MONADDDDDSSS
  if (valueIsString || typeof valueIsString !== "number") {
    err = "Please provide an integer value."
  } else {
    newAmount = utils.convertStringToCurrency(value)
  }
  setAmount({
    value: newAmount,
    err: err,
  })
}
