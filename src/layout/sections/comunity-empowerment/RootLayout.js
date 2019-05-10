import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Card } from "antd";
import SectionNavigation from "../../../components/SelectionNavigation";

import AddFamilyForm from "./family-registration/AddFamilyForm";
import ViewFamilies from "./family-registration/ViewFamilies";

class DatabaseRootComponent extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selectedItem: "/add-family"
  //   };
  // }
  // componentDidMount() {
  //   this.setState(prevState => {
  //     if (prevState.selectedItem !== this.props.location.pathname) {
  //       return {
  //         selectedItem: this.props.location.pathname
  //       };
  //     }
  //   });
  // }
  render() {
    return (
      <div style={{}}>
        <div
          style={{
            borderBottom: `1px solid #e8e8e8`
          }}
        >
          <SectionNavigation style={{ border: `none`, margin: 0 }} />
        </div>
        <Card bodyStyle={{ padding: '16px' }} bordered={false}>
          Total Families
        </Card>
        <Card bodyStyle={{ padding: '16px', paddingTop:"0px" }} bordered={false}>
          <Route
            exact
            path="/comunity-empowerment/families/add-family"
            component={AddFamilyForm}
          />
          <Route
            exact
            path="/comunity-empowerment/families"
            component={ViewFamilies}
          />

        </Card>

      </div>
    );
  }
}

export default DatabaseRootComponent;
