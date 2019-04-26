const handleLabelAnimation = (e, cb, toggleBoolean) => {
  if (e.target.value === "") {
    cb(!toggleBoolean)
  }
}

export default handleLabelAnimation
