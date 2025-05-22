import React from "react";
import { Form, Input, Typography, Divider, Button } from "antd";
import { GoogleOutlined, AppleOutlined, FacebookOutlined } from "@ant-design/icons";
import "../../../../styles/Authenticate.css";
import LoginHeader from "../components/LoginHeader";
import RememberCheckbox from "../components/RememberCheckbox";
import EmailLoginButton from "../components/EmailLoginButton";
import SocialButton from "../components/SocialButton";
import Term from "../components/Term";
import TermCheckbox from "../components/TermCheckbox";
import imagesdn from "../../../../assets/images/loginadminbanner.png";

const LoginAdmin = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        {/* Club box with image + branding */}
                <div className="login-image-half">
         <img src={imagesdn} alt="Sneakers" className="login-image" />

        </div>


        {/* Login form */}
        <div className="login-box">
          <Form layout="vertical">
            <LoginHeader />
            <RememberCheckbox />
            <EmailLoginButton />
            <SocialButton />
            <Term />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
