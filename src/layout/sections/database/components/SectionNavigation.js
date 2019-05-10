import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";

import "./SectionNavigation.less";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class extends React.Component {
  state = {
    current: "app"
  };
  handleClick = e => {
    this.setState({
      current: e.key
    });
  };
  render() {
    return (
      <Menu
        className={`section-inner-nav`}
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="/database">
          <Link to="/database">
            <Icon type="appstore" />View Records
          </Link>
        </Menu.Item>
        <Menu.Item key="/database/add-record">
          <Link to="/database/add-record">
            <Icon type="form" />Add Record
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}
