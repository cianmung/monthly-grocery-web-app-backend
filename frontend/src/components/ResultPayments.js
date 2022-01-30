import { useStoreState } from 'easy-peasy';
import Avatar from "../files/dummyavatar.png"

const ResultPayments = () => {
    const paymentOverall = useStoreState((state) => state.getPaymentOverall);
    const totalPayment = paymentOverall.reduce((a, v) => a = a + v.amount, 0);
    const eachPayment = totalPayment/paymentOverall.length;

  return(
      <div className="ResultPayments">
          <div className="calculate-payment-container">
            <h2>Calculated Monthly Payments</h2>
            <div className="payment-summary-container">
              <div className="payment-summary-header">
                <div className="ui small blue statistic"><div className="label">Total</div><div className="value">${totalPayment.toFixed(2)}</div></div>
                <div className="ui small blue statistic"><div className="label">Each</div><div className="value">${eachPayment.toFixed(2)}</div></div>
              </div>
                <div className='payment-calculation'>
                  <div className="ui card">
                    <div className="content">
                      <h4>Calculate Payment</h4>
                    </div>
                    {paymentOverall.map(each => (
                      <div key={each.name} className='content'>
                        <div className='ui feed'>
                          <div className="event">
                            <div className="label"><img src={Avatar} /></div>
                            <div className="content">
                              <div className="summary">
                                <h5>{each.name}</h5>
                                <p className="summary-footer"><span><span style={{color: "#2185d0"}}>Paid</span> : {each.amount} SGD</span> <span><span style={{color: "#2185d0"}}>{each.amount - eachPayment > 0 ? "Receive" : "Pay"}</span> : {(each.amount - eachPayment).toFixed(2)} SGD</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}             
                  </div>   
                </div>
            </div>
          </div>
      </div>
  );
};

export default ResultPayments;
