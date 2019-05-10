import React, { PureComponent } from "react";

import { Card, Row, Col, Divider } from "antd";

//import tabs components
import Summary from "./Summary";
import SubForms from "./SubForms";

const tabsList = [
  {
    key: "summary",
    tab: "Details"
  },
  {
    key: "education-for-kids",
    tab: "Education"
  },
  {
    key: "skill-for-member",
    tab: "Skill"
  },
  {
    key: "pet-for-family",
    tab: "Pet"
  }
];

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: "summary",
      family: this.props.family
    };
  }

  onTabChange = key => {
    this.setState(state => ({
      ...state,
      selected: key
    }));
  };

  render() {
    return (
      <Card
        headStyle={{ padding: "0px" }}
        type={`inner`}
        bordered={true}
        bodyStyle={{ padding: "15px", wordWrap: "break-word" }}
        tabList={tabsList}
        activeTabKey={this.state.selected}
        onTabChange={this.onTabChange}
      >
        <Row>
          <Col sm={{ span: 5 }} xs={{ span: 24 }}>
            <div style={{}}>
              <h4 className="card-details-heading">ACF Family ID</h4>
              <p style={{ margin: "0px" }}>{this.props.family.id}</p>
            </div>
          </Col>
          <Col sm={{ span: 10 }} xs={{ span: 24 }}>
            <div style={{}}>
              <h4 className="card-details-heading">Location</h4>
              <p style={{ margin: "0px" }}>
                {`${this.props.family.location}/${this.props.family.city} `}
              </p>
            </div>
          </Col>
        </Row>
        <Divider style={{ margin: "15px 0px 15px 0px" }} />

        {this.state.selected === "summary" ? (
          <Summary family={this.state.family} />
        ) : (
          <SubForms selected={this.state.selected} family={this.state.family} />
        )}
      </Card>
    );
  }
}
