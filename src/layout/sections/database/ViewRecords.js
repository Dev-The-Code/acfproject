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
import OwnerCard from "./components/OwnerCard";

const TabPane = Tabs.TabPane;

export default class LoadMoreList extends Component {
  componentDidMount() {
    this.props.getAllOwners("owners");
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.tableData.deleteRecord !== prevProps.tableData.deleteRecord
    ) {
      message[this.props.tableData.deleteRecord.status](
        this.props.tableData.deleteRecord.message
      );
    }
  }

  onLoadMore = () => {
    this.setState({
      loadingMore: true
    });
  };

  shouldComponentUpdate(nextProps) {
    return nextProps === this.props ? false : true;
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
          className="demo-loadmore-list"
          loading={this.props.tableData.loading}
          itemLayout="vertical"
          // loadMore={loadMore}
          dataSource={this.props.tableData.records}
          renderItem={record => (
            <List.Item>
              <OwnerCard
                key={record.key}
                record={record}
                changeCurrentRecordState={this.props.changeCurrentRecordState}
                deleteOwnerRecord={this.props.deleteOwnerRecord}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
