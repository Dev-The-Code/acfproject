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
          label="Excitability"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("excitability", { initialValue: 0 })(<Slider />)}
        </FormItem>
        <FormItem
          label="Aggression"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("aggression", { initialValue: 0 })(<Slider />)}
        </FormItem>
        <FormItem
          label="Fear and Anxiety"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("fearAnxiety", { initialValue: 0 })(<Slider />)}
        </FormItem>
        
      </Form>
    );
  }
}

export default Form.create()(EducationRegistration);
