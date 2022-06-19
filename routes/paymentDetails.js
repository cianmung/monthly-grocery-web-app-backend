const router = require("express").Router();
let PaymentDetail = require("../models/paymentDetail.model");

router.route("/").get((req, res) => {
  PaymentDetail.find()
    .then((payments) => res.json(payments))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const name = req.body.name;
  const amount = req.body.amount;
  const date = Date(req.body.date);
  const groceryItems = req.body.groceryItems;
  const groceryType = req.body.groceryType;

  const newPaymentDetail = new PaymentDetail({
    name,
    amount,
    date,
    groceryItems,
    groceryType,
  });

  newPaymentDetail
    .save()
    .then(() => res.json("Payment Added!"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:name").get((req, res) => {
  const name = req.params.name;
  PaymentDetail.find({ name: name })
    .then((eachPayments) => res.json(eachPayments))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
  PaymentDetail.findById(req.params.id)
    .then((payment) => {
      payment.name = req.body.name;
      payment.date = new Date(req.body.date);
      payment.amount = Number(req.body.amount);
      payment.groceryItems = req.body.groceryItems;

      payment
        .save()
        .then(() => res.json("Payment Updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  PaymentDetail.findByIdAndDelete(req.params.id)
    .then(() => res.json("Payment Deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
