import React, { useState } from "react";
import { Form, Input, Typography, Divider, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./Authenticate.css";
import LoginHeader from "../components/LoginHeader";
import RememberCheckbox from "../components/RememberCheckbox";
import EmailLoginButton from "../components/EmailLoginButton";
import SocialButton from "../components/SocialButton";
import JoinClub from "../components/JoinClub";
import Term from "../components/Term";
import { useAuth } from "../../../../contexts/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await login(values);
      message.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      // Handle specific error cases
      const errorMessage = error.response?.data?.message;

      if (errorMessage === "Please verify your email before logging in") {
        message.error({
          content: (
            <div>
              <p>Please verify your email before logging in.</p>
              <p>Check your email for verification link or</p>
              <a href="/resend-verification">
                Click here to resend verification email
              </a>
            </div>
          ),
          duration: 5,
        });
      } else if (errorMessage === "Invalid credentials") {
        message.error({
          content: (
            <div>
              <p>Invalid email or password.</p>
              <p>Please check your credentials and try again.</p>
              <a href="/forgot-password">Forgot your password?</a>
            </div>
          ),
          duration: 5,
        });
      } else {
        message.error(
          errorMessage || "An error occurred during login. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <div className="login-box">
            <LoginHeader />

            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              validateTrigger="onBlur"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  type="email"
                  size="large"
                  placeholder="Email"
                  className="input"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Password"
                  className="input"
                />
              </Form.Item>

              <RememberCheckbox />
              <EmailLoginButton loading={loading} />

              <Divider style={{ margin: "0px" }}>Or log in with</Divider>

              <SocialButton />
              <Term />
            </Form>
          </div>

          <JoinClub />
        </div>
      </div>
    </>
  );
};

export default Login;
