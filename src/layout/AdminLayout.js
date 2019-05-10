import React, { Component } from "react";
import { Layout, Menu, Icon, Drawer } from "antd";
import { Link } from "react-router-dom";
import SearchComponent from "../components/SearchComponent";
import ACFLogo from "../acf-logo.png";
import "./AdminLayout.less";

const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siderClosed: false,
      defaultSelectedKeys: null
    };
  }

  onCollapse = state => {
    this.setState(prevState => {
      return {
        ...prevState,
        siderClosed: !prevState.siderClosed
      };
    });
  };

  componentWillMount() {
    this.setState(prevState => {
      return {
        ...prevState,
        defaultSelectedKeys: this.props.location.pathname
      };
    });
  }

  render() {
    return (
      // { maxHeight: `100vh`, minHeight: '100vh' }
      <Layout style={{ maxHeight: `100vh`, minHeight: "100vh" }}>
        <Header
          style={{
            display: `flex`,
            padding: `0`,
            borderBottom: `1px solid #e8e8e8`
          }}
        >
          <div style={{ display: "flex" }}>
            <Icon
              className="trigger"
              type={"menu-unfold"}
              onClick={this.onCollapse}
            />
            <a
              className="acf-logo"
              style={{
                lineHeight: `59px`,
                margin: `0px 20px`
              }}
            >
              <img src={ACFLogo} alt="acf logo" style={{ width: 50 }} />
            </a>
          </div>
        </Header>
        <Layout>
          <Drawer
            title="Main Menu"
            placement={'left'}
            closable={true}
            onClose={this.onCollapse}
            visible={this.state.siderClosed}
          >
            <Menu
              onClick={this.onCollapse}
              defaultSelectedKeys={[this.state.defaultSelectedKeys]}
              mode="inline"
              style={{ border: `none`, height: "100%" }}
            >
              <MenuItem key="/">
                <Link color="inherit" to="/">
                  <Icon type="dashboard" />
                  <span>Dashboard</span>
                </Link>
              </MenuItem>
              <MenuItem key="database">
                <Link color="inherit" to="/database">
                  <Icon type="user" />
                  <span>Database</span>
                </Link>
              </MenuItem>

              <MenuItem key="add-family">
                <Link color="inherit" to="/comunity-empowerment/families">
                  <Icon type="rise" />
                  <span>Comunity Empowerment</span>
                </Link>
              </MenuItem>
            </Menu>
          </Drawer>
          {/* <Sider
            style={{borderRight: "1px solid #e8e8e8"}}
            theme="light"
            breakpoint="sm"
            collapsedWidth={0}
            onCollapse={this.onCollapse}
            collapsible
            width={225}
          // collapsed={this.state.siderClosed}
          >
            <Menu
              defaultSelectedKeys={[this.state.defaultSelectedKeys]}
              mode="inline"
              style={{ border: `none`, height: "100%" }}
            >
              <MenuItem key="/">
                <Link color="inherit" to="/">
                  <Icon type="dashboard" />
                  <span>Dashboard</span>
                </Link>
              </MenuItem>
              <MenuItem key="database">
                <Link color="inherit" to="/database">
                  <Icon type="user" />
                  <span>Database</span>
                </Link>
              </MenuItem>

              <MenuItem key="add-family">
                <Link color="inherit" to="/comunity-empowerment/families">
                  <Icon type="rise" />
                  <span>Comunity Empowerment</span>
                </Link>
              </MenuItem>
            </Menu>
          </Sider> */}

          <Content>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}
