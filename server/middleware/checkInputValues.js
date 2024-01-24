const checkInputValues = (req, res, next) => {
  try {
    let title = req.body.title;
    let completed = req.body.completed;

    if(!title && !completed){
      throw new Error("Cannot be empty fields");
    } else {
      next();
    }

  } catch (error){
    next(error)
  }
}
module.exports = checkInputValues;
