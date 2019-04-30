import React, { Component } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;

  .warning-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    margin: 0 auto;
    margin-left: -0.8rem;
    padding: 1rem 1rem;
    width: 18rem;
    height: 18rem;
    background: #fff;

    p {
      font-size: 1.2rem;
    }

    .warning-btn-container {
      display: flex;
      justify-content: space-around;
    }
  }
`

class TransactModalForm extends Component {
  componentDidMount = () => {
    this.setBodyStyle("hidden")
  }

  componentWillUnmount = () => {
    this.setBodyStyle("scroll")
  }

  setBodyStyle = styleType => {
    const [body] = document.getElementsByTagName("body")
    body.style.overflowY = styleType
  }

  handleCloseClick = (e, toggleModal) => {
    const { nodeName } = e.target
    const clickOutsideOfForm =
      nodeName !== "FORM" &&
      nodeName !== "SELECT" &&
      nodeName !== "OPTION" &&
      nodeName !== "INPUT" &&
      nodeName !== "LABEL" &&
      nodeName !== "BUTTON"
    if (clickOutsideOfForm) {
      toggleModal("")
    }
  }

  render() {
    const { children, toggleModal } = this.props
    return (
      <Container onClick={e => this.handleCloseClick(e, toggleModal)}>
        {children}
      </Container>
    )
  }
}

export default TransactModalForm
