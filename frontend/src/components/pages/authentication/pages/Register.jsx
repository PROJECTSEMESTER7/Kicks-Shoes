import React from "react";
import { Form, Input, Checkbox } from "antd";
import SocialButton from "../components/SocialButton";
import RegisterButton from "../components/RegisterButton";
import RememberCheckbox from "../components/RememberCheckbox";
import TermCheckbox from "../components/TermCheckbox";
import JoinClub from"../components/JoinClub";
import GenderRadio from"../components/GenderRadio";
import "../../../../styles/Authenticate.css";

const RegisterPage = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box" style={{color: "black"}}>
          <h2 style={{fontWeight: "bold"}}>Register</h2>
          <p style={{fontWeight: "bold"}}> Sign up with</p>
          <SocialButton />
          <p style={{fontWeight: "bold"}}>OR</p>

          <Form layout="vertical">
            <Form.Item label={<strong>Your Name</strong>}>
              <Input className="input" placeholder="First Name" />
            </Form.Item>

            <Form.Item>
              <Input className="input" placeholder="Last Name" />
            </Form.Item>

            <Form.Item label={<strong>Gender</strong>}>
              <GenderRadio/>
            </Form.Item>

            <Form.Item label={<strong>Login Details</strong>}></Form.Item>
            <Form.Item>
              <Input className="input" placeholder="Email" type="email" />
            </Form.Item>

            <Form.Item>
              <Input.Password className="input" placeholder="Password" type="password" />
              <p style={{ fontSize: "0.75rem", color: "#555" }}>
                Minimum 8 characters with at least one uppercase, one lowercase,
                one special character and a number
              </p>
            </Form.Item>

            <TermCheckbox />
            <RememberCheckbox />
            <RegisterButton />
          </Form>
        </div>

        <JoinClub />
      </div>
    </div>
  );
};

export default RegisterPage;
