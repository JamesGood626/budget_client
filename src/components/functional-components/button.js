import React from "react"
import styled from "styled-components"

// All of the props that I'm passing down won't stay this way:
// Ideally I just make a theme, and then plug in all of the values from
// there for these styles.
// That way they're all able to be updated from one location.

const Button = styled.button`
  display: inline-block;
  position: relative;
  border: none;
  padding: ${({ padding }) => padding && `${padding[0]}rem ${padding[1]}rem}`};
  margin: 10px;
  min-height: ${({ minHeight }) => minHeight && `${minHeight}rem`};
  font-size: 1rem;
  font-weight: bold;
  color: ${({ fontColor }) => (fontColor ? `${fontColor}` : `#222`)};
  text-align: center;
  cursor: pointer;
  /* The appearance property is used to display an element using */
  /* a platform-native styling based on the users' operating system's theme. */
  appearance: none;
  border-radius: ${({ radius }) => radius && `${radius}px`};
  background: ${({ topColor, bottomColor }) =>
    `linear-gradient(180deg, ${topColor} 10%, ${bottomColor} 35%)`};

  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
    padding: ${({ padding }) =>
      padding && `${padding[0] / 1.6}rem ${padding[1] / 1.6}rem}`};
  }

  @media screen and (min-width: 500px) and (max-width: 780px) {
    font-size: 0.9rem;
    padding: ${({ padding }) =>
      padding && `${padding[0] / 1.2}rem ${padding[1] / 1.4}rem}`};
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    color: #000;
    border-radius: ${({ radius }) => radius && `${radius}px`};
    box-shadow: 2px 2px 14px 0 rgba(0,0,0,50%);
  }

  &:hover {
    outline: 0px solid #fff;
    /* box-shadow: ${({ focusColor }) =>
      focusColor ? `0 0 3px ${focusColor}` : `0 0 3px 2px #72E1D1`}; */
  }

  &:focus {
    outline: 0px solid #fff;
  }

  &:active {
    transform: scale(0.99);

    &:after {
      box-shadow: 1px 1px 12px 0 rgba(0,0,0,60%);
    }
  }
`

const button = ({
  children,
  onClick,
  padding,
  minHeight,
  radius,
  topColor,
  bottomColor,
  fontColor,
}) => {
  return (
    <Button
      onClick={onClick}
      padding={padding}
      minHeight={minHeight}
      radius={radius}
      topColor={topColor}
      bottomColor={bottomColor}
      fontColor={fontColor}
    >
      {children}
    </Button>
  )
}

export default button
