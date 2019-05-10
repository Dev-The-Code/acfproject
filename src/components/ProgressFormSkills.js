import React, { PureComponent } from "react";
import { firestore } from "../firebase";
import {
  Form,
  Input,
  Button,
  Slider,
  message,
  Card,
  Select,
  Upload,
  DatePicker,
  Icon,
  Radio,
  Checkbox
} from "antd";

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 }
  }
};

const FormItem = Form.Item;

const loadingStyles = {
  opacity: "0.6",
  pointerEvents: "none"
};

class EducationRegistration extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form
        style={this.props.loading ? { ...loadingStyles } : {}}
        layout="vertical"
      >
        <FormItem
          label="Progress For Skill"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("progress", { initialValue: 0 })(<Slider />)}
        </FormItem>
        
      </Form>
    );
  }
}

export default Form.create()(EducationRegistration);
