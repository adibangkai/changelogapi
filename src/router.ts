import {Router} from "express";
import {body, oneOf, validationResult} from "express-validator";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdateByOne,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import {createUpdatePoints} from "./handlers/updatepoints";
import {handleInputError} from "./modules/middleware";
const router = Router();

// Product
router.get("/product", getProducts);
router.post(
  "/product",
  body("name").isString(),
  handleInputError,
  createProduct
);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputError,
  updateProduct
);
router.delete("/product/:id", deleteProduct);

// Update
router.get("/update", getUpdates);
// router.get("/update/:id", getOneUpdate);
router.get("/update/:id", getUpdateByOne);

//these middleware to long, should relocate to another module
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("version").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  handleInputError,
  updateUpdate
);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);

router.delete("/update/:id", deleteUpdate);

// UpdatePoint

router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.post(
  "/updatepoint",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputError,
  createUpdatePoints
);
router.put(
  "/updatepoint/:id",
  [
    body("name").isString(),
    body("description").isString(),
    body("updateId").exists().isString(),
  ],
  handleInputError,
  (req, res) => {}
);
router.delete("/updatepoint/:id", (req, res) => {});

router.use((err, req, res, next) => {
  console.log(err);
  res.json({message: "router error"});
});
export default router;
