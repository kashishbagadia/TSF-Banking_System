const express = require("express");
const User = require("../models/model");
const Transaction = require("../models/transaction");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("node api running");
});

router.get("/allUsers", async (req, res) => {
  let user;
  try {
    user = await User.find();
    res.send(user);
  } catch (e) {
    console.error(e);
    res.send("Server Error");
  }
});

router.get("/user/:acc_no", async (req, res) => {
  let user;
  try {
    user = await User.findOne({ acc_no: req.params.acc_no });
    res.send(user);
  } catch (e) {
    console.error(e);
    res.send("Server Error");
  }
});

router.get("/history", async(req,res) => {
  let history;
  try{
    history = await Transaction.find().populate('From', ['name']).populate('To', ['name']);
    res.send(history);
  } catch (e){
    console.error(e)
    res.send("Server Error")
  }
})

router.post(
  "/add",
  [
    check("name", "Name field required!").not().isEmpty(),
    check("acc_no", "Account no. field required!").not().isEmpty(),
    check("email", "Email field required!").not().isEmpty(),
    check("acc_balance", "Account balance required!").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const { name, acc_no, email, profession, acc_balance } = req.body;
    try {
      let user = await User.findOne({ acc_no });
      if (user) {
        res.json("Account already exists!");
      } else {
        user = new User({ name, acc_no, email, profession, acc_balance });
        await user.save();
        res.send("User created :)");
      }
    } catch (e) {
      console.error(e.message);
      res.send("server error!");
    }
  }
);

router.post("/transaction", [
  check("amount", "Enter amount for transfer").not().isEmpty(),
  check("From", "Enter account number").not().isEmpty(),
  check("To", "Enter account number").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const { amount, From, To } = req.body;
    try{
      let from_user = await User.findOne({ acc_no: From })
      let to_user = await User.findOne({ acc_no: To })
      if (!from_user || !to_user){
        res.send("User does not exist :( ")
      }
      else {
        if (amount > from_user.acc_balance){
          res.send("Amount exceeds the account balance")
        }
        else{
          from_user.acc_balance = from_user.acc_balance - amount
          to_user.acc_balance = to_user.acc_balance + +amount
          await from_user.save()
          await to_user.save()
          let transaction = new Transaction({ From:from_user._id, To:to_user._id, amount })
          await transaction.save()
          res.send("Transaction successful")
        }
      }
    } catch(e){
      console.error(e)
      res.send("Server Error!")
    }
  })
module.exports = router;
