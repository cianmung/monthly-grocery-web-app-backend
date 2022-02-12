import { createStore, action, computed, thunk } from "easy-peasy";
import api from '../api/payments';
import CMAvatar from "../files/ironman.png";
import LuluAvatar from "../files/wonder.png";
import HapAvatar from "../files/batman.png";
import moment from "moment";

export default createStore({
    isLoading: false,
    setIsLoading: action((state, payload) => {
        state.isLoading = payload;
    }),
    currentDate: new Date(),
    currentMonth: computed((state) => {
        return state.currentDate.toLocaleString('en-us', {month: 'long'});
    }),
    currentYear: computed((state) => {
        return state.currentDate.getFullYear();
    }),
    isError: '',
    setIsError: action((state, payload) => {
        state.isError = payload;
    }),
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

        state.filteredPaymentDetails.forEach((each) => {
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
        return (name) => state.paymentDetails.filter(each => each.name === name && moment(new Date(each.date)).format("MMMM") === state.selectedMonth && moment(new Date(each.date)).format("YYYY").toString() === state.selectedYear.toString());
    }),
    /*getEachPaymentDetailsByName: [],
    setGetEachPaymentDetailsByName: action((state, payload) => {
        state.getEachPaymentDetailsByName = payload;
    }),*/
    newAmount: '',
    setNewAmount: action((state, payload) => {
        state.newAmount = payload;
    }),
    newGroceries: '',
    setNewGroceries: action((state, payload) => {
        state.newGroceries = payload;
    }),
    paymentMadeBy: 'Cian',
    setPaymentMadeBy: action((state, payload) => {
        state.paymentMadeBy = payload;
    }),
    addNewPayment: thunk((actions, newPayment, helpers) => {
        const { paymentDetails } = helpers.getState();
        actions.setIsLoading(true);
        return api.post('/paymentdetails', newPayment)
            .then(() => {
                actions.setPaymentDetails([...paymentDetails, newPayment]);
                actions.setNewAmount('');
                actions.setNewGroceries('');
                actions.setNewGroceryDate('');
                actions.setIsLoading(false);
            })
            .catch((err) => actions.setIsError(err.message))
    }),
    newGroceryDate: '',
    setNewGroceryDate: action((state, payload) => {
        state.newGroceryDate = payload
    }),
    getEachPaymentById: computed((state) => {
        return (id) => state.paymentDetails.find(each => each._id.toString() === id.toString());        
    }),
    editAmount: '',
    setEditAmount: action((state, payload) => {
        state.editAmount = payload;
    }),
    editDate: '',
    setEditDate: action((state, payload) => {
        state.editDate = payload;
    }),
    editGroceries: '',
    setEditGroceries: action((state, payload) => {
        state.editGroceries = payload;
    }),
    editPaymentMadeBy: '',
    setEditPaymentMadeBy: action((state, payload) => {
        state.editPaymentMadeBy = payload;
    }),
    updatePaymentDetail: thunk((actions, updatePayment, helpers) => {
        const { paymentDetails } = helpers.getState();
        const { _id } = updatePayment;
        actions.setIsLoading(true);

        return api.put(`/paymentdetails/${_id}`, updatePayment)
            .then(() => {
                actions.setPaymentDetails(paymentDetails.map(each => each._id === _id.toString() ? {...updatePayment} : each));
                actions.setEditAmount('');
                actions.setEditGroceries('');
                actions.setEditPaymentMadeBy('');
                actions.setEditDate('');
                actions.setIsLoading(false);
            })
            .catch((err) => actions.setIsError(err.message));

    }),
    deletePaymentDetail: thunk((actions, id, helpers) => {
        const { paymentDetails } = helpers.getState();
        actions.setIsLoading(true);
        return api.delete(`/paymentdetails/${id}`)
            .then(() => {
                actions.setPaymentDetails(paymentDetails.filter(each => each._id !== id));
                actions.setIsLoading(false);
            })
            .catch((err) => actions.setIsError(err.message));
    }),
    confirmDeletePopUp: false,
    setConfirmDeletePopUp: action((state, payload) => {
        state.confirmDeletePopUp = payload;
    }),
    payeeOptions: [
        {
            key: 1,
            text: "Cian",
            value: "Cian",
            image: { avatar: true, src: CMAvatar }
          },
          {
            key: 2,
            text: "Lulu",
            value: "Lulu",
            image: { avatar: true, src: LuluAvatar }
          },
          {
            key: 3,
            text: "Hap",
            value: "Hap",
            image: { avatar: true, src: HapAvatar}
          }
    ],
    filterMonths: [],
    setFilterMonths: action((state, payload) => {
        state.filterMonths = payload
    }),
    filterYears: [],
    setFilterYears: action((state, payload) => {
        state.filterYears = payload
    }),
    selectedMonth: moment(new Date()).format("MMMM"),
    setSelectedMonth: action((state, payload) => {
        state.selectedMonth = payload
    }),
    selectedYear: moment(new Date()).format("YYYY"),
    setSelectedYear: action((state, payload) => {
        state.selectedYear = payload
    }),
    filteredPaymentDetails: [],
    setFilteredPaymentDetails: action((state, payload) => {
        state.filteredPaymentDetails = payload
    })
})