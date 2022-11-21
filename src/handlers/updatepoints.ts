import {json} from "stream/consumers";
import prisma from "../db";

// create add updatepoints
export const createUpdatePoints = async (req, res) => {
  // const {productId, ...rest} = req.body;
  const update = await prisma.update.findUnique({
    where: {
      id: req.body.updateId,
    },
  });
  if (!update) {
    return res.json({message: "nope"});
  }

  const updatePoint = await prisma.updatePoint.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      update: {connect: {id: update.id}},
    },
  });
  res.json({data: updatePoint});
};
