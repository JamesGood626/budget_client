import styled from "styled-components"

export const Label = styled.label`
  display: block;
  position: relative;
  /* width: 8.4rem; */
  width: ${props => (props.modalSelect ? "100%" : "30%")};
  height: 1.8rem;
  border-radius: 8px;

  margin-bottom: ${props => (props.modalSelect ? "1rem" : null)};
`

export const Select = styled.select`
  position: relative;
  width: 100%;
  height: 1.8rem;
  // Gets rid of the arrows
  -webkit-appearance: none;
  border: 0;
  border-radius: 0;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  border-radius: 8px;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 25%);
`

export const LabelTextSpan = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 30px;
  font-size: 1rem;
  font-weight: bold;
  color: #1d470c;
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 8px;
  background: #fff;

  span {
    position: absolute;
    z-index: 30;
    left: 0.6rem;
    font-size: 0.9rem;
    width: 1rem;
    height: 1.7rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
    span {
      font-size: 0.7rem;
    }
  }

  @media screen and (min-width: 500px) and (max-width: 780px) {
    font-size: 0.9rem;
    span {
      font-size: 0.8rem;
    }
  }
`
