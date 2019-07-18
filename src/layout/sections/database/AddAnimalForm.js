import React, { Component } from "react";
import {
  Form, Input, Icon, Button, Upload, message, Card, Modal, Row, Col, Checkbox, Slider,
} from "antd";
import UploadButton from "../../../components/UploadButton";
import imageCompress from '../../../imageCompress';
// import AsyncStorage from '@callstack/async-storage';

const FormItem = Form.Item;
let arrf = [];
let checking = [];
class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownersImage: {
        showUpload: true,
        fileList: []
      },
      ownerAnimal: [{ showUpload: true, fileList: [] }],
      filesss: [],
      newVal: '',
      previewVisible: false,
      previewImage: '',
      preview: '',
      checkConnection: false,
      severity: [],
      values: []
    };

    this.checkIfNumber = this.checkIfNumber.bind(this);
    this.normFile = this.normFile.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.onRemoveAnimalImage = this.onRemoveAnimalImage.bind(this);
    this.beforeUploadAnimalImage = this.beforeUploadAnimalImage.bind(this);
    this.prepareDataForSaving = this.prepareDataForSaving.bind(this);
    // this.checkBoxChangeHandler = this.checkBoxChangeHandler.bind(this);

  }

  //after refresh page render CompenentDidMount
  async componentDidMount() {
    //get data from local storage
    let offlineData = JSON.parse(localStorage.getItem('animalData'))
    // console.log(offlineData, 'offlineData')

    //chechk internet connection or localStorage Data
    if (navigator.onLine && offlineData !== null) {


      offlineData.map((val) => {
        // console.log(val, 'offline array of the objects');
        //get a image type
        let contentType = val.ownerImage.base64.substring("data:".length,
          val.ownerImage.base64.indexOf(";base64"))

        //convert base64 to byteCharacters
        // const byteCharacters = atob(offlineData.ownerImage.base64);
        let imageData = val.ownerImage.base64;
        var byteCharacters = atob(imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));

        //convert byteCharacters to byteNumbers
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        //create a byteArray
        const byteArray = new Uint8Array(byteNumbers);

        //create a blob object ob image
        const blob = new Blob([byteArray], { type: contentType });

        //add filed of the object
        blob['lastModified'] = val.ownerImage.fileList[0].lastModified;
        blob['lastModifiedDate'] = val.ownerImage.fileList[0].lastModifiedDate;
        blob['name'] = val.ownerImage.fileList[0].name;
        blob['uid'] = val.ownerImage.fileList[0].uid;
        delete val.ownerImage.base64
        val.ownerImage.fileList[0] = blob
        let animalString = val.animalDetails
        this.animalImageBlob(animalString, val)
        this.props.createOwnerRecord(val)
      })
    }
  }

  async animalImageBlob(values, offlineValuesObj) {
    Promise.all(values.map((val) => {
      return this.convertBlobObj(val).then((result) => {
        delete val.base64
        val.image = result;
      })
    })).then((results) => {
    })
  }


  convertBlobObj = (files) => {
    return new Promise((resolve, reject) => {

      //get a image type
      let contentType = files.base64.substring("data:".length,
        files.base64.indexOf(";base64"))

      //convert base64 to byteCharacters
      let imageData = files.base64;
      var byteCharacters = atob(imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));

      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      //create a byteArray
      const byteArray = new Uint8Array(byteNumbers);

      //create a blob object ob image
      const blob = new Blob([byteArray], { type: contentType });
      blob['lastModified'] = files.image.lastModified;
      blob['lastModifiedDate'] = files.image.lastModifiedDate;
      blob['name'] = files.image.name;
      blob['uid'] = files.image.uid;
      return resolve(blob);
    });
  }

  async handleSubmit(e) {
    const { ownersImage } = this.state
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values, 'add animal')
      // console.log(values.conditionSeverity, 'conditionSeverity')
      // console.log(values.conditionTreatment, 'conditionSeverity')

      if (!err) {
        if (navigator.onLine) {
          const sanitizedValues = this.prepareDataForSaving(values);
          this.props.createOwnerRecord(sanitizedValues);
        }
        else {
          const offlineValues = this.prepareDataForSaving(values);
          const file = offlineValues.ownerImage.fileList[0];
          let base;

          //convert image object to base64
          const getBase64 = (file) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = error => reject(error);
              reader.readAsDataURL(file);
            });
          }

          getBase64(file).then(base64 => {
            base = base64
            offlineValues.ownerImage.base64 = base;
          });

          let animalFile = offlineValues.animalDetails
          this.animalImageUpload(animalFile, offlineValues)

          this.props.form.resetFields()
          this.setState({
            checkConnection: true
          })
        }
      }
    });
  }

  async animalImageUpload(values, offlineValuesObj) {
    Promise.all(values.map((val) => {
      return this.convertStringFile(val.image).then((result) => {
        val.base64 = result
        // localStorage.setItem('animalData', JSON.stringify(offlineValuesObj))
      })
    })).then((results) => {
      var array = JSON.parse(localStorage.getItem('animalData') || '[]');
      array.push(offlineValuesObj);
      localStorage.setItem('animalData', JSON.stringify(array));
    })
  }

  convertStringFile = (files) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(files);
    });
  }

  prepareDataForSaving(data) {
    let { animalAge, animalImage, vetName, site, fieldOfficerName, conditionSeverity, conditionTreatment } = data;
    data.nicNumber === "" || data.nicNumber === undefined ? data.nicNumber = "N/A" : null;
    data.phone === "" || data.phone === undefined ? data.phone = "N/A" : null;
    data.animalImage = this.state.ownerAnimal.map((item, i) => {
      return data.animalImage[i] === "" || data.animalImage[i] === undefined ? item : null;
    });
    data.ownerImage === "" || data.ownerImage === undefined ? data.ownerImage = this.state.ownersImage : null;


    //getting check boxes and slider values
    // const mappedConditions = this.state.severity.map((condition, index) => {
    //   console.log(condition, 'condition')
    //   console.log(this.state.severity, 'severity')

    //   return {
    //     condition,
    //     severity:
    //       conditionSeverity[index] === "" ||
    //         conditionSeverity[index] === undefined
    //         ? "N/A"
    //         : conditionSeverity[index],
    //     treatment:
    //       conditionTreatment[index] === "" ||
    //         conditionTreatment[index] === undefined
    //         ? "N/A"
    //         : conditionTreatment[index]
    //   };
    // });


    // const mappedConditions = this.state.severity.map((condition, index) => {
    //   return {
    //     condition,
    //     severity:
    //       conditionSeverity[index] === "" ||
    //         conditionSeverity[index] === undefined
    //         ? "N/A"
    //         : data.conditionSeverity[index],
    //     treatment:
    //       conditionTreatment[index] === "" ||
    //         conditionTreatment[index] === undefined
    //         ? "N/A"
    //         : data.conditionTreatment[index]
    //   };
    // });
    // console.log(mappedConditions, 'mappedConditions')

    //getting add treatment field values
    let vetNameObject = vetName.reduce(
      (accumulator, item, index) =>
        accumulator.concat({
          vetName: item,
        }),
      []
    );

    //getting add treatment field values
    let siteObject = site.reduce(
      (accumulator, item, index) =>
        accumulator.concat({
          site: item,
        }),
      []
    );

    //getting add treatment field values
    let fieldOfficerObject = fieldOfficerName.reduce(
      (accumulator, item, index) =>
        accumulator.concat({
          fieldOfficerName: item,
        }),
      []
    );

    //getting animal field value
    const readyObject = animalAge.reduce(
      (accumulator, item, index) =>
        accumulator.concat({
          age: item, image: this.state.ownerAnimal[index].fileList[0],
        }),
      []
    );

    //concat animal & add treatment values
    for (var i = 0; i < readyObject.length; i++) {
      readyObject[i].vetName = vetNameObject[i].vetName;
      readyObject[i].site = siteObject[i].site;
      readyObject[i].fieldOfficerName = fieldOfficerObject[i].fieldOfficerName;
      readyObject[i].mappedConditions = this.state.severity.map((condition, index) => {
        return {
          condition,
          severity:
            conditionSeverity[index] === "" ||
              conditionSeverity[index] === undefined
              ? "N/A"
              : data.conditionSeverity[index],
          treatment:
            conditionTreatment[index] === "" ||
              conditionTreatment[index] === undefined
              ? "N/A"
              : data.conditionTreatment[index]
        };
      });
    }

    console.log(readyObject, 'readyObject')

    delete data.animalAge;
    delete data.animalImage;
    delete data.vetName;
    delete data.site;
    delete data.fieldOfficerName;
    delete data.conditionSeverity;
    delete data.conditionTreatment;

    data.animalDetails = readyObject;
    data.ownerImage = this.state.ownersImage;

    return data;
  }

  checkIfNumber(rule, value, callback) {
    !isNaN(value) ? callback() : callback("Invalid number");
  }

  async normFile(e, imageWho, index) {
    const { file } = e;
    const { uid } = file;
    const compressedImage = await imageCompress(file);
    compressedImage.uid = uid;
    if (index !== undefined || index !== null) {
      const newState = this.state.ownerAnimal.map((item, i) => {
        if (i === index) {
          return { ...item, fileList: [compressedImage] }
        }
        return item;
      })
      this.setState(state => {
        return {
          ...state,
          ownerAnimal: [
            ...newState,
          ],
        }
      })
      if (index === undefined) {
        this.setState(state => {
          return {
            ...state,
            ownersImage: {
              fileList: [compressedImage]
            }
          }
        })
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (!(this.props.formStatus === prevProps.formStatus)) {
      if (this.props.formStatus.status === "done") {
        message.success(this.props.formStatus.message);
        this.props.form.resetFields();
        this.setState(prevState => {
          return {
            ownersImage: {
              showUpload: true
            },
            ownerAnimal: [{ showUpload: true }]
          };
        });
      }
    }
  }

  remove(k) {
    const { ownerAnimal } = this.state;
    if (ownerAnimal.length === 1) {
      message.error("Must have atleast one animal");
      return;
    }
    this.setState(prevState => ({
      ...prevState,
      ownerAnimal: ownerAnimal.filter(animal => animal !== k)
    }));
  }

  add() {
    const { ownerAnimal } = this.state;

    const newAnimalImage = ownerAnimal.concat({ showUpload: true, fileList: [] });

    this.setState(prevState => ({
      ...prevState,
      ownerAnimal: newAnimalImage
    }));
  }

  handlePreview = file => {
    // console.log(file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  beforeUploadAnimalImage(file, index) {
    const { ownerAnimal } = this.state;

    let newState = [...ownerAnimal];

    newState[index] = { showUpload: false };

    this.setState(prevState => ({
      ...prevState,
      ownerAnimal: [...newState]
    }));

    return false;
  }

  onRemoveAnimalImage(file, index) {
    const { ownerAnimal } = this.state;

    let newState = [...ownerAnimal];
    newState[index] = { showUpload: true, fileList: [] };

    this.setState(prevState => ({
      ...prevState,
      ownerAnimal: [...newState]
    }));
  }

  handleCancel = () => this.setState({ previewVisible: false });

  beforeUpload = (ownersImage) => {

    this.setState(({ ownersImage }) => {
      const newState = {
        ownersImage: {
          ...ownersImage,
          showUpload: false,
        }
      };
      return newState;
    });
    return false;
  }

  onRemove = (file) => {
    // console.log(file)
    this.setState(({ ownersImage }) => {
      const newState = {
        ownersImage: {
          ...ownersImage,
          showUpload: true,
          fileList: []
        }
      };
      return newState;
    });
  }

  checkBoxChangeHandler(index, value) {
    this.updateStateForSeverity(index, value);
  }

  updateStateForSeverity(index, conditionName) {
    // console.log(`${conditionName}[${index}]` , 'value of Severity')
    // console.log(conditionName , 'value of Severity')
    // let condition = `${conditionName}[${index}]`
    // console.log(condition , 'condition ')
    // let conditionArr = []
    // conditionArr.push(conditionName)

    arrf.push(`${conditionName}[${index}]`);

    // let val = arrf.indexOf(conditionName);
    // console.log(val , 'val')

    // if (val !== -1) {
    //   arrf[val] = "";
    // }
    this.setState(prevState => {
      return {
        // severity: `${conditionName}[${index}]`
        // severity: conditionArr
        // values: conditionArr,
        severity: arrf

      };
    });
    // console.log(`${conditionName}[${index}]`)
  }


  render() {
    const { previewVisible, previewImage, preview, checkConnection } = this.state;
    const { getFieldDecorator } = this.props.form;

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
    const divStyle = {
      margin: '10px',
      // border: '2px solid black',
      fontSize: '16px'
    };
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    //add tretment
    // let arr =[];
    // let arr2 = [];
    // arr.push(this.state.severity)
    // console.log(this.state.severity, 'severity')
    const severitySelector = this.state.severity.map((item, index) => {
      return (
        <div key={index}>
          <FormItem {...formItemLayout} key={index + "sevirity"}>
            {getFieldDecorator(`conditionSeverity[${index}]`)(
              <Slider marks={{ 0: "Mild", 50: "Moderate", 100: "Severe" }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            key={index + `treat`}
            extra={`Select ${item} Severity & Treatments`}
          >
            {getFieldDecorator(`conditionTreatment[${index}]`)(
              <Input placeholder={`Treatment Given`} />
            )}
          </FormItem>
        </div>
      );
    });
    // arrf.push(severitySelector)
    // console.log(arrf , 'severitySelector')
    const animalFields = this.state.ownerAnimal.map((k, index) => {
      return (
        <div key={index}>
          <FormItem {...formItemLayout} required={false}>
            {getFieldDecorator(`animalAge[${index}]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  message: "Please enter animal's age"
                },
                { validator: this.checkIfNumber }
              ]
            })(
              <Input
                placeholder="Animal's Age"
                style={{ width: `70%`, marginRight: 10 }}
              />
            )}
            {
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={false}
                onClick={() => this.remove(k)}
              />
            }
          </FormItem>
          <FormItem {...formItemLayout} extra="Upload animal's photograph">
            {getFieldDecorator(`animalImage[${index}]`, {
              getValueFromEvent: e => {
                this.normFile(e, 'animalImage', index)
              }
            })(
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                onRemove={file => this.onRemoveAnimalImage(file, index)}
                beforeUpload={file => this.beforeUploadAnimalImage(file, index)}
                onPreview={this.handlePreview}
                capture
                accept="image/*"
                listType="picture-card"
              >
                {this.state.ownerAnimal[index].showUpload ? (
                  <UploadButton size="25px" />
                ) : null}
              </Upload>
            )}
            {/* <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal> */}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`vetName[${index}]`, {
              rules: [
                { type: "string", message: "The input is not a valid Name" },
                { required: true, message: "Please input your name!" }
              ]
            })(<Input placeholder="Vet's name" />)}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`site[${index}]`, {
              rules: [{ required: true, message: `Enter a site` }]
            })(<Input placeholder="Site name" />)}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`fieldOfficerName[${index}]`, {
              rules: [
                { required: true, message: `Enter a field officer name` }
              ]
            })(<Input placeholder="Field officer name" />)}
          </FormItem>

          <Card loading={false} title="Conditions">
            <Checkbox.Group
              style={{ width: "100%" }}
              onChange={this.checkBoxChangeHandler.bind(this, index)}
            // onChange={this.checkBoxChangeHandler}

            >
              <Row>
                <Col xs={24} sm={1} md={1} lg={12} xl={6}>
                  <div>
                    <Checkbox value="Harness wound">Harness wound</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Saddle wound">Saddle wound</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Hobbles wound">Hobbles wound</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Hoof problem">Hoof problem</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Hip dislocation">
                      Hip dislocation
                      </Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Leg lameness">Leg lameness</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Eye problem">Eye problem</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Circling movement">
                      Circling movement
                      </Checkbox>
                  </div>
                </Col>
                <Col xs={24} sm={1} md={1} lg={1} xl={6}>
                  <div>
                    <Checkbox value="Mixed infection">
                      Mixed infection
                      </Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Pyrexia">Pyrexia</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Anaemic condition">
                      Anaemic condition
                      </Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Mineral deficiency">
                      Mineral deficiency
                      </Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Urea condition">Urea condition</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Diarrhoea">Diarrhoea</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Colic">Colic</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Respiratory">Respiratory</Checkbox>
                  </div>
                </Col>
                <Col xs={24} sm={1} md={1} lg={1} xl={6}>
                  <div>
                    <Checkbox value="Dystosia condition">
                      Dystosia condition
                      </Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Dermatitis">Dermatitis</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Anal prolapse">Anal prolapse</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Tetnus vaccine">Tetnus vaccine</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Deworming">Deworming</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Emergency">Emergency</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Anaplasmosis">Anaplasmosis</Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Strangle suspicion">
                      Strangle suspicion
                      </Checkbox>
                  </div>
                  <div>
                    <Checkbox value="Maggot infection">
                      Maggot infection
                      </Checkbox>
                  </div>
                </Col>
              </Row>
            </Checkbox.Group>
          </Card>
          <div style={{ margin: `10px 0px` }}>
            <Card
              loading={false}
              title={
                severitySelector === []
                  ? null
                  : `Severity & Treatment`
              }
            >
              {severitySelector}
            </Card>
          </div>
        </div>
      );
    });

    return (
      <div>
        <Card loading={false} title="Add Owner's & Animals Information">
          <Form onSubmit={this.handleSubmit.bind(this)} layout="vertical">
            <div>
              <FormItem {...formItemLayout}>
                {getFieldDecorator("ownerName", {
                  rules: [
                    { type: "string", message: "The input is not a valid Name" },
                    { required: true, message: "Please input owner's name!" }
                  ]
                })(<Input placeholder="Owner's Name" />)}
              </FormItem>
            </div>
            <div>
              <FormItem {...formItemLayout}>
                {getFieldDecorator("ownerFatherName", {
                  rules: [
                    { type: "string", message: "The input is not a valid Name" },
                    { required: true, message: "Please input father's name!" }
                  ]
                })(<Input placeholder="Father's Full Name" />)}
              </FormItem>
            </div>
            <div>
              <FormItem {...formItemLayout}>
                {getFieldDecorator("city", {
                  rules: [
                    { type: "string", message: "The input is not a valid city" },
                    { required: true, message: "Please input city!" }
                  ]
                })(<Input placeholder="City" />)}
              </FormItem>
            </div>
            <div>
              <FormItem {...formItemLayout}>
                {getFieldDecorator("address", {
                  rules: [{ required: true, message: `Enter valid address` }]
                })(<Input placeholder="Home Address" />)}
              </FormItem>
            </div>
            <div>
              <FormItem {...formItemLayout}>
                {getFieldDecorator("phone")(<Input placeholder="Phone Number" />)}
              </FormItem>
            </div>
            <div>
              <FormItem {...formItemLayout}>
                {getFieldDecorator("nicNumber")(
                  <Input placeholder="NIC Number" />
                )}
              </FormItem>
            </div>
            <div>
              <FormItem {...formItemLayout}>
                {getFieldDecorator("location")(
                  <Input placeholder="Location, Example: Brickfield" />
                )}
              </FormItem>
            </div>
            <div>
              <FormItem {...formItemLayout} extra="Upload owner's photograph">
                {getFieldDecorator("ownerImage", {
                  getValueFromEvent: e => {
                    this.normFile(e, 'ownersImage')
                  }
                })(

                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    onRemove={this.onRemove}
                    beforeUpload={file => this.beforeUpload(file)}
                    onPreview={this.handlePreview}
                    capture
                    accept="image/*"
                    listType="picture-card"
                  // fileList={this.state.ownersImage.fileList}
                  >

                    {this.state.ownersImage.showUpload ? (
                      <UploadButton size="25px" />
                    ) : null}
                  </Upload>
                )}
              </FormItem>
            </div>
            <div>
              <p>
                Add Animals owned by this person, click 'Add More' to add more
                than one
            </p>
              {animalFields}
              <FormItem {...formItemLayout}>
                <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
                  <Icon type="plus" /> Add More
              </Button>
              </FormItem>
            </div>
            <div>
              <FormItem {...tailFormItemLayout}>
                <Button
                  loading={
                    this.props.formStatus.status === "loading" ? true : false
                  }
                  type="primary"
                  htmlType="submit"
                >
                  {this.props.formStatus.status !== "loading"
                    ? `Add`
                    : this.props.formStatus.message}
                </Button>
                {checkConnection ? <div style={divStyle}>
                  You have no Internet Connection Check Connection than refresh the page
                </div> : null}
              </FormItem>
            </div>
          </Form>
        </Card>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
