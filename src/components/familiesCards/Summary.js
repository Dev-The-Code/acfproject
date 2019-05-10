import React, { PureComponent, Fragment } from "react";
import { Row, Col, Tag, Icon } from 'antd';
const imageContainer = {
  display: 'inline-block',

  display: 'inline-block',
  padding: '4px',
  boxShadow: '0px 0px 9px -3px black',
  width: '100%',
  height: 'auto',
}
export default class extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Fragment>
        <Row gutter={15}>
          <Col sm={{span:4}} xs={{span: 24}} >
            <div style={imageContainer}>
              <img height={'auto'} width={'100%'} src={this.props.family.HOFImage} />
            </div>
          </Col>
          <Col sm={{span:8}} xs={{span: 24}}>
            <Row>
              <Col span={10}><div>
                <h4 className="card-details-heading">HOF Name</h4>
                <p className="card-details-value">{`${this.props.family.firstName} ${this.props.family.lastName}`}</p>
              </div></Col>
              <Col span={12}>  <div>
                <h4 className="card-details-heading">HOF CNIC</h4>
                <p className="card-details-value">{this.props.family.cnic}</p>
              </div> </Col>
            </Row>


            <div>
              <h4 className="card-details-heading">HOF Phone</h4>
              <p className="card-details-value">{this.props.family.phone}</p>
            </div>
     
            <Row>
              <Col span={10}><div>
              <h4 className="card-details-heading">Parents Alive?</h4>
              <p style={{marginTop: '10px'}} className="card-details-value">{this.props.family.parentsAlive ? <Icon type="check-circle" theme='twoTone' twoToneColor="#22e115" style={{ fontSize: "45px"}}/> : <Icon type="close-circle" theme='twoTone' twoToneColor="#d56a6a" style={{ fontSize: "45px"}}/>}</p>
            </div></Col>
              <Col span={12}>  <div>
              <h4 className="card-details-heading">Own House?</h4>
              <p style={{marginTop: '10px'}} className="card-details-value">{this.props.family.house ? <Icon type="check-circle" theme='twoTone' twoToneColor="#22e115" style={{ fontSize: "45px"}}/> : <Icon type="close-circle" theme='twoTone' twoToneColor="#d56a6a" style={{ fontSize: "45px"}}/>}</p>
            </div></Col>
            </Row>
            <div>
              <h4 className="card-details-heading">House Construction Type</h4>
              <p className="card-details-value">{this.props.family.constructionType}</p>
            </div>
          </Col>
          <Col sm={{span:4}} xs={{span: 24}}>
            <div style={imageContainer}>
              <img height={'auto'} width={'100%'} src={this.props.family.familyImage} />
            </div>
          </Col>
          <Col sm={{span:8}} xs={{span: 24}}>
            <div>
              <h4 className="card-details-heading">Female Adults In Family</h4>
              <p className="card-details-value" style={{}}>{this.props.family.famAdultsNumFemale}</p>
            </div>
            <div>
              <h4 className="card-details-heading">Male Adults In Family</h4>
              <p className="card-details-value" style={{}}>{this.props.family.famAdultsNumMale}</p>
            </div>
            <div>
              <h4 className="card-details-heading">Address</h4>
              <p className="card-details-value" style={{}}>{this.props.family.address}</p>
            </div>
            <div>
              <h4 className="card-details-heading">Home Income</h4>
              <p className="card-details-value" style={{}}>{this.props.family.houseIncome}</p>
            </div>
            <div>
              <h4 className="card-details-heading">Nature Of Work</h4>
              {this.props.family.natureOfWork.map((val) => <Tag>{val}</Tag>)}
              
            </div>
            <div>
              <h4 className="card-details-heading">Available Facilities</h4>
              {this.props.family.houseNeeds.map((val) => <Tag>{val}</Tag>)}
              
            </div>

          </Col>
        </Row>




      </Fragment>
    );
  }
}
