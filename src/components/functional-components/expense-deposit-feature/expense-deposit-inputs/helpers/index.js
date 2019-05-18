import utils from "utils/currency"

const numbersOnlyRegex = /\d+/g

export class Amount {
  constructor(amount) {
    this._amount = amount
  }

  getAmount() {
    return this._amount
  }

  parseNumber() {
    if (typeof this._amount === "string" && this._amount.length > 0) {
      const parsedNum = this._amount.match(numbersOnlyRegex)
      if (parsedNum !== null) {
        return new Amount(parsedNum.join(""))
      }
    }
    return new Amount("")
  }

  isNotANumber() {
    return isNaN(parseInt(this._amount))
  }

  convertToCurrency() {
    return new Amount(utils.convertStringToCurrency(this._amount))
  }
}

export const changeAmount = (amount, setAmount) => {
  let newAmount = amount.parseNumber()
  let err = false

  if (newAmount.isNotANumber()) {
    err = "Please provide an integer value."
  } else {
    newAmount = newAmount.convertToCurrency()
  }
  setAmount({
    value: newAmount.getAmount(),
    err: err,
  })
}

// old impl
// export const changeAmount = (value, setAmount) => {
//   let newAmount = ""
//   let err = false
//   if (value.length > 0) {
//     value = value.match(numbersOnlyRegex)
//     if (value !== null) {
//       value = value.join("")
//     }
//   }
//   const valueIsString = isNaN(value)
//   if (valueIsString || typeof valueIsString !== "number") {
//     err = "Please provide an integer value."
//   } else {
//     newAmount = utils.convertStringToCurrency(value)
//   }
//   setAmount({
//     value: newAmount,
//     err: err,
//   })
// }
