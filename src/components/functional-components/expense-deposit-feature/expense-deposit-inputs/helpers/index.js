import utils from "utils/currency"

const numbersOnlyRegex = /\d+/g

export const changeAmount = (value, setAmount) => {
  let newAmount = ""
  let err = false
  if (value.length > 0) {
    value = value.match(numbersOnlyRegex).join("")
  }
  const valueIsString = isNaN(value)
  console.log("the value: ", value)
  console.log("the parseInt value: ", parseInt(value))
  console.log("the typeof value: ", typeof value)
  if (valueIsString) {
    err = "Please provide an integer value."
  } else {
    newAmount = utils.convertStringToCurrency(value)
  }
  setAmount({
    value: newAmount,
    err: err,
  })
}
