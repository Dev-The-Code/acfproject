import React, { Component } from "react";
import TableRowChild from "./TableRowChild";
import {
  List,
  Avatar,
  Button,
  Spin,
  Card,
  Icon,
  Tabs,
  Col,
  Row,
  Divider
} from "antd";

import "./OwnerCard.less";
export default class extends Component {
  deleteRecord(id) {
    this.props.deleteOwnerRecord({
      collection: "owners",
      id
    });
  }
  // updateRecord(id) {
  //   this.props.updateOwnerRecord({
  //     collection: "owners",
  //     id
  //   });
  // }

  getOwnerAnimals(currentState, id) {
    this.props.changeCurrentRecordState(currentState, id);
  }
  render() {
    console.log(this.props.record.animals)
    // console.log(this.props.record)
    return (
      <div>
        <Card
          actions={[
            <span
              onClick={() => {
                this.getOwnerAnimals(
                  this.props.record.showAnimalDetails,
                  this.props.record.key
                );
              }}
            >
              Animals
            </span>,

            <span>Export</span>,
            <span onClick={() => {
              // console.log(this.props.record.key , 'key for update');
              // this.updateRecord(this.props.record.key)
              console.log(this.props.record.key , 'key of the record')
            }}>Update</span>,
            <span
              // onClick={() => {
              //   this.deleteRecord(this.props.record.key);
              // }}
            >
              Delete
            </span>
          ]}
          hoverable={true}
          style={{ maxWidth: `100%` }}
        >
          <Card.Meta
            title={this.props.record.ownerName}
            description={this.props.record.address}
          />
          <div style={{ marginTop: `25px` }}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <div style={{}}>
                  <h4 className="card-details-heading">ACF ID</h4>
                  <p className="card-details-value">{this.props.record.key}</p>
                </div>
                <div style={{}}>
                  <h4 className="card-details-heading">NIC Number</h4>
                  <p className="card-details-value">
                    {this.props.record.nicNumber}
                  </p>
                </div>
                <div style={{}}>
                  <h4 className="card-details-heading">Phone</h4>
                  <p className="card-details-value">
                    {this.props.record.phone}
                  </p>
                </div>
                <div style={{}}>
                  <h4 className="card-details-heading">City</h4>
                  <p className="card-details-value">{this.props.record.city}</p>
                </div>
              </Col>
              {/* { this.props.record ? null: */}
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <div style={{}}>
                  <h4 className="card-details-heading">Animals</h4>
                  <p className="card-details-value">
                    {/* {this.props.record.animals.length } */}
                  </p>
                </div>

                <div style={{}}>
                  <h4 className="card-details-heading">Location</h4>
                  <p className="card-details-value">
                    {this.props.record.location}
                  </p>
                </div>

                <div style={{}}>
                  <h4 className="card-details-heading">Added On</h4>
                  <p className="card-details-value">
                    {new Date(
                      parseInt(this.props.record.timestamp.seconds) * 1000
                    ).toLocaleString()}
                  </p>
                </div>
              </Col>
              {/* } */}
            </Row>
            {this.props.record.showAnimalDetails ? (
              <div className="table-container" style={{ marginTop: `15px` }}>
                <TableRowChild
                  data={{
                    ownerId: this.props.record.key,
                    animals: [...this.props.record.animals]
                  }}
                />
              </div>
            ) : (
              []
            )}
          </div>
        </Card>
      </div>
    );
  }
}
