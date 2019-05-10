import React, {Component} from 'react'
import { Input, Icon } from 'antd'

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userName: '',
      };
    }
    emitEmpty = () => {
      this.userNameInput.focus();
      this.setState({ userName: '' });
    }
    onChangeUserName = (e) => {
      this.setState({ userName: e.target.value });
    }
    render() {
      const { userName } = this.state;
      const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
      return (
        <Input
          {...this.props}
         
          placeholder="Search ACF database"
          prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)', fontSize:16 }} />}
          suffix={suffix}
          value={userName}
          onChange={this.onChangeUserName}
          ref={node => this.userNameInput = node}
        />
      );
    }
  }