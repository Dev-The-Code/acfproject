import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";

import "./SectionNavigation.less";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class extends React.Component {
  state = {
    current: "comunity-empowerment/families"
  };
  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  render() {
    const { routes } = this.props;

    return (
      <Menu
        className={`section-inner-nav`}
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
      
        <Menu.Item key="comunity-empowerment/families">
          <Link to="/comunity-empowerment/families">
            <Icon type="appstore" />
            View Families
          </Link>
        </Menu.Item>
        <Menu.Item key="/comunity-empowerment/families/add-family">
          <Link to="/comunity-empowerment/families/add-family">
            <Icon type="form" />
            Add Family
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}
