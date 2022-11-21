import prisma from "../db";
import {comparePassword, createJWT, hashPassword} from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  // const userexist = await prisma.user.findUnique({
  //   where: {
  //     username: req.body.username,
  //   },
  // });
  // if (userexist) {
  //   res.json(400);
  //   throw new Error("user already exist");
  // }
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });
    const token = createJWT(user);
    res.json({token});
  } catch (e) {
    e.type = "regis";
    next(e);
  }
};

export const signin = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    // if (!user) {
    //   res.status(401);
    //   throw new Error("User not found");
    //   return;
    // }

    // const isValid = await comparePassword(req.body.password, user.password);

    // if (!isValid) {
    //   res.status(401);
    //   res.json({message: "Invalid username or password"});
    //   return;
    // }
    if (user && (await comparePassword(req.body.password, user.password))) {
      const token = createJWT(user);
      res.json({token});
    } else {
      res.status(401);
      res.json({message: "invalid credentials"});
      return;
    }
  } catch (e) {
    res.status(500);
  }
};
