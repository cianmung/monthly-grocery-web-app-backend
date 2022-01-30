const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentDetailSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    amount: {
        type: Number,
        required: true
    },
    groceryItems: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const PaymentDetail = mongoose.model('PaymentDetail', paymentDetailSchema);

module.exports = PaymentDetail;