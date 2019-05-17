import utils from "utils/currency"

export const changeAmount = (value, setAmount) => {
  let newAmount = ""
  let err = false
  const valueIsString = isNaN(value)
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
