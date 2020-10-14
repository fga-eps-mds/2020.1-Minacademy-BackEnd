module.exports =  function permit(...userTypes) {
  return (req, res, next) => {
    const { user } = req

    if (user && userTypes.includes(user.userType)) {
      next();
    } else {
      res.status(403).send({ message: "Forbidden" });
    }
  }
}