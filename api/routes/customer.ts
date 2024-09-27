import express from "express";
import {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerByUserId
} from "../controllers/customerCtrl";

const router = express.Router();

// GET route to fetch customer by user_id
router.get('/:user_id', getCustomerByUserId);

// POST route to create a new customer
router.post("/create", createCustomer);

// PUT route to update customer by user_id
router.put("/update/:user_id", updateCustomer);

// DELETE route to delete customer by user_id
router.delete("/delete/:user_id", deleteCustomer);

export default router;