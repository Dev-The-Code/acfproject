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
import RegistrationFormEducation from "./RegistrationFormEducation";
import RegistrationFormSkills from "./RegistrationFormSkills";
import RegistrationFormPet from "./RegistrationFormPet";

// const formItemLayout = {
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 24 }
//   }
// };

// const sportsOptions = [
//   { value: "Cricket", label: "Cricket" },
//   { value: "Football", label: "Football" },
//   { value: "Track & Field", label: "Track & Field" }
// ];
// const FormItem = Form.Item;
// const InputGroup = Input.Group;
// const Option = Select.Option;
// const RadioGroup = Radio.Group;
// const CheckboxGroup = Checkbox.Group;

// const loadingStyles = {
//   opacity: "0.6",
//   pointerEvents: "none"
// };

class EducationRegistration extends PureComponent {
  constructor(props) {
    super(props);
    this.uploadForm = this.uploadForm.bind(this);
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
        

        if (this.props.content.selected === "education-for-kids") {
          addEducationRegestration(
            values,
            this.props.content.familyId,
            this.props.content.selected
          );
        } else if (this.props.content.selected === "skill-for-member") {
          addSkillRegestration(
            values,
            this.props.content.familyId,
            this.props.content.selected
          );
        } else if (this.props.content.selected === "pet-for-family") {
          addPetRegestration(
            values,
            this.props.content.familyId,
            this.props.content.selected
          );
        }

        message.destroy();
        message["success"]("Values Submitted");

        this.resetForm();
        this.props.handleCancel("REG_SUBMIT");
      }else {
        message["error"]("Please enter valid inputs");
        this.props.invalidFields();
      }
    });
  }

  componentRef(ref) {
    this.formRef = ref;
  }

  render() {
    let Form = null;

    if (this.props.content.selected === "education-for-kids") {
      Form = RegistrationFormEducation;
    } else if (this.props.content.selected === "skill-for-member") {
      Form = RegistrationFormSkills;
    } else if (this.props.content.selected === "pet-for-family") {
      Form = RegistrationFormPet;
    }

    return (
      <Form
        loading={this.props.loading}
        wrappedComponentRef={this.componentRef}
      />
    );
  }
}

export default Form.create()(EducationRegistration);

async function addEducationRegestration(values, familyId, selected) {
  values.startingDate = values.startingDate
    ? values.startingDate.format("YYYY-MM-DD")
    : "";
  values.DOB = values.DOB ? values.DOB.format("YYYY-MM-DD") : "";

  const response = await firestore
    .collection("families")
    .doc(familyId)
    .collection(selected)
    .add(values);

  return "done";
}

async function addSkillRegestration(values, familyId, selected) {
  values.startingDate = values.startingDate
    ? values.startingDate.format("YYYY-MM-DD")
    : "";
  values.DOB = values.DOB ? values.DOB.format("YYYY-MM-DD") : "";

  const response = await firestore
    .collection("families")
    .doc(familyId)
    .collection(selected)
    .add(values);

  return "done";
}

async function addPetRegestration(values, familyId, selected) {
  values.issuedOn = values.issuedOn ? values.issuedOn.format("YYYY-MM-DD") : "";
  values.vaccinatedDate = values.vaccinatedDate
    ? values.vaccinatedDate.format("YYYY-MM-DD")
    : "";
  values.neuteredSpayedDate = values.neuteredSpayedDate
    ? values.neuteredSpayedDate.format("YYYY-MM-DD")
    : "";

  values.medicalConditions = values.medicalConditions
    ? values.medicalConditions.split(" ")
    : [];
  const response = await firestore
    .collection("families")
    .doc(familyId)
    .collection(selected)
    .add(values);

  return "done";
}
