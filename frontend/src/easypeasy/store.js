import { createStore, action, computed, thunk } from "easy-peasy";
import api from '../api/payments';

export default createStore({
    activeMenuItem: "home",
    setActiveMenuItem: action((state, payload) => {
        state.activeMenuItem = payload;
    }),
    paymentDetails: [],
    setPaymentDetails: action((state, payload) => {
        state.paymentDetails = payload;
    }),
    eachPersonRecord: [],
    setEachPersonRecord: action((state, payload) => {
        state.eachPersonRecord = payload;
    }),
    paymentDetailDisplayName: '',
    setPaymentDetailDisplayName: action((state, payload) => {
        state.paymentDetailDisplayName = payload;
    }),
    getPaymentOverall: computed((state) => {
        var holder = {};

        state.paymentDetails.forEach((each) => {
            if(holder.hasOwnProperty(each.name)){
                holder[each.name] = holder[each.name] + parseFloat(each.amount);
            }else {
                holder[each.name] = parseFloat(each.amount);
            }
        });

        var paymentOverall = [];
        for(var each in holder) {
            paymentOverall.push({name: each, amount: holder[each]});
        }

        return paymentOverall;
    }),
    getEachPaymentDetailsByName: computed((state) => {
        return (name) => state.paymentDetails.filter(each => each.name === name);
    }),
    newAmount: '',
    setNewAmount: action((state, payload) => {
        state.newAmount = payload;
    }),
    newGroceries: '',
    setNewGroceries: action((state, payload) => {
        state.newGroceries = payload;
    }),
    paymentMadeBy: 'Tony',
    setPaymentMadeBy: action((state, payload) => {
        state.paymentMadeBy = payload;
    }),
    addNewPayment: thunk(async (actions, newPayment, helpers) => {
        const { paymentDetails } = helpers.getState();
        try {
            const response = await api.post('/paymentdetails', newPayment);
            actions.setPaymentDetails([...paymentDetails, response.data]);
            actions.setNewAmount('');
            actions.setNewGroceries('');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    getEachPaymentById: computed((state) => {
        return (id) => state.paymentDetails.find(each => each._id.toString() === id.toString());        
    }),
    editAmount: '',
    setEditAmount: action((state, payload) => {
        state.editAmount = payload;
    }),
    editGroceries: '',
    setEditGroceries: action((state, payload) => {
        state.editGroceries = payload;
    }),
    editPaymentMadeBy: '',
    setEditPaymentMadeBy: action((state, payload) => {
        state.editPaymentMadeBy = payload;
    }),
    updatePaymentDetail: thunk(async (actions, updatePayment, helpers) => {
        const { paymentDetails } = helpers.getState();
        const { id } = updatePayment;
        try {
            const response = await api.put(`/paymentdetails/${id}`, updatePayment);
            console.log(paymentDetails)
            actions.setPaymentDetails(paymentDetails.map(each => each._id === id.toString() ? {...response.data} : each));
            actions.setEditAmount('');
            actions.setEditGroceries('');
            actions.setEditPaymentMadeBy('');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    deletePaymentDetail: thunk(async (actions, id, helpers) => {
        const { paymentDetails } = helpers.getState();
        try {
            await api.delete(`/paymentdetails/${id}`);
            actions.setPaymentDetails(paymentDetails.filter(each => each.id !== id));
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    })
})