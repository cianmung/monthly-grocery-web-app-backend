import SafeWord from "../files/asking_safeword.gif";
import { Input, Button, Form, Message } from "semantic-ui-react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "../api/axios";

const Login = () => {
  const isLoading = useStoreState((state) => state.isLoading);
  const isError = useStoreState((state) => state.isError);
  const setIsError = useStoreActions((actions) => actions.setIsError);
  const setIsLoggedIn = useStoreActions((actions) => actions.setIsLoggedIn);

  const { setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/login",
        JSON.stringify({ username, password })
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ username, accessToken });
      setUsername("");
      setPassword("");
      setErrMsg("");
      navigate("/selectgrocerytype", { replace: true });
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 401) {
        setErrMsg(err.response.message);
      }
    }
  };

  return (
    <div className="Login login-component-container">
      {isError && (
        <div class="ui error message">
          <div class="content">
            <div class="header">{isError}</div>
          </div>
        </div>
      )}

      {!isError && isLoading && (
        <div className="loader">
          <div className="ui active transition visible inverted dimmer">
            <div className="content">
              <div className="ui inverted text loader">Loading</div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="login-component">
          <div className="require-safe-work-container">
            <img src={SafeWord} alt="Safe Word?" />
          </div>
          <div className="safe-word-input-container">
            <h2>Login</h2>
            {errMsg && <Message color="red">{errMsg}</Message>}
            <Form onSubmit={handleLoginSubmit}>
              <Form.Field>
                <Input
                  id="username"
                  type="text"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Field>
              <Form.Field>
                <Input
                  id="password"
                  type="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Field>
              <Button
                content="Login"
                icon="arrow alternate circle right outline"
                labelPosition="right"
                primary
              />
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
