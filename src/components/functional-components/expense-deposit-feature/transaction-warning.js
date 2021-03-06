import React from "react"
import Button from "components/functional-components/foundational-components/button"
import CheckMarkSvg from "components/functional-components/foundational-components/checkMarkSvg"
import ExitSvg from "components/functional-components/foundational-components/ExitSvg"

const transactionWarning = ({ message, handleSubmit, toggleModal }) => {
  return (
    <div className="warning-container">
      <h1>Warning</h1>
      <p>{message}</p>
      <div className="warning-btn-container">
        <Button
          onClick={handleSubmit}
          className="confirm-warning-btn"
          type="submit"
          dataTestId="confirm-warning-btn"
          radius={25}
          shadow={true}
          padding={[2, 2]}
          minHeight={3}
          width={3}
          topColor="#46FF90"
          bottomColor="#20E131"
          fontColor="#fff"
        >
          <CheckMarkSvg />
        </Button>
        <Button
          onClick={e => toggleModal("")}
          className="cancel-warning-btn"
          type="submit"
          dataTestId="cancel-warning-btn"
          radius={25}
          shadow={true}
          padding={[2, 2]}
          minHeight={3}
          width={3}
          topColor="#FF7878"
          bottomColor="#FF5E5E"
          fontColor="#fff"
        >
          <ExitSvg />
        </Button>
      </div>
    </div>
  )
}

export default transactionWarning
