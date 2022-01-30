import { Dropdown } from "semantic-ui-react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";

const AddNewGrocery = () => {
  const paymentDetails = useStoreState((state) => state.paymentDetails);

  const newAmount = useStoreState((state) => state.newAmount);
  const newGroceries = useStoreState((state) => state.newGroceries);
  const paymentMadeBy = useStoreState((state) => state.paymentMadeBy);

  const setNewAmount = useStoreActions((actions) => actions.setNewAmount);
  const setNewGroceries = useStoreActions((actions) => actions.setNewGroceries);
  const setPaymentMadeBy = useStoreActions((actions) => actions.setPaymentMadeBy);

  const addNewPayment = useStoreActions((actions) => actions.addNewPayment);

  const navigate = useNavigate();

  const options = [
    {
      key: 1,
      text: "Tony",
      value: "Tony",
      image: { avatar: true, src: "/static/media/dummyavatar.ff7f29ae1356a6400c22.png" }
    },
    {
      key: 2,
      text: "Steve",
      value: "Steve",
      image: { avatar: true, src: "/static/media/dummyavatar.ff7f29ae1356a6400c22.png" }
    },
    {
      key: 3,
      text: "Maya",
      value: "Maya",
      image: { avatar: true, src: "/static/media/dummyavatar.ff7f29ae1356a6400c22.png" }
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    //const id = paymentDetails.length ? paymentDetails[paymentDetails.length - 1].id + 1 : 1;
    const newPayment = {name: paymentMadeBy, amount: newAmount, groceryItems: newGroceries};
    addNewPayment(newPayment);
    navigate('/');
  }
  return (
      <div className="NewGrocery">
          <div className="add-new-grocery-container">
            <div className="add-new-grocery">
              <h3>Add New Grocery</h3>
              <form onSubmit={handleSubmit}>
                <div className="new-grocery-amount-container ui labeled input">
                  <div className="ui basic label">$</div>
                  <input 
                      id="newAmount"
                      type="text"
                      pattern="[0-9]*"
                      placeholder="Amount"
                      required
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                    />
                </div>
                <div className="ui form">
                  <textarea 
                    placeholder="What did you buy?" 
                    rows="5"
                    value={newGroceries}
                    onChange={(e) => setNewGroceries(e.target.value)}
                  />   
                </div>                           
                <div className="payment-made-by">
                  <span>
                    Payment made by: {' '}
                    <Dropdown 
                      inline
                      options={options}
                      defaultValue={options[0].value}
                      onChange={(e) => setPaymentMadeBy(e.target.innerText)}
                    />
                  </span>
                </div>
                <button className="ui fluid primary button">Add</button>
              </form>
            </div>
          </div>
      </div>
  );
};

export default AddNewGrocery;
