import EachPersonPayment from "./EachPersonPayment";
import { useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";

const Home = () => {
  const paymentOverall = useStoreState((state) => state.getPaymentOverall);
  return(
    <div className="Home">
      {paymentOverall.map(each => (
        <div key = {each.name} className="summary-for-each-person-container">
          <EachPersonPayment each = {each}/>
        </div>
      ))}
      <div className="calculate-button-container">
        <Link to="/calculatepayments">
          <button className="ui positive button">Calculate</button> 
        </Link>
      </div>      
    </div>
  );
};

export default Home;
