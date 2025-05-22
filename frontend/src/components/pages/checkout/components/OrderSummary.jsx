// import { Card, Typography, Row, Col, Divider } from "antd"

// const { Title, Text } = Typography

// export default function OrderSummary() {
//   return (
//     <Card style={{ marginBottom: "24px" }}>
//       <Title level={4} style={{ marginTop: 0, marginBottom: "16px" }}>
//         Order Summary
//       </Title>

//       <Row justify="space-between" style={{ marginBottom: "8px" }}>
//         <Col>
//           <Text>1 ITEM</Text>
//         </Col>
//         <Col>
//           <Text strong>$130.00</Text>
//         </Col>
//       </Row>

//       <Row justify="space-between" style={{ marginBottom: "8px" }}>
//         <Col>
//           <Text>Delivery</Text>
//         </Col>
//         <Col>
//           <Text>$6.99</Text>
//         </Col>
//       </Row>

//       <Row justify="space-between" style={{ marginBottom: "8px" }}>
//         <Col>
//           <Text>Sales Tax</Text>
//         </Col>
//         <Col>
//           <Text>-</Text>
//         </Col>
//       </Row>

//       <Divider style={{ margin: "12px 0" }} />

//       <Row justify="space-between">
//         <Col>
//           <Text strong>Total</Text>
//         </Col>
//         <Col>
//           <Text strong>$130.00</Text>
//         </Col>
//       </Row>
//     </Card>
//   )
// }
import { Card, Col, Divider, Row, Typography } from "antd"
import "./OrderSummary.css"

const { Title, Text } = Typography

export default function OrderSummary() {
  return (
    <Card className="order-summary-card">
      <Title level={4} className="order-summary-title">
        Order Summary
      </Title>

      <Row justify="space-between" className="order-summary-row">
        <Col>
          <Text>1 ITEM</Text>
        </Col>
        <Col>
          <Text strong>$130.00</Text>
        </Col>
      </Row>

      <Row justify="space-between" className="order-summary-row">
        <Col>
          <Text>Delivery</Text>
        </Col>
        <Col>
          <Text>$6.99</Text>
        </Col>
      </Row>

      <Row justify="space-between" className="order-summary-row">
        <Col>
          <Text>Sales Tax</Text>
        </Col>
        <Col>
          <Text>-</Text>
        </Col>
      </Row>

      <Divider className="order-summary-divider" />

      <Row justify="space-between">
        <Col>
          <Text strong>Total</Text>
        </Col>
        <Col>
          <Text strong>$130.00</Text>
        </Col>
      </Row>
    </Card>
  )
}
