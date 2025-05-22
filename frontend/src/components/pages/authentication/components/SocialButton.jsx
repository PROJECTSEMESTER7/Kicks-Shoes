import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined, AppleOutlined, FacebookOutlined } from '@ant-design/icons';

const SocialButtons = () => {
  return (
    <div className="social-buttons">
      <Button icon={<GoogleOutlined />} className="social google" block />
      <Button icon={<AppleOutlined />} className="social apple" block />
      <Button icon={<FacebookOutlined />} className="social facebook" block />
    </div>
  );
};

export default SocialButtons;
