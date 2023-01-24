import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";
import { Card, Icon, Button } from "semantic-ui-react";
import IronMan from "../files/ironman.png";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Profile = () => {
  const { auth } = useAuth();
  const userInfo = jwt_decode(auth.accessToken)?.UserInfo;
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogoutSubmit = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <>
      <div className="Profile">
        <div className="profile-component-container">
          <Card
            image={IronMan}
            header={`Username: ${userInfo?.username}`}
            extra={
              <p>
                <Icon name="mail" />
                {userInfo?.email}
              </p>
            }
          />
          <Button color="red" onClick={() => handleLogoutSubmit()}>
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
};

export default Profile;
