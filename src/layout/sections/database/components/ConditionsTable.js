import React from "react";
import { Table, Divider, Icon } from "antd";

import "./OwnerCard.less"

const columns = [
  {
    title: "Condition",
    dataIndex: "condition",
    key: "condition",
    width: 250
  },
  {
    title: "Severity",
    dataIndex: "severity",
    key: "severity",
    width: 150
  },
  {
    title: "Treatment",
    dataIndex: "treatment",
    key: "treatment"
  }
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (text, record) => (
  //       <span>
  //         <Link to={`/database/view-treatment/${record.key}`}>
  //           View Treatment
  //         </Link>
  //         <Divider type="vertical" />
  //         <Link to={`/database/add-treatment/${record.key}`}>Add Treatment</Link>
  //       </span>
  //     )
  //   }
];

export default class extends React.Component {
  render() {
    const dataSrouce = this.props.conditionData.map((data, index) => {
        return {...data, key: `${index}-condition`}    
    }) 


    return (
      <Table
        bordered={true}
        columns={columns}
        pagination={false}
        dataSource={dataSrouce}
      />
    );
  }
}
