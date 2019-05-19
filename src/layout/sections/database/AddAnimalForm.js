import React, { Component } from "react";
import { Form, Input, Icon, Button, Upload, message, Card, Modal } from "antd";
import UploadButton from "../../../components/UploadButton";
import imageCompress from '../../../imageCompress';
// import AsyncStorage from '@callstack/async-storage';

const FormItem = Form.Item;

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
      preview: ''
    };

    this.checkIfNumber = this.checkIfNumber.bind(this);
    this.normFile = this.normFile.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.onRemoveAnimalImage = this.onRemoveAnimalImage.bind(this);
    this.beforeUploadAnimalImage = this.beforeUploadAnimalImage.bind(this);
    this.prepareDataForSaving = this.prepareDataForSaving.bind(this);
  }

  //after refresh page render CompenentDidMount
  async componentDidMount() {
    //get data from local storage
    let offlineData = JSON.parse(localStorage.getItem('animalData'))
    console.log(offlineData, 'offlineData')

    //chechk internet connection or localStorage Data
    if (navigator.onLine && offlineData !== null) {

      //get a image type
      let contentType = offlineData.ownerImage.base64.substring("data:".length,
        offlineData.ownerImage.base64.indexOf(";base64"))

      //convert base64 to byteCharacters
      // const byteCharacters = atob(offlineData.ownerImage.base64);
      let imageData = offlineData.ownerImage.base64;
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
      blob['lastModified'] = offlineData.ownerImage.fileList[0].lastModified;
      blob['lastModifiedDate'] = offlineData.ownerImage.fileList[0].lastModifiedDate;
      blob['name'] = offlineData.ownerImage.fileList[0].name;
      blob['uid'] = offlineData.ownerImage.fileList[0].uid;
      delete offlineData.ownerImage.base64
      offlineData.ownerImage.fileList[0] = blob


      //cheking blob is correct creating
      // var reader = new FileReader();
      // reader.readAsDataURL(offlineData.ownerImage.fileList[0]);
      // reader.onloadend = function () {
      //   let base64data = reader.result;
      //   console.log(base64data);
      // }

      //sending data to database
      this.props.createOwnerRecord(offlineData)


      // offlineData.animalDetails.map((elem, i) => {
      //   // console.log(elem, 'eeeeeee')
      //   // console.log(elem.image, "elem");
      //   // console.log(elem.image = new Blob([JSON.stringify(elem.image)]) , 'elem.image = new Blob([JSON.stringify(elem.image)])');
      //   return elem.image = new Blob([JSON.stringify(elem.image)], { type: '' })
      // })
    }
  }

  handleSubmit = (e) => {
    // console.log('handle submit')
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (navigator.onLine) {
          const sanitizedValues = this.prepareDataForSaving(values);
          this.props.createOwnerRecord(sanitizedValues);
        }
        else {
          const offlineValues = this.prepareDataForSaving(values);

          //convert image object to base64
          const getBase64 = (file) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = error => reject(error);
              // console.log(file, '...............')
              reader.readAsDataURL(file);
            });
          }

          let base;
          const file = offlineValues.ownerImage.fileList[0];
          // console.log(file)
          getBase64(file).then(base64 => {
            // localStorage.setItem("imgData" , base64)
            base = base64
            // console.debug("file stored", base64);
            // console.log(base, 'base')
            offlineValues.ownerImage.base64 = base;
            // offlineValues.animalDetails.map((elem, index) => {
            //   console.log(elem.image, 'fileList of animal image')
            localStorage.setItem('animalData', JSON.stringify(offlineValues))
          });
        }
      }
    });
  }

  prepareDataForSaving(data) {
    let { animalAge, animalImage } = data;
    data.nicNumber === "" || data.nicNumber === undefined ? data.nicNumber = "N/A" : null;
    data.phone === "" || data.phone === undefined ? data.phone = "N/A" : null;
    data.animalImage = this.state.ownerAnimal.map((item, i) => {
      return data.animalImage[i] === "" || data.animalImage[i] === undefined ? item : null;
    });
    data.ownerImage === "" || data.ownerImage === undefined ? data.ownerImage = this.state.ownersImage : null;

    const readyObject = animalAge.reduce(
      (accumulator, item, index) =>
        accumulator.concat({ age: item, image: this.state.ownerAnimal[index].fileList[0] }),
      []
    );

    delete data.animalAge;
    delete data.animalImage;

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
        console.log(item, 'item')
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
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  beforeUploadAnimalImage(index) {
    const { ownerAnimal } = this.state;

    let newState = [...ownerAnimal];

    newState[index] = { showUpload: false };

    this.setState(prevState => ({
      ...prevState,
      ownerAnimal: [...newState]
    }));

    return false;
  }

  onRemoveAnimalImage(index) {
    const { ownerAnimal } = this.state;

    let newState = [...ownerAnimal];
    newState[index] = { showUpload: true, fileList: [] };

    this.setState(prevState => ({
      ...prevState,
      ownerAnimal: [...newState]
    }));
  }

  handleCancel = () => this.setState({ previewVisible: false });

  beforeUpload = () => {

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

  onRemove = () => {
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


  render() {
    const { previewVisible, previewImage, preview } = this.state;
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
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

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
                onRemove={file => this.onRemoveAnimalImage(index)}
                beforeUpload={file => this.beforeUploadAnimalImage(index)}
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
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </FormItem>
        </div>
      );
    });

    return (
      <div>
        <Card loading={false} title="Add Owner's & Animals Information">
          <Form onSubmit={this.handleSubmit} layout="vertical">
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
                    beforeUpload={this.beforeUpload}
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
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
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
