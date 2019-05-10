import React, { Component } from "react";
import { Route } from "react-router-dom";
import AddAnimalForm from "./AddAnimalForm.js";
import SectionNavigation from "./components/SectionNavigation";
import ViewAnimalTreatmentRecords from "./ViewAnimalTreatmentRecords";
import ViewRecords from "./ViewRecords";

import VetForm from "./components/VetForm";

class DatabaseRootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: ""
    };
  }
  componentDidMount() {
    this.setState(prevState => {
      // console.log(prevState);
      if (prevState.selectedItem !== this.props.location.pathname) {
        return {
          selectedItem: this.props.location.pathname
        };
      } else {
        console.log(false);
      }
    });
  }
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
        <div style={{ padding: `7px` }}>
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
          <Route
            exact
            path="/database/add-record"
            render={() => (
              <AddAnimalForm
                {...this.props.addAnimalForm}
                createOwnerRecord={this.props.createOwnerRecord}
              />
            )}
          />
          <Route
            path="/database/add-treatment/:id"
            render={routeDetails => {
              return (
                <VetForm
                  {...this.props.vetForm}
                  getSingleAnimal={this.props.getSingleAnimal}
                  addAnimalCondition={this.props.addAnimalCondition}
                  id={routeDetails.match.params.id}
                />
              );
            }}
          />
          <Route
            path="/database/view-treatment/:id"
            render={routeDetails => {
              return (
                <ViewAnimalTreatmentRecords
                  {...this.props.animalTreatments}
                  getAnimalTreatments={this.props.getAnimalTreatments}
                  deleteTreatmentRecord={this.props.deleteTreatmentRecord}
                  id={routeDetails.match.params.id}
                />
              );
            }}
          />
        </div>
      </div>
    );
  }
}

export default DatabaseRootComponent;
