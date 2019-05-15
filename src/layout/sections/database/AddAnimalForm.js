import React, { Component } from "react";
import { Form, Input, Icon, Button, Upload, message, Card } from "antd";
import UploadButton from "../../../components/UploadButton";
import imageCompress from '../../../imageCompress';
import AsyncStorage from '@callstack/async-storage';

// import pica from "pica";
// console.log(pica);

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
      files: [],
      newVal: ''
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.checkIfNumber = this.checkIfNumber.bind(this);
    this.normFile = this.normFile.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.onRemoveAnimalImage = this.onRemoveAnimalImage.bind(this);
    this.beforeUploadAnimalImage = this.beforeUploadAnimalImage.bind(this);
    this.prepareDataForSaving = this.prepareDataForSaving.bind(this);
  }

  async componentDidMount() {
    let offlineData = JSON.parse(localStorage.getItem('animalData'))
    console.log(offlineData, 'offlineData')
    if (navigator.onLine && offlineData !== null) {
      console.log(offlineData.ownerImage.fileList[0])
      let ownerImage = new Blob([JSON.stringify(offlineData.ownerImage.fileList)],
        { type: offlineData.ownerImage.fileList[0].type },
        // { lastModified: offlineData.ownerImage.fileList[0].lastModified },
        // { lastModifiedDate: offlineData.ownerImage.fileList[0].lastModifiedDate },
        // { name: offlineData.ownerImage.fileList[0].name },
        // { uid: offlineData.ownerImage.fileList[0].uid } ,
      )
      console.log(ownerImage, 'ownerImage')
      ownerImage['lastModified'] = offlineData.ownerImage.fileList[0].lastModified;
      ownerImage['lastModifiedDate'] = offlineData.ownerImage.fileList[0].lastModifiedDate;
      ownerImage['name'] = offlineData.ownerImage.fileList[0].name;
      ownerImage['uid'] = offlineData.ownerImage.fileList[0].uid;
      // delete ownerImage.size;
      // ownerImage['size'] = offlineData.ownerImage.fileList[0].size;

      // ownerImage.size = offlineData.ownerImage.fileList[0].size;
      offlineData.ownerImage.fileList[0] = ownerImage

      // let newObj = { ...ownerImage };
      // var clonedObj = { ...obj };
      // Object.assign(newObj, ownerImage);
      // const copied = Object.create(ownerImage)

      // console.log(copied , 'newObj')






      // Object.assign(ownerImage.size, offlineData.ownerImage.fileList[0].size)

      // console.log(ownerImage, 'after blob')
      // console.log(offlineData.ownerImage.fileList[0])

      // console.log(offlineData.ownerImage.fileList[0])
      // console.log(offlineData, 'after set blob')

      offlineData.animalDetails.map((elem, i) => {
        console.log(elem, 'eeeeeee')
        console.log(elem.image, "elem");
        // console.log(elem.image = new Blob([JSON.stringify(elem.image)]) , 'elem.image = new Blob([JSON.stringify(elem.image)])');
        return elem.image = new Blob([JSON.stringify(elem.image)], { type: '' })
      })

      this.props.createOwnerRecord(offlineData)


      // console.log(offlineData.ownerImage.fileList, 'hhhhhh')
      // offlineData.ownerImage.fileList = offlineData.ownerImage.fileList.map((file) => {
      // return
      // offlineData.ownerImage.fileList[0] = await imageCompress(offlineData.ownerImage.fileList[0]);
      // })
      // console.log(offlineData.ownerImage.fileList, 'hhhhhh')

      // offlineData.map((elem, index) => {
      //   console.log(elem, 'elem')
      //   // this.props.createOwnerRecord(elem)
      //   // return elem;
      // })
      // console.log(data, "data in the map")
      //   // localStorage.removeItem('animalData')
    }
    // console.log('component did mount')
  }

  handleSubmit = (e) => {
    // console.log('handle submit')
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // this.prepareDataForSaving(values)
        // this.props.createOwnerRecord(sanitizedValues);
        // let fileObj = [this.state.files]
        // console.log(fileObj, 'fileObj')
        // localStorage.setItem("data", JSON.stringify(fileObj))

        if (navigator.onLine) {
          const sanitizedValues = this.prepareDataForSaving(values);
          console.log(sanitizedValues)
          this.props.createOwnerRecord(sanitizedValues);
        }
        else {
          console.log('offline')
          const offlineValues = this.prepareDataForSaving(values);
          console.log(offlineValues, 'offlineValues')
          let ownerArr = [];
          let filess = {};
          for (var i = 0; i < offlineValues.ownerImage.fileList.length; i++) {
            console.log(offlineValues.ownerImage.fileList[i].name);
            filess = {
              'lastModified': offlineValues.ownerImage.fileList[i].lastModified,
              'lastModifiedDate': offlineValues.ownerImage.fileList[i].lastModifiedDate,
              'name': offlineValues.ownerImage.fileList[i].name,
              'size': offlineValues.ownerImage.fileList[i].size,
              'type': offlineValues.ownerImage.fileList[i].type,
              'uid': offlineValues.ownerImage.fileList[i].uid,
            }
            //add the file obj to your array
            ownerArr.push(filess)
            console.log(ownerArr)
            offlineValues.ownerImage.fileList = ownerArr
          }

          console.log(offlineValues, 'sanitizedValues')
          console.log(offlineValues.animalDetails, 'sanitizedValues')

          localStorage.setItem('animalData', JSON.stringify(offlineValues));







          // var arr = [];
          // arr.push(sanitizedValues);
          // console.log(arr)
          // console.log(sanitizedValues)
          // localStorage.setItem('animalData', JSON.stringify(sanitizedValues))
          // let objLocal = {};
          // objLocal.ownerImage = sanitizedValues.ownerImage;
          // let img = sanitizedValues.ownerImage.fileList[0]
          // console.log(Object.keys(img).length, '..........'); // see the FileList
          // let leng = Object.keys(img).length;
          // AsyncStorage.setItem('animal', JSON.stringify(sanitizedValues))
          //   .then((obj) => { console.log(obj, '....................') })
          //   .catch(() => { })
          //   for (key in img) {
          //     console.log(key)
          // }

          // let animalArr = [];
          // let files = {};
          // console.log(sanitizedValues.ownerImage.fileList.length)

          // console.log(sanitizedValues.animalDetails.length)


          // for (var i = 0; i < sanitizedValues.ownerImage.fileList.length; i++) {
          //   console.log(sanitizedValues.ownerImage.fileList[i].name);
          //   file = {
          //     'lastMod': sanitizedValues.ownerImage.fileList[i].lastModified,
          //     'lastModDate': sanitizedValues.ownerImage.fileList[i].lastModifiedDate,
          //     'name': sanitizedValues.ownerImage.fileList[i].name,
          //     'size': sanitizedValues.ownerImage.fileList[i].size,
          //     'type': sanitizedValues.ownerImage.fileList[i].type,
          //   }
          //   //add the file obj to your array
          //   ownerArr.push(file)
          // }

          // //   //save the array to localStorage
          //   console.log(JSON.stringify(myArray));

          // let objLocal = {};
          // objLocal.ownerName = sanitizedValues.ownerName;
          // objLocal.address = sanitizedValues.address;
          // objLocal.city = sanitizedValues.city;
          // objLocal.location = sanitizedValues.location;
          // objLocal.nicNumber = sanitizedValues.nicNumber;
          // objLocal.ownerFatherName = sanitizedValues.ownerFatherName;
          // objLocal.phone = sanitizedValues.phone;
          // objLocal.ownerImage = sanitizedValues.ownerImage
          // console.log(objLocal);


          // console.log(sanitizedValues.ownerImage.fileList[0].lastModified)

          // localStorage.setItem('animalData', JSON.stringify(objLocal))
          // var templocal = JSON.parse(localStorage.getItem('animalData'));
          // console.log(templocal)
          // console.log(templocal.ownerImage.fileList[0]);
          // templocal.ownerImage.fileList[0].type = sanitizedValues.ownerImage.fileList[0].type;
          // templocal.ownerImage.fileList[0].size = sanitizedValues.ownerImage.fileList[0].size

          // console.log(templocal)
          // localStorage.setItem('animal', JSON.stringify(templocal))

          // .then(function(obj){
          //   console.log(obj,'asdsadasd')
          // })
          // console.log(templocal,'chaeckijgggggggg');
          // sessionStorage.setItem('animalData', JSON.stringify(sanitizedValues));

        }
      }
    });
  }

  prepareDataForSaving(data) {
    // console.log(data , "prepareDataForving")
    let { animalAge, animalImage } = data;
    // console.log(this.state.ownerAnimal, 'ownerAnimal')

    data.nicNumber === "" || data.nicNumber === undefined ? data.nicNumber = "N/A" : null;
    data.phone === "" || data.phone === undefined ? data.phone = "N/A" : null;
    data.animalImage = this.state.ownerAnimal.map((item, i) => {
      // console.log(i, "animalImage map")
      return data.animalImage[i] === "" || data.animalImage[i] === undefined ? item : null;
    });

    data.ownerImage === "" || data.ownerImage === undefined ? data.ownerImage = this.state.ownersImage : null;

    // console.log(data, 'data')
    // console.log(this.state.ownersImage, 'ownerImage')
    // console.log(data.animalImage);
    // console.log(this.state.ownerAnimal);
    // console.log( data.nicNumber , ' data.nicNumber');
    // console.log(data.phone , 'data.phone')
    const readyObject = animalAge.reduce(
      (accumulator, item, index) =>
        accumulator.concat({ age: item, image: this.state.ownerAnimal[index].fileList[0] }),
      []
    );
    // console.log(readyObject, "readyObject")

    delete data.animalAge;
    delete data.animalImage;

    data.animalDetails = readyObject;

    data.ownerImage = this.state.ownersImage;

    // console.log(data, 'data endd');
    return data;
  }

  checkIfNumber(rule, value, callback) {
    !isNaN(value) ? callback() : callback("Invalid number");
  }

  async normFile(e, imageWho, index) {
    // console.log("e", e)
    // console.log("index", index)

    const { file } = e;
    const { uid } = file;

    const compressedImage = await imageCompress(file);
    compressedImage.uid = uid;
    // console.log(compressedImage, 'uuuuuuuuuuuuuuuuuuuuuuuuu')
    if (index !== undefined || index !== null) {

      const newState = this.state.ownerAnimal.map((item, i) => {
        // console.log(i, item)
        if (i === index) {
          // console.log(index , 'index');
          // console.log(i , 'i');
          return { ...item, fileList: [compressedImage] }
        }
        return item;
      })
      // console.log(newState, 'newState')
      this.setState(state => {
        return {
          ...state,
          ownerAnimal: [
            ...newState,
          ],
          // fileList: [compressedImage]  
        }
      })
      // console.log(this.state.ownerAnimal , 'ownerAnimal')
      //   if (index === undefined) {
      //     this.setState(state => {
      //       return {
      //         ...state,
      //         [imageWho]: {
      //           ...state[imageWho],
      //           fileList: [compressedImage]
      //         }
      //       }
      //     })
      //     console.log(imageWho, 'imageWho')
      //   }
      // }
      if (index === undefined) {
        // console.log('fasfsaA')
        this.setState(state => {
          return {
            ...state,
            ownersImage: {
              // ...state,
              // ...state[imageWho],
              fileList: [compressedImage]
            }
          }
        })
        // console.log(this.state.ownersImage, 'ownersImage')
      }
    }
  }
  // normFilesss = (e, imageWho, index) =>{
  //   console.log("e", e)
  //   console.log("index", index)

  //   const { file } = e;
  //   const { uid } = file;

  //   const compressedImage = await imageCompress(file);
  //   compressedImage.uid = uid;
  //   console.log(compressedImage, 'uuuuuuuuuuuuuuuuuuuuuuuuu')
  //   if (index === undefined) {
  //     console.log('fasfsaA')
  //     this.setState(state => {
  //       return {
  //         ...state,
  //         ownersImage: {
  //           // ...state,
  //           // ...state[imageWho],
  //           fileList: [compressedImage]
  //         }
  //       }
  //     })
  //     console.log(this.state.ownersImage, 'ownersImage')
  //   }
  // }

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



  beforeUploadAnimalImage(index) {
    const { ownerAnimal } = this.state;

    let newState = [...ownerAnimal];

    newState[index] = { showUpload: false };

    this.setState(prevState => ({
      ...prevState,
      ownerAnimal: [...newState]
    }));

    // console.log(newState)
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

  // _handleImageChange(e) {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];

  //   reader.onloadend = () => {
  //     this.setState({
  //       files: file,
  //       imagePreviewUrl: reader.result
  //     });
  //   }
  //   // this.setState({
  //   //   newVal: 'helllllllllll'
  //   // })

  //   reader.readAsDataURL(file)
  //   // console.log(files)
  // }



  render() {
    // console.log('add animal file')
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
                onRemove={file => this.onRemoveAnimalImage(index)}
                beforeUpload={file => this.beforeUploadAnimalImage(index)}
                capture
                accept="image/*"
                listType="picture-card"
              >
                {this.state.ownerAnimal[index].showUpload ? (
                  <UploadButton size="25px" />
                ) : null}
              </Upload>
            )}
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
                  getValueFromEvent: (file) => {
                    this.normFile(file, 'ownersImage')
                  }
                })(
                  <Upload
                    action=""
                    beforeUpload={() => {

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
                    }}
                    onRemove={() => {
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
                    }}
                    capture
                    listType="picture-card"
                    fileList={this.state.ownersImage.fileList}
                    accept="image/jpeg"
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
                {/* <Button className="btn btn-primary btnapple"
                  type="primary" htmlType="submit">Add</Button> */}
              </FormItem>
              {/* <input className="fileInput"
                type="file"
                onChange={(e) => this._handleImageChange(e)} />
              <div className="imgPreview">
                {$imagePreview}
              </div> */}
            </div>
          </Form>
        </Card>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
