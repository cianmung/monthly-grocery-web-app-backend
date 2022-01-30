import Avatar from "../files/dummyavatar.png";
import { Table } from 'semantic-ui-react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const PaymentDetails = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const paymentDetails = useStoreState((state) => state.paymentDetails);
    const eachPersonRecord = useStoreState((state) => state.eachPersonRecord);
    const setEachPersonRecord = useStoreActions((actions) => actions.setEachPersonRecord);
    const paymentDetailDisplayName = useStoreState((state) => state.paymentDetailDisplayName);
    const setPaymentDetailDisplayName = useStoreActions((actions) => actions.setPaymentDetailDisplayName);
    const getEachPaymentDetailsByName = useStoreState((state) => state.getEachPaymentDetailsByName);
    const filterEachRecord = getEachPaymentDetailsByName(name);
    const deletePaymentDetail = useStoreActions((actions) => actions.deletePaymentDetail);

    
    useEffect(() => {
        setEachPersonRecord(filterEachRecord);
        setPaymentDetailDisplayName(name);
    },[paymentDetails, setEachPersonRecord, setPaymentDetailDisplayName])

    const handleDelete = (id) => {
        deletePaymentDetail(id);
        navigate('/');
    }
    
  return (
      <div className="PaymentDetails">
          <div className="payment-details-container">
            <h3>Payment Details</h3>
            <div className="payment-detail-image">
                <img src={Avatar} alt="avatar"/>
            </div>
            <div className="payment-detail-body">
                <h4>{paymentDetailDisplayName}</h4>
            </div>
            <Table celled className="payment-detail-body-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Grocery Items</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header> 
                {eachPersonRecord.map(each => (
                    <Table.Body key={each._id}>
                            <Table.Row>
                            <Table.Cell>{each.groceryItems}</Table.Cell>
                            <Table.Cell>${each.amount}</Table.Cell>     
                            <Table.Cell style={{display: "flex", justifyContent: "center", color: "#2185d0"}}>
                                <Link to={`/editpaymentdetail/${each._id}`}>
                                    <i 
                                        aria-hidden="true" 
                                        className="edit icon"
                                    />
                                </Link>
                                <i 
                                    aria-hidden="true"
                                    className="trash alternate icon"
                                    onClick={() => handleDelete(each._id)}
                                    style={{ cursor:"pointer", color: "red"}}
                                />
                            </Table.Cell>                            
                            </Table.Row>
                    </Table.Body>
                ))}              
            </Table>
            <div className="payment-detail-button">
                <Link to="/">
                    <button className="ui primary button">Home</button>
                </Link>
            </div> 
          </div>          
      </div>
  );
};

export default PaymentDetails;
