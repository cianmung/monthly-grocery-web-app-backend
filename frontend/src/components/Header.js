import { Link } from "react-router-dom";

const Header = () => {
  return(
    <div className="header">
      <div className="header-title">
        <h2>Monthly Grocery</h2>
      </div>
      <div className="ui inverted segment">
        <div className="ui inverted secondary menu">
          <Link to="/" className="active item"> Home</Link>
          <Link to="/newgrocery" className="item"> New Grocery </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
