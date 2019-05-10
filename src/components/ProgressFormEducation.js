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
          label="Maths"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("maths", { initialValue: 0 })(<Slider />)}
        </FormItem>
        <FormItem
          label="Urdu"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("urdu", { initialValue: 0 })(<Slider />)}
        </FormItem>
        <FormItem
          label="English"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("english", { initialValue: 0 })(<Slider />)}
        </FormItem>
        <FormItem
          label="Sports"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("sports", { initialValue: 0 })(<Slider />)}
        </FormItem>
        <FormItem
          label="Art"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("art", { initialValue: 0 })(<Slider />)}
        </FormItem>
        <FormItem
          label="Enviroment"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("enviroment", { initialValue: 0 })(<Slider />)}
        </FormItem>
        <FormItem
          label="Science"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("science", { initialValue: 0 })(<Slider />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(EducationRegistration);
