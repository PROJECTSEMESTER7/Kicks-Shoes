// import { Card, Typography, Form, Input, Row, Col } from "antd"

// const { Title, Text } = Typography

// export default function ShippingAddress() {
//   return (
//     <Card style={{  background: "#e7e7e3", marginBottom: "24px", border: "none" }}>
//       <Title level={4} style={{ marginTop: 0, marginBottom: "16px" }}>
//         Shipping Address
//       </Title>

//       <Form layout="vertical">
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item name="firstName" style={{ marginBottom: "16px" }}>
//               <Input placeholder="First Name*" size="large" style={{ borderColor: "black" }}/>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item name="lastName" style={{ marginBottom: "16px" }}>
//               <Input placeholder="Last Name*" size="large" style={{ borderColor: "black" }} />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Form.Item name="address" style={{ marginBottom: "16px" }}>
//           <Input placeholder="Find Delivery Address*" size="large" style={{ borderColor: "black" }}/>
//         </Form.Item>
//         <Text type="secondary" style={{ display: "block", marginTop: "-12px", marginBottom: "16px", fontSize: "12px" }}>
//           Start typing your street address or zip code for suggestion
//         </Text>

//         <Form.Item name="phone" style={{ marginBottom: "16px" }}>
//           <Input placeholder="Phone Number*" size="large" style={{ borderColor: "black" }}/>
//         </Form.Item>
//         <Text type="secondary" style={{ display: "block", marginTop: "-12px", marginBottom: "16px", fontSize: "12px" }}>
//           E.g. (123) 456-7890
//         </Text>
//       </Form>
//     </Card>
//   )
// }
import { Card, Typography, Form, Input, Row, Col } from "antd"
import "./ShippingAddress.css"

const { Title, Text } = Typography

export default function ShippingAddress() {
  return (
    <Card className="shipping-address-card">
      <Title level={4} className="shipping-address-title">
        Shipping Address
      </Title>

      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="firstName" className="shipping-address-item">
              <Input placeholder="First Name*" size="large" className="shipping-address-input" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="lastName" className="shipping-address-item">
              <Input placeholder="Last Name*" size="large" className="shipping-address-input" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="address" className="shipping-address-item">
          <Input placeholder="Find Delivery Address*" size="large" className="shipping-address-input" />
        </Form.Item>
        <Text type="secondary" className="shipping-address-note">
          Start typing your street address or zip code for suggestion
        </Text>

        <Form.Item name="phone" className="shipping-address-item">
          <Input placeholder="Phone Number*" size="large" className="shipping-address-input" />
        </Form.Item>
        <Text type="secondary" className="shipping-address-note">
          E.g. (123) 456-7890
        </Text>
      </Form>
    </Card>
  )
}
