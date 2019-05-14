// This is a test helper function
// Accepts an inputsList array of objects in the shape of
// {
//     labelText: String,
//     newInputValue: String/Number,
// }
const changeInputValueAndLoop = (getByLabelText, fireEvent, inputsList) => {
  inputsList.map(({ labelText, valueInput, finalValue }) => {
    let input = getByLabelText(labelText)
    // Before user input is received
    expect(input.value).toBe("")
    fireEvent.change(input, {
      target: { value: valueInput },
    })
    // Ensure user input is reflected in UI.
    expect(input.value).toBe(finalValue)
  })
}

module.exports = {
  changeInputValueAndLoop,
}
