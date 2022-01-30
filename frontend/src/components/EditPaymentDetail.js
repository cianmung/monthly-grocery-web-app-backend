import { Dropdown } from 'semantic-ui-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';

const EditPaymentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const paymentDetails = useStoreState((state) => state.paymentDetails);
    const getEachPaymentById = useStoreState((state) => state.getEachPaymentById)
    const eachPayment = getEachPaymentById(id);

    const editAmount = useStoreState((state) => state.editAmount);
    const editGroceries = useStoreState((state) => state.editGroceries);
    const editPaymentMadeBy = useStoreState((state) => state.editPaymentMadeBy);

    const setEditAmount = useStoreActions((actions) => actions.setEditAmount);
    const setEditGroceries = useStoreActions((actions) => actions.setEditGroceries);
    const setEditPaymentMadeBy = useStoreActions((actions) => actions.setEditPaymentMadeBy);
    const updatePaymentDetail = useStoreActions((actions) => actions.updatePaymentDetail);

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

      useEffect(() => {
        if(eachPayment) {
            setEditAmount(eachPayment.amount);
            setEditGroceries(eachPayment.groceryItems);
            setEditPaymentMadeBy(eachPayment.name);
        }
      },[paymentDetails, setEditAmount, setEditGroceries, setEditPaymentMadeBy])

      const handleEdit = (id) => {
        const updatedPaymentDetail = {id, name: editPaymentMadeBy, amount: editAmount, groceryItems: editGroceries};
        updatePaymentDetail(updatedPaymentDetail);
        navigate(`/paymentdetail/${editPaymentMadeBy}`);
      }
  return(
      <div className='EditPaymentDetail'>
        {editAmount &&
        <>
          <div className="add-new-grocery-container">
            <div className="add-new-grocery">
              <h3>Edit Payment Detail</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="new-grocery-amount-container ui labeled input">
                  <div className="ui basic label">$</div>
                  <input 
                      id="newAmount"
                      type="text"
                      pattern="[0-9]*"
                      placeholder="Amount"
                      required
                      value={parseFloat(editAmount)}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                </div>
                <div className="ui form">
                  <textarea 
                    placeholder="What did you buy?" 
                    rows="5"
                    value={editGroceries}
                    onChange={(e) => setEditGroceries(e.target.value)}
                  />   
                </div>                           
                <div className="payment-made-by">
                  <span>
                    Payment made by: {' '}
                    <Dropdown 
                      inline
                      options={options}
                      defaultValue={eachPayment.name}
                      onChange={(e) => setEditPaymentMadeBy(e.target.innerText)}
                    />
                  </span>
                </div>
                <button className="ui fluid primary button" type="button" onClick={() => handleEdit(eachPayment._id)}>Update</button>
              </form>
            </div>
          </div>
          </>
        }
        {!editAmount && 
          <div className="EditPaymentDetails">
            <>
              <h2>Post Not Found</h2>
              <p>Well, that's disappointing.</p>
              <p>
                 <Link to='/'>Visit Our Homepage</Link>
              </p>
            </>
          </div>
        }
      </div>
  );
};

export default EditPaymentDetail;
