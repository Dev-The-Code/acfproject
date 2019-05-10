//constant action types

export const CREATE = "CREATE/FETCH",
  CREATE_LOADING = "CREATE_LOADING/LOCAL",
  CREATE_SUCCESS = "CREATE_SUCCESS/LOCAL",
  CREATE_FAIL = "CREATE_FAIL",
  DELETE_OWNER_RECORDS_RESPONSE = "DELETE_OWNER_RECORDS_RESPONSE",
  GETRECORDS = "GETRECORDS/FETCH",
  GETRECORDS_LOADING = "GETRECORDS_LOADING/LOCAL",
  GETRECORDS_SUCCESS = "GETRECORDS_SUCCESS/LOCAL",
  GETRECORDS_DELETE = "GETRECORDS_DELETE/FETCH",
  RECORDS_CHANGESTATE = "RECORDS_CHANGESTATE/LOCAL",
  GET_SINGLE_ANIMAL = "GET_SINGLE_ANIMAL/FETCH",
  SHOW_SINGLE_ANIMAL = "SHOW_SINGLE_ANIMAL/FETCH",
  ADD_ANIMAL_CONDITION = "ADD_ANIMAL_CONDITION/FETCH",
  ADD_ANIMAL_CONDITION_SUCCESS = "ADD_ANIMAL_CONDITION_SUCCESS/LOCAL",
  GET_ANIMAL_TREATMENT = "GET_ANIMAL_TREATMENT/FETCH",
  DELETE_ANIMAL_TREATMENT = "DELETE_ANIMAL_TREATMENT/FETCH",
  DELETE_ANIMAL_TREATMENT_RESPONSE = "DELETE_ANIMAL_TREATMENT_RESPONSE/LOCAL",
  SHOW_ANIMAL_TREATMENT = "SHOW_ANIMAL_TREATMENT/LOCAL";
  // GETRECORDS_UPDATE = "GETRECORDS_UPDATE/FETCH";
  // UPDATE_OWNER_RECORDS_RESPONSE = 'UPDATE_OWNER_RECORDS_RESPONSE'

//action creators
export const actionCreators = {
  showSingleAnimal: response => ({
    type: SHOW_SINGLE_ANIMAL,
    payload: response
  }),
  getSingleAnimal: (collection, id) => ({
    type: GET_SINGLE_ANIMAL,
    payload: {
      collection,
      id
    }
  }),
  getAllOwners: response => ({
    type: GETRECORDS,
    payload: {
      collection: response
    }
  }),
  addAnimalCondition: (docId, values) => ({
    type: ADD_ANIMAL_CONDITION,
    payload: {
      docId,
      ...values
    }
  }),
  addAnimalConditionSuccess: response => ({
    type: ADD_ANIMAL_CONDITION_SUCCESS,
    payload: {
      status: "done",
      message: "Successfully added to database",
      id: response
    }
  }),
  showOwnerRecords: response => ({
    type: GETRECORDS_SUCCESS,
    payload: [...response]
  }),
  // updateOwnerRecord:({id, collection}) =>({
  //   type: GETRECORDS_UPDATE,
  //   payload: { id, collection }
  // }),
  // updateOwnerRecordResponse: response => ({
  //   type: UPDATE_OWNER_RECORDS_RESPONSE,
  //   payload: { ...response }
  // }),
  deleteOwnerRecord: ({ id, collection }) => ({
    type: GETRECORDS_DELETE,
    payload: { id, collection }
  }),
  deleteOwnerRecordResponse: response => ({
    type: DELETE_OWNER_RECORDS_RESPONSE,
    payload: { ...response }
  }),
  createOwnerRecord: response => ({
    type: CREATE,
    payload: { values: { ...response } }
  }),
  createOwnerRecordSuccess: response => ({
    type: CREATE_SUCCESS,
    payload: { status: "done", message: response }
  }),
  createOwnerRecordLoading: response => ({
    type: CREATE_LOADING,
    payload: { status: "loading", message: response }
  }),
  createOwnerRecordFailed: response => ({
    type: CREATE_FAIL,
    payload: { status: "fail", message: response }
  }),
  changeCurrentRecordState: (currentState, id) => ({
    type: RECORDS_CHANGESTATE,
    payload: { currentState, id }
  }),
  getAnimalTreatments: id => ({
    type: GET_ANIMAL_TREATMENT,
    payload: { id }
  }),
  showTreatmentRecords: response => ({
    type: SHOW_ANIMAL_TREATMENT,
    payload: [...response]
  }),
  deleteTreatmentRecord: payload => ({
    type: DELETE_ANIMAL_TREATMENT,
    payload: { ...payload }
  }),
  deleteAnimalTreatmentResponse: response => ({
    type: DELETE_ANIMAL_TREATMENT_RESPONSE,
    payload: { ...response }
  })
};


//reducer
export default function databaseSectionReducer(
  state = {
    addAnimalForm: {
      formStatus: { status: null, message: null }
    },
    viewRecords: {
      tableData: {
        records: [],
        loading: true,
        deleteRecord: null,
        updateRecord: null,
      }
    },
    vetForm: {
      singleAnimalDetails: {
        key: "",
        age: "",
        timestamp: null
      },
      conditionAdded: {
        status: null,
        message: null,
        id: null
      }
    },
    animalTreatments: {
      listLoading: true,
      treatmentRecords: [],
      deleteRecord: null,
      updateRecord :null
    }
  },
  action
) {
  switch (action.type) {
    // case UPDATE_OWNER_RECORDS_RESPONSE:
    // return {
    //   ...state,
    //   viewRecords: {
    //     tableData: {
    //       ...state.viewRecords.tableData,
    //       updateRecord: { ...action.payload }
    //     }
    //   }
    // };
    // break;
    case DELETE_OWNER_RECORDS_RESPONSE:
      return {
        ...state,
        viewRecords: {
          tableData: {
            ...state.viewRecords.tableData,
            deleteRecord: { ...action.payload }
          }
        }
      };
      break;
    case DELETE_ANIMAL_TREATMENT_RESPONSE:
      return {
        ...state,
        animalTreatments: {
          ...state.animalTreatments,
          deleteRecord: { ...action.payload }
        }
      };
      break;
    case SHOW_ANIMAL_TREATMENT:
      return {
        ...state,
        animalTreatments: {
          ...state.animalTreatments,
          listLoading: false,
          treatmentRecords: [...action.payload]
        }
      };
      break;
    case ADD_ANIMAL_CONDITION_SUCCESS:
      return {
        ...state,
        vetForm: {
          ...state.vetForm,
          conditionAdded: {
            ...action.payload
          }
        }
      };
      break;
    case CREATE_SUCCESS:
      return {
        ...state,
        addAnimalForm: {
          formStatus: { ...action.payload }
        }
      };
      break;
    case SHOW_SINGLE_ANIMAL:
      return {
        ...state,
        vetForm: {
          ...state.vetForm,
          singleAnimalDetails: { ...action.payload }
        }
      };
      break;
    case CREATE_LOADING:
      return {
        ...state,
        addAnimalForm: {
          formStatus: { ...action.payload }
        }
      };
      break;
    case GETRECORDS_LOADING:
      return {
        ...state,
        viewRecords: {
          tableData: {
            ...state.viewRecords.tableData,
            loading: true
          }
        }
      };
      break;
    case GETRECORDS_SUCCESS:
      return {
        ...state,
        viewRecords: {
          tableData: {
            ...state.viewRecords.tableData,
            records: [...action.payload],
            loading: false
          }
        }
      };
      break;

    case RECORDS_CHANGESTATE:
      const { currentState } = action.payload;

      const records = state.viewRecords.tableData.records.map(record => {
        // console.log(record, 'animal')
        return record.key === action.payload.id
          ? { ...record, showAnimalDetails: !currentState }
          : record;
      });

      return {
        ...state,
        viewRecords: {
          tableData: {
            ...state.viewRecords.tableData,
            records
          }
        }
      };
      break;
    default:

      return state;
  }
}
