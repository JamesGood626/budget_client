import flow from "lodash.flow"
import utils from "utils/currency"

const numbersOnlyRegex = /\d+/g

export class Amount {
  constructor(amount) {
    this._amount = amount
  }

  getAmount = () => this._amount

  static validateCorrectInput = ([amount, setAmount]) => [
    amount.parseNumber(),
    setAmount,
  ]

  static validCurrencyCheck = ([amount, setAmount]) => {
    let err = null
    if (amount.isNotANumber()) {
      err = "Please provide an integer value."
    } else {
      amount = amount.convertToCurrency()
    }
    const result = {
      value: amount.getAmount(),
      err: err,
    }
    return [result, setAmount]
  }

  static persistChangeResult = ([result, setAmount]) => setAmount(result)

  parseNumber = () => {
    if (typeof this._amount === "string" && this._amount.length > 0) {
      const parsedNum = this._amount.match(numbersOnlyRegex)
      if (parsedNum !== null) {
        return new Amount(parsedNum.join(""))
      }
    }
    return new Amount("")
  }

  isNotANumber = () => isNaN(parseInt(this._amount))

  convertToCurrency = () =>
    new Amount(utils.convertStringToCurrency(this._amount))
}

const processAmountInput = flow([
  Amount.validateCorrectInput,
  Amount.validCurrencyCheck,
  Amount.persistChangeResult,
])

// Newer Impl
export const changeAmount = (amount, setAmount) =>
  processAmountInput([amount, setAmount])

// New Impl
// export const changeAmount = (amount, setAmount) => {
//   // compose parseNumber ->
//   let newAmount = amount.parseNumber()
//   let err = false

//   // abstract this into method on Amount (validCurrencyCheck)
//   // which takes the output of parseNumber()
//   if (newAmount.isNotANumber()) {
//     err = "Please provide an integer value."
//   } else {
//     newAmount = newAmount.convertToCurrency()
//   }

//   // create persistAmount method on Amount
//   setAmount({
//     value: newAmount.getAmount(),
//     err: err,
//   })
// }

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
