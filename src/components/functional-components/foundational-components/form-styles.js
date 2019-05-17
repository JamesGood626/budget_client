import styled from "styled-components"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20rem;
  width: 20rem;
  padding: 0 1.8rem 0 1.8rem;
  background: #fcfcfc;
  margin-top: 20vh;
  margin-bottom: 20vh;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 35%);
  /* dark green text */
  color: #1d470c;

  label {
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1.2rem;
    transform: translateY(1.6rem);
    transition: transform 0.4s;
  }

  .input-active {
    transform: translate(-1.2rem, 0.2rem) scale(0.85);
  }

  input {
    height: 2rem;
    font-size: 1rem;
    border-top: 0px solid rgba(0, 0, 0, 0);
    border-left: 0px solid rgba(0, 0, 0, 0);
    border-right: 0px solid rgba(0, 0, 0, 0);
    border-bottom: 2px solid #20e131;

    &:focus {
      outline: none;
    }
  }

  #password {
    margin-bottom: 1.2rem;
  }

  button {
    margin-top: 1.2rem;
    padding: 0.6rem 1.2rem 0.6rem 1.2rem;
  }

  .error-text {
    color: red;
  }

  .amount--invalid {
    color: red;
    margin-top: 0.2rem;
    font-size: 0.9rem;
  }
`

export default Form
