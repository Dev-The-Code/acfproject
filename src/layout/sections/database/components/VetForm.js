import React, { Component } from "react";
import {
  Form,
  Input,
  Icon,
  Row,
  Col,
  Button,
  Upload,
  message,
  Checkbox,
  Slider,
  Card
} from "antd";

async function getLatLong() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      resolve({
        lat: position.coords.latitude,
        long: position.coords.longitude
      });
    });
  });
}

const FormItem = Form.Item;
const emptyArray = [];

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.checkBoxChangeHandler = this.checkBoxChangeHandler.bind(this);
    this.updateStateForSeverity = this.updateStateForSeverity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      severity: []
    };
  }

  componentDidMount() {
    this.props.getSingleAnimal("animals", this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.conditionAdded.id !== prevProps.conditionAdded.id) {
      message.success(this.props.conditionAdded.message);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const finalValues = await this.sanitizeFormValues(values);
        this.props.addAnimalCondition(this.props.id, finalValues);
      }
    });
  }

  async sanitizeFormValues(values) {
    const { conditionSeverity, conditionTreatment, ...rest } = values;
    const geoLocation = await getLatLong();

    const mappedConditions = this.state.severity.map((condition, index) => {
      return {
        condition,
        severity:
          conditionSeverity[index] === "" ||
          conditionSeverity[index] === undefined
            ? "N/A"
            : conditionSeverity[index],
        treatment:
          conditionTreatment[index] === "" ||
          conditionTreatment[index] === undefined
            ? "N/A"
            : conditionTreatment[index]
      };
    });

    return {
      ...rest,
      geoLocation,
      mappedConditions
    };
  }

  checkBoxChangeHandler(value) {
    this.updateStateForSeverity(value);
  }

  updateStateForSeverity(conditionName) {
    this.setState(prevState => {
      return {
        severity: conditionName
      };
    });
  }

  render() {
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

    return (
      <div>
        <Card loading={false} title="Add Treatment Data">
          <div style={{ marginBottom: "10px" }}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <div style={{}}>
                  <h4 className="card-details-heading">ACF Animal ID</h4>
                  <p className="card-details-value">
                    {this.props.singleAnimalDetails.key}
                  </p>
                </div>
                <div style={{}}>
                  <h4 className="card-details-heading">Animal Age</h4>
                  <p className="card-details-value">
                    {this.props.singleAnimalDetails.age}
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <div style={{}}>
                  <h4 className="card-details-heading">Added On</h4>
                  <p className="card-details-value">
                    {this.props.singleAnimalDetails.timestamp
                      ? new Date(
                          parseInt(
                            this.props.singleAnimalDetails.timestamp.seconds
                          ) * 1000
                        ).toLocaleString()
                      : null}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <FormItem {...formItemLayout}>
              {getFieldDecorator("vetName", {
                rules: [
                  { type: "string", message: "The input is not a valid Name" },
                  { required: true, message: "Please input your name!" }
                ]
              })(<Input placeholder="Vet's name" />)}
            </FormItem>
            <FormItem {...formItemLayout}>
              {getFieldDecorator("site", {
                rules: [{ required: true, message: `Enter a site` }]
              })(<Input placeholder="Site name" />)}
            </FormItem>
            <FormItem {...formItemLayout}>
              {getFieldDecorator("fieldOfficerName", {
                rules: [
                  { required: true, message: `Enter a field officer name` }
                ]
              })(<Input placeholder="Field officer name" />)}
            </FormItem>

            <Card loading={false} title="Conditions">
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={this.checkBoxChangeHandler}
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
                  severitySelector === emptyArray
                    ? null
                    : `Severity & Treatment`
                }
              >
                {severitySelector}
              </Card>
            </div>
            <FormItem {...tailFormItemLayout}>
              <Button loading={false} type="primary" htmlType="submit">
                Add
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
