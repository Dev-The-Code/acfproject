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

const sportsOptions = [
  { value: "Cricket", label: "Cricket" },
  { value: "Football", label: "Football" },
  { value: "Track & Field", label: "Track & Field" }
];

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

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
          

          label="First Name"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("firstName", {
            rules: [{
              required: true, message: 'Please input first name',
            }],
          })(<Input />)}
        </FormItem>
        <FormItem
          
          label="Last Name"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("lastName", {
            rules: [{
              required: true, message: 'Please input last name',
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
              required: true, message: 'Please select gender',
            }],
          })(
            <RadioGroup>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          
          label="Date Of Birth"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("DOB")(<DatePicker />)}
        </FormItem>
        <FormItem
          
          label="First Time In School?"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("firstTime", {
            rules: [{
              required: true, message: 'Please select a value',
            }],
          })(
            <RadioGroup>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          
          label="Starting Date"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("startingDate")(<DatePicker />)}
        </FormItem>
        <FormItem
          
          label="Admission Grade"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("addmissionGrade", {
            rules: [{
              required: true, message: 'Please select admission grade',
            }],
          })(
            <RadioGroup>
              <Radio value="1st">1st</Radio>
              <Radio value="2nd">2nd</Radio>
              <Radio value="3rd">3rd</Radio>
              <Radio value="4th">4th</Radio>
              <Radio value="5th">5th</Radio>
              <Radio value="6th">6th</Radio>
              <Radio value="7th">7th</Radio>
              <Radio value="8th">8th</Radio>
              <Radio value="9th">9th</Radio>
              <Radio value="10th">10th</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
           label="Sports">
          {getFieldDecorator("sports")(
            <CheckboxGroup options={sportsOptions} />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(EducationRegistration);
