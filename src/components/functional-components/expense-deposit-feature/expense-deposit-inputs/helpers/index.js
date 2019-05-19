import flow from "lodash.flow"
import utils from "utils/currency"

const numbersOnlyRegex = /\d+/g

class Amount {
  constructor(amount) {
    this._amount = amount
  }

  getAmount = () => this._amount

  static validateCorrectInput = ([amount, setAmount]) => [
    amount.parseNumber(),
    setAmount,
  ]

  static validCurrencyCheck = ([amount, setAmount]) => {
    const result = amount.isNotANumber()
      ? this.currencyInvalidResult(amount)
      : this.currencyValidResult(amount)
    return [result, setAmount]
  }

  static currencyValidResult = amount => ({
    value: amount.convertToCurrency().getAmount(),
    err: null,
  })

  static currencyInvalidResult = amount => ({
    value: amount.getAmount(),
    err: "Please provide an integer value.",
  })

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

export const wrapAmount = amount => new Amount(amount)

export const changeAmount = (amount, setAmount) =>
  processAmountInput([amount, setAmount])
