import React, { PureComponent, Fragment } from "react";
import { Button, Table, Modal, Tag } from "antd";
import { firestore } from "../../firebase";

//import registration form for education
import SubRegistrationForm from "../RegistrationForm";
import ProgressForm from "../ProgressForm";
import ProgressViewTable from "../ProgressViewTable";
import './SubForms.less';

export default class extends PureComponent {
  columns = {
    "pet-for-family": {
      col: [
        {
          title: "Pet Name",
          dataIndex: "petName",
          key: "fname",
          width: 200
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
          width: 200
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
          width: 200
        },
        {
          title: "Action",
          key: "action",
          width: 200,
          render: (text, record) => {
            return (
              <Button
                onClick={() => {
                  this.updateProgress(record.id);
                }}
              >
                Update Progress
              </Button>
            );
          }
        }
      ],
      tableTitle: ``,
      progressViewTitle: ``
    },
    "education-for-kids": {
      tableTitle: `Children registered for education in this family`,
      progressViewTitle: `Progress enteries for this child`,
      col: [
        {
          title: "First Name",
          dataIndex: "firstName",
          key: "fname",
          width: 300
        },
        {
          title: "Last Name",
          dataIndex: "lastName",
          key: "lname",
          width: 300
        },
        {
          title: "Date Of Birth",
          dataIndex: "DOB",
          width: 300,
          key: "dob"
        },
        {
          title: "Gender",
          dataIndex: "gender",
          width: 300,
          key: "gender"
        },
        {
          title: "Sports",
          render: record => {
            return record.sports
              ? record.sports.map((item, i) => (
                <Tag key={i} color="blue">
                  {item}
                </Tag>
              ))
              : "";
          },
          width: 300,
          key: "sports"
        },
        {
          title: "Action",
          key: "action",
          width: 300,
          render: (text, record) => {
            return (
              <Button
                onClick={() => {
                  this.updateProgress(record.id);
                }}
              >
                Update Progress
              </Button>
            );
          }
        }
      ]
    },
    "skill-for-member": {
      tableTitle: `Family member's registered for skills in this family`,
      progressViewTitle: `Progress enteries for this member`,
      col: [
        {
          title: "First Name",
          dataIndex: "firstName",
          key: "fname",
          width: 200
        },
        {
          title: "Last Name",
          dataIndex: "lastName",
          key: "lname",
          width: 200
        },
        {
          title: "Date Of Birth",
          dataIndex: "DOB",
          width: 200,
          key: "dob"
        },
        {
          title: "Gender",
          dataIndex: "gender",
          width: 200,
          key: "gender"
        },
        {
          title: "Traning Start",
          dataIndex: "startingDate",
          width: 200,
          key: "startDate"
        },
        {
          title: "Skill",
          dataIndex: "skill",
          width: 200,
          key: "skill",
          render: record => {
            return <Tag color="blue">{record}</Tag>;
          }
        },
        {
          title: "Action",
          key: "action",
          width: 200,
          render: (text, record) => {
            return (
              <Button
                onClick={() => {
                  this.updateProgress(record.id);
                }}
              >
                Update Progress
              </Button>
            );
          }
        }
      ]
    }
  };

  constructor(props) {
    super(props);
    this.updateProgress = this.updateProgress.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.expandedRowComponent = this.expandedRowComponent.bind(this);
    this.expanedRowsList = this.expanedRowsList.bind(this);
    this.progressViewTableRecordsFetch = this.progressViewTableRecordsFetch.bind(
      this
    );

    this.state = {
      fetch: false,
      family: props.family,
      selected: null,
      list: [],
      modal: {
        state: false, // open or close
        for: "", // which form to show
        confirmLoading: false, // true when ok button is pressed
        content: null
      },
      registration: {
        loading: false,
        state: ""
      },
      progress: {
        loading: false,
        state: ""
      },
      progressViewTable: {
        fetched: false
      },
      expandedRows: [],
      loading: true
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selected !== this.props.selected) {
      this.loadDocs();
    }
    if (!prevState.fetch && this.state.fetch === "REG_SUBMIT") {
      this.loadDocs();
    }
  }

  progressViewTableRecordsFetch(fetch) {
    if (this.state.fetch === "PROG_SUBMIT" && fetch) {
      this.setState(state => {
        return {
          ...state,
          progressViewTable: {
            fetched: true
          },
          fetch: false
        };
      });
    }
  }

  updateProgress(id) {
    const modalState = this.showModal({
      state: true,
      for: "progress",
      confirmLoading: false,
      content: {
        memberId: id,
        selected: this.props.selected,
        familyId: this.state.family.id
      }
    });

    this.setState(state => {
      return {
        ...state,
        modal: { ...modalState }
      };
    });
  }

  componentDidMount() {
    this.loadDocs();
  }

  async loadDocs() {
    const docRefs = await firestore
      .collection("families")
      .doc(this.state.family.id)
      .collection(this.props.selected)
      .get();

    let documents = [];
    docRefs.forEach(document => {
      documents.push({ id: document.id, ...document.data() });
    });

    this.setState(state => {
      return {
        ...state,
        loading: false,
        selected: this.props.selected,
        fetch: false,
        list: [...documents]
      };
    });
  }

  expandedRowComponent(cRecord) {
    return (
      <ProgressViewTable
        title={this.columns[this.props.selected].progressViewTitle}
        refresh={
          // this.state.expandedRows.find(id => id === cRecord.id) !== undefined &&
          this.state.fetch === "PROG_SUBMIT" ? true : false
        }
        progressViewTableRecordsFetch={this.progressViewTableRecordsFetch}
        family={this.state.family}
        candidateRecord={cRecord}
        selectedForm={this.props.selected}
      />
    );
  }

  handleRegister() {
    const modalState = this.showModal({
      confirmLoading: false,
      for: "registration",
      state: true,
      content: {
        familyId: this.state.family.id,
        selected: this.props.selected
      }
    });

    this.setState(state => {
      return {
        ...state,
        modal: { ...modalState }
      };
    });
  }

  showModal(modal) {
    return {
      ...this.state.modal,
      ...modal
    };
  }

  async handleOk() {
    this.setState(state => ({
      ...state,
      modal: {
        ...state.modal,
        confirmLoading: true
      }
    }));
  }

  handleCancel(submitted) {
    const modalState = this.showModal({
      state: false,
      confirmLoading: false
    });

    this.setState(state => {
      return {
        ...state,
        modal: { ...modalState },
        fetch: typeof submitted === "string" ? submitted : false
      };
    });
  }

  showForm() {
    if (this.state.modal.for === "registration") {
      return (
        <SubRegistrationForm
          invalidFields={() => {
            const modalState = this.showModal({
              confirmLoading: false
            });
            this.setState(state => ({
              ...state,
              modal: { ...state.modal, ...modalState }
            }))
          }}
          loading={this.state.modal.confirmLoading}
          content={this.state.modal.content}
          handleCancel={this.handleCancel}
        />
      );
    }
    return (
      <ProgressForm
        handleCancel={this.handleCancel}
        content={{ ...this.state.modal.content }}
        loading={this.state.modal.confirmLoading}
      />
    );
  }

  expanedRowsList(expandedRows) {
    this.setState(state => ({
      ...state,
      expandedRows
    }));
  }

  render() {
    return (
      <Fragment >
        <Button  style={{fontWeight: 'bold'}}onClick={this.handleRegister} type="primary">
          REGISTER
        </Button>
        <div style={{ overflow: "auto" }}>
          <Table
            // scroll={true}
            title={() => this.columns[this.props.selected].tableTitle}
            onExpandedRowsChange={this.expanedRowsList}
            loading={this.props.selected !== this.state.selected ? true : this.state.fetch === "REG_SUBMIT" ? true : false}
            rowKey={record => record.id}
            // style={{ marginTop: "10px", overflow:"auto" }}
            expandedRowRender={this.expandedRowComponent}
            bordered={false}
            columns={this.columns[this.props.selected].col}
            pagination={false}
            dataSource={
              this.state.selected === this.props.selected ? this.state.list : []
            }
          />
        </div>

        <Modal
          visible={this.state.modal.state}
          onOk={this.handleOk}
          confirmLoading={this.state.modal.confirmLoading}
          onCancel={this.handleCancel}
        >
          {this.showForm()}
        </Modal>
      </Fragment>
    );
  }
}
