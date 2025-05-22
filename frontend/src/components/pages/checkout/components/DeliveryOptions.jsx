// import { Card, Typography, Radio, Space, Row, Col, Form, Checkbox, Button } from "antd"

// const { Title } = Typography

// export default function DeliveryOptions({ deliveryMethod, setDeliveryMethod }) {
//   return (
//     <Card style={{ background: "#e7e7e3", marginBottom: "24px", border: "none" }}>
//       <Title level={4} style={{ marginTop: 0, marginBottom: "16px" }}>
//         Delivery Options
//       </Title>

//       <Radio.Group value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)} style={{ width: "100%" }}>
//         <Space direction="vertical" style={{ width: "100%" }}>
//           <Card
//             style={{
//               marginBottom: "16px",
//               borderColor: deliveryMethod === "standard" ? "#1890ff" : "#d9d9d9",
//             }}
//           >
//             <Radio value="standard" style={{ width: "100%" }}>
//               <Row justify="space-between" align="middle" style={{ width: "100%" }}>
//                 <Col>
//                   <div>
//                     <Typography.Text strong>Standard Delivery</Typography.Text>
//                   </div>
//                   <div>
//                     <Typography.Text type="secondary">
//                       Enter your address to see when you'll get your order
//                     </Typography.Text>
//                   </div>
//                 </Col>
//                 <Col>
//                   <Typography.Text strong>$6.99</Typography.Text>
//                 </Col>
//               </Row>
//             </Radio>
//           </Card>

//           <Card
//             style={{
//               marginBottom: "16px",
//               borderColor: deliveryMethod === "store" ? "#1890ff" : "#d9d9d9",
//             }}
//           >
//             <Radio value="store" style={{ width: "100%" }}>
//               <Row justify="space-between" align="middle" style={{ width: "100%" }}>
//                 <Col>
//                   <div>
//                     <Typography.Text strong>Collect in store</Typography.Text>
//                   </div>
//                   <div>
//                     <Typography.Text type="secondary">Pay now, collect in store</Typography.Text>
//                   </div>
//                 </Col>
//                 <Col>
//                   <Typography.Text strong>Free</Typography.Text>
//                 </Col>
//               </Row>
//             </Radio>
//           </Card>
//         </Space>
//       </Radio.Group>

//       <Form layout="vertical" style={{ marginTop: "16px" }}>
//         <Form.Item name="sameAddress">
//           <Checkbox>My billing and delivery information are the same</Checkbox>
//         </Form.Item>

//         <Form.Item name="ageVerification">
//           <Checkbox>I'm 13+ year old</Checkbox>
//         </Form.Item>

//         <div style={{ marginBottom: "8px" }}>
//           <Typography.Text>Also want product updates with our newsletter?</Typography.Text>
//         </div>

//         <Form.Item name="newsletter">
//           <Checkbox>Yes, I'd like to receive emails about exclusive sales and more.</Checkbox>
//         </Form.Item>
//       </Form>

//       <Button
//         type="primary"
//         size="large"
//         block
//         style={{
//           marginTop: "16px",
//           height: "48px",
//           backgroundColor: "#000",
//           borderColor: "#000",
//         }}
//       >
//         REVIEW AND PAY
//       </Button>
//     </Card>
//   )
// }
import {
  Card,
  Typography,
  Radio,
  Space,
  Row,
  Col,
  Form,
  Checkbox,
  Button,
} from "antd"
import "./DeliveryOptions.css"

const { Title, Text } = Typography

export default function DeliveryOptions({ deliveryMethod, setDeliveryMethod }) {
  return (
    <Card className="delivery-card">
      <Title level={4} className="delivery-title">
        Delivery Options
      </Title>

      <Radio.Group
        value={deliveryMethod}
        onChange={(e) => setDeliveryMethod(e.target.value)}
        className="delivery-radio-group"
      >
        <Space direction="vertical" className="delivery-radio-space">
          <Card
            className="delivery-option-card"
            style={{
              borderColor:
                deliveryMethod === "standard" ? "#1890ff" : "#d9d9d9",
            }}
          >
            <Radio value="standard" className="delivery-radio">
              <Row justify="space-between" align="middle" className="delivery-row">
                <Col>
                  <div>
                    <Text strong>Standard Delivery</Text>
                  </div>
                  <div>
                    <Text type="secondary">
                      Enter your address to see when you'll get your order
                    </Text>
                  </div>
                </Col>
                <Col>
                  <Text strong>$6.99</Text>
                </Col>
              </Row>
            </Radio>
          </Card>

          <Card
            className="delivery-option-card"
            style={{
              borderColor: deliveryMethod === "store" ? "#1890ff" : "#d9d9d9",
            }}
          >
            <Radio value="store" className="delivery-radio">
              <Row justify="space-between" align="middle" className="delivery-row">
                <Col>
                  <div>
                    <Text strong>Collect in store</Text>
                  </div>
                  <div>
                    <Text type="secondary">Pay now, collect in store</Text>
                  </div>
                </Col>
                <Col>
                  <Text strong>Free</Text>
                </Col>
              </Row>
            </Radio>
          </Card>
        </Space>
      </Radio.Group>

      <Form layout="vertical" className="delivery-form">
        <Form.Item name="sameAddress">
          <Checkbox>My billing and delivery information are the same</Checkbox>
        </Form.Item>

        <Form.Item name="ageVerification">
          <Checkbox>I'm 13+ year old</Checkbox>
        </Form.Item>

        <div className="delivery-updates-text">
          <Text>Also want product updates with our newsletter?</Text>
        </div>

        <Form.Item name="newsletter">
          <Checkbox>
            Yes, I'd like to receive emails about exclusive sales and more.
          </Checkbox>
        </Form.Item>
      </Form>

      <Button type="primary" size="large" block className="review-button">
        REVIEW AND PAY
      </Button>
    </Card>
  )
}
