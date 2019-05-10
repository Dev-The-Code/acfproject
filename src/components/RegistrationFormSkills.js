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
          label="First Name"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("firstName")(<Input />)}
        </FormItem>
        <FormItem
          label="Last Name"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("lastName")(<Input />)}
        </FormItem>
        <FormItem
          label="Gender"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("gender")(
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
          label="Starting Date"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("startingDate")(<DatePicker />)}
        </FormItem>
        <FormItem
          label="Select Skill"
          style={{ marginBottom: "15px" }}
          {...formItemLayout}
        >
          {getFieldDecorator("skill")(
            <RadioGroup>
              <Radio value="sewing">Sewing</Radio>
              <Radio value="bottle-homes">Bottle Homes</Radio>
              <Radio value="donkey-cart-making">Donkey Cart Making</Radio>
              <Radio value="donkey-harness">Donkey Harness</Radio>
              <Radio value="plant-trees">Plant Trees</Radio>
              <Radio value="recyclable-hand-made-items">
                Recyclable Handmade Items
              </Radio>
            </RadioGroup>
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(SkillsRegistration);
