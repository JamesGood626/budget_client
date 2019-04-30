import React from "react"
import Button from "../foundational-components/button"

const transactionWarning = ({
  message,
  handleSubmit,
  dateData,
  transact,
  toggleModal,
}) => {
  return (
    <div className="warning-container">
      <h1>Warning</h1>
      <p>{message}</p>
      <div className="warning-btn-container">
        <Button
          onClick={e => handleSubmit(e, dateData, transact, toggleModal)}
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
          O
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
          X
        </Button>
      </div>
    </div>
  )
}

export default transactionWarning
