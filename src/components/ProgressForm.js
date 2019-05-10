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
import ProgressFormEducation from "./ProgressFormEducation";
import ProgressFormSkills from "./ProgressFormSkills"
import ProgressFormPet from "./ProgressFormPet"
const Forms = {
  "education-for-kids": ProgressFormEducation,
  "skill-for-member": ProgressFormSkills,
  "pet-for-family" : ProgressFormPet
};
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
  constructor(props) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
    this.componentRef = this.componentRef.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading === false && this.props.loading === true) {
      this.uploadForm();
    }
  }

  resetForm() {
    this.formRef.props.form.resetFields();
  }

  async uploadForm() {
    const { validateFields } = this.formRef.props.form;

    await validateFields(async (err, values) => {
      if (!err) {
       

        values = { ...values, date: new Date() };

        firestore
          .collection("families")
          .doc(this.props.content.familyId)
          .collection(this.props.content.selected)
          .doc(this.props.content.memberId)
          .collection("progress")
          .add(values);

        message.destroy();
        message["success"]("Values Submitted");

        this.resetForm();
        this.props.handleCancel("PROG_SUBMIT");
      }
    });
  }

  componentRef(ref) {
    this.formRef = ref;
  }

  render() {

    const Form = Forms[this.props.content.selected];
    return (
      <Form
        wrappedComponentRef={this.componentRef}
        loading={this.props.loading}
      />
    );
  }
}

export default Form.create()(EducationRegistration);
