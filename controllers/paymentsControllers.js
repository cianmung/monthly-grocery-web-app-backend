const Payments = require("../models/Payments");

const getAllPayments = async (req, res) => {
  const payments = await Payments.find();
  if (!payments) return res.status(204).json({ messsage: "No Payment found." });
  res.json(payments);
};

const createNewPayment = async (req, res) => {
  const name = req.body.name;
  const amount = req.body.amount;
  const date = Date(req.body.date);
  const groceryItems = req.body.groceryItems;
  const groceryType = req.body.groceryType;
  if (!name || !amount || !date)
    return res
      .status(400)
      .json({ message: "Please provide the name, amount and date." });

  const newPaymentDetail = new Payments({
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
};

const getPaymentByName = async (req, res) => {
  const name = req.params.name;
  if (!name) return res.status(400).json({ message: "Payment name required!" });
  Payments.find({ name: name })
    .then((eachPayments) => res.json(eachPayments))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updatePayment = async (req, res) => {
  console.log(req.body._id);
  if (!req.params.id)
    return res.status(400).json({ message: "Payment ID is required." });

  Payments.findById(req.params.id)
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
};

const deletePayment = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Payment ID is required." });

  Payments.findByIdAndDelete(req.params.id)
    .then(() => res.json("Payment Deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  getAllPayments,
  createNewPayment,
  updatePayment,
  deletePayment,
  getPaymentByName,
};
