import React, { PureComponent } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  message,
  Upload,
  Icon,
  Radio,
  Checkbox
} from "antd";
import _ from "lodash";
import imageCompress from "../../../../imageCompress";

import { addFamilyRecord, uploadFamilyImages } from "../../../../database-helpers";


const FormItem = Form.Item;

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const BasicNeedsOptions = [
  { label: "Water", value: "Water" },
  { label: "Electricity", value: "Electricity" },
  { label: "Gas", value: "Gas" },
  { label: "Sanitation", value: "Sanitation" }
];
const NatureOfWorkOptions = [
  { value: "Garbage Picking", label: "Garbage Picking" },
  { value: "Sewing", label: "Sewing" },
  { value: "Labor", label: "Labor" },
  { value: "Begging", label: "Begging" },
  { value: "Food", label: "Food" },
  { value: "Contractor", label: "Contractor" },
  { value: "shopkeeper", label: "Shop Keeper" },
  { value: "fruitVendor", label: "Fruit Vendor" },
  { value: "rickshawDriver", label: "Rickshaw Driver" },
  { value: "fishVendor", label: "Fish Vendor" },
  { value: "mobileShop", label: "Mobile Shop" }
];

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 24,
      offset: 0
    }
  }
};
const loadingStyles = {
  opacity: "0.6",
  pointerEvents: "none"
};

class RegistrationForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showHOFImage: true,
      HOFImage: [],
      showWholeFamilyImage: true,
      WholeFamilyImage: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    this.normFile = this.normFile.bind(this);

    this.beforeUpload = this.beforeUpload.bind(this);
    this.onRemove = this.onRemove.bind(this);

    this.prepareDataForSaving = this.prepareDataForSaving.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  async normFile(e, ref) {
    // if (Array.isArray(e)) {

    //   this.setState(state => {
    //     return {
    //       ...state,
    //       [ref]: e
    //     };
    //   });
    // }
    // returns array of files
    // return e && e.fileList;
    // before adding compress image here.

    const { file } = e;
    const { uid } = file;

    const compressedImage = await imageCompress(file);

    compressedImage.uid = uid;

    this.setState(state => {
      return {
        ...state,
        [ref]: [compressedImage]
      };
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        // update loading status
        // send data
        // when data sending finsihed
        // update status again
        // console.log(values);
        this.resetForm();

        // this.updateLoading("loading", "Submitting Values To Firebase");
        message.success("Family Added");

        const sanitizedData = this.prepareDataForSaving(values);

        let newPayload = { ...sanitizedData };

        const { images } = newPayload;

        delete newPayload.images;

        try {
          const familyRef = addFamilyRecord(newPayload);

          uploadFamilyImages(images, familyRef);

        } catch (error) {
          console.log("error", error);
        }

        // this.updateLoading(
        //   "success",
        //   "Family Added To Que, You Will Be Notified When Upload is Complete"
        // );
      }
    });
  }

  // updateLoading(status, message) {
  //   let newStyles = this.state.styles;

  //   if (status === "loading") {
  //     newStyles = {
  //       ...newStyles,
  //       ...loadingStyles
  //     };

  //     message[status](message);
  //   } else if (status === "success") {
  //     message.destroy();
  //     newStyles = _.omit(newStyles, Object.keys(loadingStyles));
  //     message[status](message);
  //   }

  //   this.setState(state => {
  //     return {
  //       ...state,
  //       loadingStatus: status,
  //       styles: newStyles
  //     };
  //   });
  // }

  resetForm() {
    this.props.form.resetFields();

    this.setState(state => ({
      showHOFImage: true,
      HOFImage: [],
      showWholeFamilyImage: true,
      WholeFamilyImage: [],


    }));
  }

  prepareDataForSaving(data) {
    const HOFImageState = this.state.HOFImage[0];
    const familyImageState = this.state.WholeFamilyImage[0];

    delete data.HOFImage;
    delete data.familyImage;

    data.images = {
      HOFImage: HOFImageState,
      familyImage: familyImageState
    };

    return data;
  }

  beforeUpload(ref) {
    this.setState(state => ({
      ...state,
      [`show${ref}`]: false
    }));
  }
  onRemove(ref) {
    this.setState(state => ({
      ...state,
      [`show${ref}`]: true,
      [ref]: null
    }));
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return <div style={this.state.styles}>
      <Card bordered={false} loading={false} bodyStyle={{ padding: "0px" }}>
        <Form onSubmit={this.handleSubmit} layout="vertical">
          <Card bordered={false} headStyle={{ padding: "0px", color: "#C40009" }} bodyStyle={{ padding: "0px", paddingTop: "16px" }} title="Head of the family's information">
            <FormItem label="First Name" extra="Enter head of family's first name" {...formItemLayout}>
              {getFieldDecorator("firstName")(<Input />)}
            </FormItem>
            <FormItem label="Last Name" extra="Enter head of family's last name" {...formItemLayout}>
              {getFieldDecorator("lastName")(<Input />)}
            </FormItem>

            <FormItem extra="Head of family's CNIC if available" label="Head Of Family's CNIC" {...formItemLayout}>
              {getFieldDecorator("cnic")(<Input />)}
            </FormItem>
            <FormItem label="Head Of Family's Contact" extra="Head of family's contact number if available" {...formItemLayout}>
              {getFieldDecorator("phone")(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} extra="Upload head of the family's photograph" label="Family Head Photograph">
              {getFieldDecorator("HOFImage", {
                getValueFromEvent: e => {
                  this.normFile(e, "HOFImage");
                }
              })(<Upload beforeUpload={() => {
                this.beforeUpload("HOFImage");
                return false;
              }} onRemove={() => {
                this.onRemove("HOFImage");
              }} capture fileList={this.state.HOFImage} accept="image/jpeg" listType="picture-card">
                {this.state.showHOFImage ? <div style={{ fontSize: "25px" }}>
                  <Icon type="upload" />
                </div> : null}
              </Upload>)}
            </FormItem>
          </Card>

          <Card bordered={false} headStyle={{ padding: "0px", color: "#C40009" }} bodyStyle={{ padding: "0px", paddingTop: "16px" }} title="Address & location of the family">
            <FormItem extra="Select the location of the family" label="Location" {...formItemLayout}>
              {getFieldDecorator("location")(<RadioGroup buttonStyle="solid">
                <Radio.Button value="Kachra Goath">
                  Kachra Goath
                    </Radio.Button>
                <Radio.Button value="Ansoo Goath">
                  Ansoo Goath
                    </Radio.Button>
                    <Radio.Button value="Memon Goath">
                  Memon Goath
                    </Radio.Button>
                    <Radio.Button value="Rehman Goath">
                  Rehman Goath
                    </Radio.Button>
                    <Radio.Button value="Soomar Goath">
                  Soomar Goath
                    </Radio.Button>
                    <Radio.Button value="Pehalwan Goath">
                  Pehalwan Goath
                    </Radio.Button>
                    <Radio.Button value="Haji Ali Goath">
                  Haji Ali Goath
                    </Radio.Button>
                
              </RadioGroup>)}
            </FormItem>
            <FormItem label="City" extra="Select city of the family">
              {getFieldDecorator("city")(<RadioGroup buttonStyle="solid">
                <Radio.Button value="Karachi">Karachi</Radio.Button>
                <Radio.Button value="Islamabad">Islamabad</Radio.Button>
                <Radio.Button value="Lahore">Lahore</Radio.Button>
              </RadioGroup>)}
            </FormItem>
            <FormItem label="Address" extra="Physical address of the family" {...formItemLayout}>
              {getFieldDecorator("address")(<Input.TextArea />)}
            </FormItem>
          </Card>
          <Card bordered={false} headStyle={{ padding: "0px", color: "#C40009" }} bodyStyle={{ padding: "0px", paddingTop: "16px" }} title="Family members information">
            <FormItem label="Female Adults" extra="Enter number of female adults in family" {...formItemLayout}>
              {getFieldDecorator("famAdultsNumFemale")(<Input />)}
            </FormItem>
            <FormItem label="Male Adults" extra="Enter number of male adults in family" {...formItemLayout}>
              {getFieldDecorator("famAdultsNumMale")(<Input />)}
            </FormItem>
            <FormItem label="Female Children" extra="Enter number of female children in family" {...formItemLayout}>
              {getFieldDecorator("famChildNumFemale")(<Input />)}
            </FormItem>
            <FormItem label="Male Children" extra="Enter number of male children in family" {...formItemLayout}>
              {getFieldDecorator("famChildNumMale")(<Input />)}
            </FormItem>
            <FormItem label="School Going Female Children" extra="Enter number of school going female children" {...formItemLayout}>
              {getFieldDecorator("schoolGoingFemaleChild")(<Input />)}
            </FormItem>
            <FormItem label="School Going Male Children" extra="Enter number of school going male children" {...formItemLayout}>
              {getFieldDecorator("schoolGoingMaleChild")(<Input />)}
            </FormItem>
            <FormItem label="Family's Income" extra="Total daily income of the family in PKR" {...formItemLayout}>
              {getFieldDecorator("houseIncome")(<Input />)}
            </FormItem>
            <FormItem label="Working Female Adults" extra="How many female adults work in the family" {...formItemLayout}>
              {getFieldDecorator("workingFemaleAdults")(<Input />)}
            </FormItem>
            <FormItem label="Working Female Children" extra="How many female children work in the family" {...formItemLayout}>
              {getFieldDecorator("workingFemaleChild")(<Input />)}
            </FormItem>
            <FormItem label="Working Male Adults" extra="How many male adults work in the family" {...formItemLayout}>
              {getFieldDecorator("workingMaleAdults")(<Input />)}
            </FormItem>
            <FormItem label="Working Male Children" extra="How many male children work in the family" {...formItemLayout}>
              {getFieldDecorator("workingMaleChildren")(<Input />)}
            </FormItem>
            <FormItem label="How Long Family Lives Here" extra="How many years has the family been here" {...formItemLayout}>
              {getFieldDecorator("yearsOfStay")(<Input />)}
            </FormItem>
            <FormItem label="Donkeys" extra="Does the family own a donkey? if yes how many" {...formItemLayout}>
              {getFieldDecorator("numOfDonkeys")(<Input />)}
            </FormItem>
            <FormItem label="Daily Rotation Cost" extra="How much does the daily rotation cost" {...formItemLayout}>
              {getFieldDecorator("dailyRotationCost")(<Input />)}
            </FormItem>
            <FormItem label="Any illnesses/handicaps in the family" extra="If any ill or handicaped, enter number" {...formItemLayout}>
              {getFieldDecorator("illMemberInFamily")(<Input />)}
            </FormItem>
            <FormItem label="Parents Alive?" extra="Are both parents alive?" {...formItemLayout}>
              {getFieldDecorator("parentsAlive")(<RadioGroup buttonStyle="solid">
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>
              </RadioGroup>)}
            </FormItem>
            <FormItem label="Nature Of Work" extra="Select the kinds of work the home members do for income">
              {getFieldDecorator("natureOfWork")(<CheckboxGroup options={NatureOfWorkOptions} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Family Photograph" extra="Upload the photograph of the whole family">
              {getFieldDecorator("familyImage", {
                getValueFromEvent: e => {
                  this.normFile(e, "WholeFamilyImage");
                }
              })(<Upload beforeUpload={() => {
                this.beforeUpload("WholeFamilyImage");
                return false;
              }} onRemove={() => {
                this.onRemove("WholeFamilyImage");
              }} capture fileList={this.state.WholeFamilyImage} accept="image/jpeg" listType="picture-card">
                {this.state.showWholeFamilyImage ? <div style={{ fontSize: "25px" }}>
                  <Icon type="upload" />
                </div> : null}
              </Upload>)}
            </FormItem>
          </Card>

          <Card bordered={false} headStyle={{ padding: "0px", color: "#C40009" }} bodyStyle={{ padding: "0px", paddingTop: "16px" }} title="Family's home information">
            <FormItem label="Home Owner?" extra="Does the family own the house?" {...formItemLayout}>
              {getFieldDecorator("house")(<RadioGroup buttonStyle="solid">
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>
              </RadioGroup>)}
            </FormItem>

            <FormItem label="Construction Type" extra="How is the construction of the house?" {...formItemLayout}>
              {getFieldDecorator("constructionType")(<RadioGroup buttonStyle="solid">
                <Radio.Button value={"constructed"}>
                  Constructed
                    </Radio.Button>
                <Radio.Button value={"kacha"}>Kachaa</Radio.Button>
              </RadioGroup>)}
            </FormItem>
            <FormItem label="Basic Needs" extra="What basic needs are available in the house?" {...formItemLayout}>
              {getFieldDecorator("houseNeeds")(<CheckboxGroup options={BasicNeedsOptions} />)}
            </FormItem>
          </Card>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Add Family
              </Button>
          </FormItem>
        </Form>
      </Card>
    </div>;
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
