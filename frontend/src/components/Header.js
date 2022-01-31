import { NavLink } from "react-router-dom";

const Header = () => {
  return(
    <div className="header">
      <div className="header-title">
        <h2>Monthly Grocery</h2>
      </div>
      <div className="ui inverted segment">
        <div className="ui inverted secondary menu">
          <NavLink to="/" className={({isActive}) => "item" + (isActive ? " active" : "")}>Home</NavLink>
          <NavLink to="/newgrocery" className={({isActive}) => "item" + (isActive ? " active" : "")}>Add Grocery</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
