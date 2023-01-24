const router = require("express").Router();
const paymentsController = require("../../controllers/paymentsControllers");

router
  .route("/")
  .get(paymentsController.getAllPayments)
  .post(paymentsController.createNewPayment);

router
  .route("/:id")
  .put(paymentsController.updatePayment)
  .delete(paymentsController.deletePayment);

router.route("/:name").get(paymentsController.getPaymentByName);
module.exports = router;
