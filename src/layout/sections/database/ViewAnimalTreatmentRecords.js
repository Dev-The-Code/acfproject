import React, { Component } from "react";

import {
  List,
  Avatar,
  Button,
  message,
  Spin,
  Card,
  Icon,
  Tabs,
  Col,
  Row,
  Divider
} from "antd";

import "./ViewRecords.less";

import AnimalTreatmentCard from "./components/AnimalTreatmentCard.js";

export default class LoadMoreList extends Component {
  componentDidMount() {
    this.props.getAnimalTreatments(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.deleteRecord !== prevProps.deleteRecord) {
      message[this.props.deleteRecord.status](this.props.deleteRecord.message);
    }
  }
  render() {
    return (
      <div>
        <div style={{ margin: `15px 0px` }}>
          <Button>
            <Icon type="export" />Export All
          </Button>
        </div>
        <List
          grid={{ gutter: 6, xs: 1, sm: 2, md: 2, lg: 2, xl: 1, xxl: 2 }}
          loading={this.props.listLoading}
          itemLayout="vertical"
          dataSource={this.props.treatmentRecords}
          renderItem={record => (
            <List.Item>
              <AnimalTreatmentCard
                deleteRecord={this.props.deleteRecord}
                animalId={this.props.id}
                key={record.key}
                record={record}
                deleteTreatmentRecord={this.props.deleteTreatmentRecord}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
