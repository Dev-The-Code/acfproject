import React from "react";
import { Table, Divider, Icon } from "antd";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Animal ID",
    dataIndex: "key",
    key: "name",
    width: 250
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 80
  },
  {
    title: "Animal image",
    dataIndex: "image",
    key: "image",
    render: src => (
      <a href={src} target="_blank">
        View Animal's Image
      </a>
    )
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <Link to={`/database/view-treatment/${record.key}`}>
          View Treatment
        </Link>
        <Divider type="vertical" />
        {/* <Link to={`/database/add-treatment/${record.key}`}>Add Treatment</Link> */}
      </span>
    )
  }
];

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animalData: []
    };
  }

  componentDidMount() {
    const ownerId = this.props.data.ownerId;
    const animalData = this.props.data.animals.map(docRef => {
      return docRef.get().then(doc => {
        return { ...doc.data(), key: doc.id };
      });
    });
    Promise.all(animalData).then(animalData => {
      this.setState(prevState => {
        return {
          ownerId,
          animalData
        };
      });
    });
    
  }
  render() {
   
    return (
      <Table
        bordered={true}
        columns={columns}
        pagination={false}
        dataSource={this.state.animalData}
      />
    );
  }
}
