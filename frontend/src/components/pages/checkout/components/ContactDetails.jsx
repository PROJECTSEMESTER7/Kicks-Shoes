// import { Card, Typography, Form, Input } from "antd"

// const { Title, Text, Paragraph } = Typography

// export default function ContactDetails({ form }) {
//   return (
//     <Card style={{ background: "#e7e7e3", marginBottom: "24px", border: "none" }}>
//       <Title level={4} style={{ marginTop: 0, marginBottom: "16px" }}>
//         Contact Details
//       </Title>
//       <Paragraph style={{ marginBottom: "16px" }}>
//         We will use these details to keep you inform about your delivery.
//       </Paragraph>

//       <Form form={form} layout="vertical" >
//         <Form.Item name="email" style={{ marginBottom: "24px", borderColor: "black" }}>
//           <Input placeholder="Email" size="large" style={{ borderColor: "black" }} />
//         </Form.Item>
//       </Form>
//     </Card>
//   )
// }
import { Card, Typography, Form, Input } from "antd"
import "./ContactDetails.css"

const { Title, Paragraph } = Typography

export default function ContactDetails({ form }) {
  return (
    <Card className="contact-card">
      <Title level={4} className="contact-title">
        Contact Details
      </Title>
      <Paragraph className="contact-paragraph">
        We will use these details to keep you inform about your delivery.
      </Paragraph>

      <Form form={form} layout="vertical">
        <Form.Item name="email" className="contact-form-item">
          <Input
            placeholder="Email"
            size="large"
            className="contact-input"
          />
        </Form.Item>
      </Form>
    </Card>
  )
}
