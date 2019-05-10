import React, { PureComponent } from "react";
import { firestore } from "../firebase";
import {
  Form,
  Input,
  Button,
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
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const loadingStyles = {
  opacity: "0.6",
  pointerEvents: "none"
};

class SkillsRegistration extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form
        style={this.props.loading ? { ...loadingStyles } : {}}
        layout="vertical"
      >
        <FormItem
          label="Pet Name"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("petName", {
            rules: [{
              required: true, message: 'Please enter the pet name',
            }],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="Age"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("age", {
            rules: [{
              required: true, message: 'Please enter pet\'s age',
            }],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="Gender"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("gender", {
            rules: [{
              required: true, message: 'Please enter pet\'s gender',
            }],
          })(
            <RadioGroup>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          label="Issued On"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("issuedOn", {
            rules: [{
              required: true, message: 'Please select the issue date',
            }],
          })(<DatePicker />)}
        </FormItem>

        <FormItem
          extra="Leave blank if not applicable"
          label="Neutered/Spayed Date"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("neuteredSpayedDate")(<DatePicker />)}
        </FormItem>

        <FormItem
          extra="Leave blank if not applicable"
          label="Vaccinated Date"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("vaccinatedDate")(<DatePicker />)}
        </FormItem>

        <FormItem
          extra="Enter conditions seperated by space, leave blank if none."
          label="Medical Conditions"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("medicalConditions")(<Input />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(SkillsRegistration);
