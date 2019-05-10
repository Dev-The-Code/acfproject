import React from 'react'
import { connect } from 'react-redux'
import DatabaseRootComponent from './DatabaseRootComponent'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { actionCreators }  from './reducer';


export default withRouter(connect(
	(state)=> ({
		// match state to props
		addAnimalForm : {...state.databaseSectionReducer.addAnimalForm},
		viewRecords : {...state.databaseSectionReducer.viewRecords},
		vetForm : {...state.databaseSectionReducer.vetForm},
		animalTreatments : {...state.databaseSectionReducer.animalTreatments}
	}),
	(dispatch) => bindActionCreators(actionCreators, dispatch)
)(DatabaseRootComponent))
