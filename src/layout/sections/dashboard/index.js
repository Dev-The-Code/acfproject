import React from 'react';
import PureComponent from '../comunity-empowerment/family-registration/ViewFamilies';
import OwnerCard from '../database/components/OwnerCard';
import { Link, Route } from "react-router-dom";
import { Menu, Tabs } from "antd";
import animalImg from '../../../images/animal.jpg';
import ViewFamilies from "../comunity-empowerment/family-registration/ViewFamilies";
import ViewRecords from '../database/ViewRecords'


const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

const Dashboard = () => {
    return (
        <div>
            {/* <Menu>
                <MenuItem key="database">
                    <Link color="inherit" to="/database">
                        <span>Animal Data</span>
                    </Link>
                </MenuItem>
                <MenuItem key="database">
                    <Link color="inherit" to="/comunity-empowerment/families">
                        {/* <span>Famelies Data</span> */}
            {/* <Route 
                    exact
                    color="inherit" 
                    to="/comunity-empowerment/families"
                    component={ViewFamilies}
                    /> 
                        <span>Famelies Data</span>

                    </Link>
                </MenuItem>
            </Menu> */}
            <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Families Data" key="1">
                    <Route
                        exact
                        color="inherit"
                        to="/comunity-empowerment/families"
                        component={ViewFamilies}
                    />
                </TabPane>
                <TabPane tab="Animal Data" key="2">
                    {/* <Route
                        exact
                        color="inherit"
                        to="/database"
                        component={LoadMoreList}
                    /> */}
                    <Route
                        exact
                        path="/database/"
                        render={() => (
                            <ViewRecords
                                {...this.props.viewRecords}
                                getAllOwners={this.props.getAllOwners}
                                deleteOwnerRecord={this.props.deleteOwnerRecord}
                                changeCurrentRecordState={this.props.changeCurrentRecordState}
                                updateOwnerRecord={this.props.updateOwnerRecord}
                            />
                        )}
                    />
                </TabPane>
                
            </Tabs>
        </div>

    );
}

export default Dashboard