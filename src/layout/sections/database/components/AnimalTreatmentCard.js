import React, { Component } from "react";
import ConditionsTable from "./ConditionsTable";
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
  deleteRecord(id, ownerId) {
    this.props.deleteTreatmentRecord({
      id,
      ownerId
    });
  }

  render() {
    return (
      <div>
        <Card
          actions={[
            <span>Export</span>,
            <span>Update</span>,
            <span
              onClick={() => {
                this.deleteRecord(this.props.record.key, this.props.animalId);
              }}
            >
              Delete
            </span>
          ]}
          hoverable={true}
          style={{ maxWidth: `100%` }}
        >
          <div style={{}}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <div style={{}}>
                  <h4 className="card-details-heading">Animal ID</h4>
                  <p className="card-details-value">{this.props.animalId}</p>
                </div>
                <div style={{}}>
                  <h4 className="card-details-heading">Treatment ID</h4>
                  <p className="card-details-value">{this.props.record.key}</p>
                </div>
                <div style={{}}>
                  <h4 className="card-details-heading">Latitude</h4>
                  <p className="card-details-value">
                    {this.props.record.geoLocation.lat}
                  </p>
                </div>
                <div style={{}}>
                  <h4 className="card-details-heading">Longitude</h4>
                  <p className="card-details-value">
                    {this.props.record.geoLocation.long}
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <div style={{}}>
                  <h4 className="card-details-heading">Site</h4>
                  <p className="card-details-value">{this.props.record.site}</p>
                </div>
                <div style={{}}>
                  <h4 className="card-details-heading">Field Officer</h4>
                  <p className="card-details-value">
                    {this.props.record.fieldOfficerName}
                  </p>
                </div>

                <div style={{}}>
                  <h4 className="card-details-heading">Vet Name</h4>
                  <p className="card-details-value">
                    {this.props.record.vetName}
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
            </Row>
            <div className="table-container" style={{marginTop:`30px`}}>
             
              <ConditionsTable
                conditionData={this.props.record.mappedConditions}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
