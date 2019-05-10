import React, { Component } from "react";
import { firestore } from "../firebase";
import { Table, Spin } from "antd";
import moment from "moment";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      family: { ...props.family },
      candidateRecord: { ...props.candidateRecord },
      selectedForm: props.selectedForm,
      loading: true
    };
  }

  // runs before render
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  // runs after render
  async componentDidUpdate(prevProps, prevState) {
  
    if (this.props.refresh) {
      await this.fetchProgrssRecords(
        this.state.family.id,
        this.state.selectedForm,
        this.state.candidateRecord
      );

      this.props.progressViewTableRecordsFetch(true);
    }
  }

  async componentDidMount() {
    await this.fetchProgrssRecords(
      this.state.family.id,
      this.state.selectedForm,
      this.state.candidateRecord
    );
  }

  async fetchProgrssRecords(familyId, selectedForm, candidateRecord) {
    const candidateRecordId = candidateRecord.id;

    const docRefs = await firestore
      .collection("families")
      .doc(familyId)
      .collection(selectedForm)
      .doc(candidateRecordId)
      .collection("progress")
      .get();

    let documents = [];
    docRefs.forEach(document => {
      documents.push({ id: document.id, ...document.data() });
    });

    this.setState(state => {
      return {
        ...state,
        loading: false,
        list: [...documents]
      };
    });
  }

  render() {
    const { list } = this.state;

    let columns = null;

    if (!this.state.loading && Array.isArray(list) && list.length !== 0) {
      columns = Object.keys(list[0]).map(key => {
        if (key === "date") {
          return {
            title: `${key.charAt(0).toUpperCase()}${key.substring(1)}`,
            dataIndex: key,
            key,
            width: 200,
            render: value => {
              return value.seconds * 1000000000 + value.nanoseconds;
            }
          };
        }
        return {
          title: `${key.charAt(0).toUpperCase()}${key.substring(1)}`,
          dataIndex: key,
          key,
          width: 200
        };
      });
    }

    return (
      <Table
        title={() => this.props.title}
        size="middle"
        rowKey={record => record.id}
        loading={this.state.loading === true ? this.state.loading : this.props.refresh  === true ? true : false }
        // style={{ marginTop: "10px" }}
        bordered={false}
        columns={columns}
        pagination={false}
        dataSource={list}
      />
    );
  }
}
