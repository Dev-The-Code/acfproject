import {combineReducers} from 'redux'

import databaseSectionReducer from './sections/database/reducer'
// import donkeyCampSectionReducer from './sections/forms/donkey-camp/reducer'
import adminLayoutReducer from './adminLayoutReducer' 

export default combineReducers({adminLayoutReducer, databaseSectionReducer})