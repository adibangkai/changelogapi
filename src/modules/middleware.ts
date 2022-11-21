import {validationResult} from "express-validator";

export const handleInputError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({errors: errors.array()});
  } else {
    next();
  }
};

export const errorHandler = (err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({message: "unauthorized"});
  } else if (err.type === "input") {
    res.status(400).json(err);
  } else if (err.type === "regis") {
    res.status(400).json({message: "username exist"});
  } else {
    res.status(500).json({message: "oop, theres something wrong"});
  }
};
