import { takeEvery, all, call, put } from "redux-saga/effects";
import {
  addOwnerToDatabase,
  getAllOwnersRecords,
  deleteOwnerRecords,
  getSingleAnimal,
  saveAnimalCondition,
  getAnimalTreatments,
  deleteAnimalTreatment
} from "../../database-helpers";
import {
  CREATE,
  GET_SINGLE_ANIMAL,
  GETRECORDS,
  ADD_ANIMAL_CONDITION,
  GETRECORDS_DELETE,
  GET_ANIMAL_TREATMENT,
  DELETE_ANIMAL_TREATMENT,
  actionCreators
} from "../../layout/sections/database/reducer";

//workers
export function* addOwnerRecordToFirebase(action) {
  try {
    yield put(
      actionCreators.createOwnerRecordLoading("Working, please wait..")
      );
      console.log('action calll')

    const successMessage = yield call(
      addOwnerToDatabase,
      action.payload.values
    );
    console.log(successMessage , 'successMessage')

    yield put(actionCreators.createOwnerRecordSuccess(successMessage));
  } catch (exception) {
    yield put(
      actionCreators.createOwnerRecordFailed("Failed adding to database")
    );
  }
}

export function* getOwnerRecordsFromFireBase(action) {
  const response = yield call(getAllOwnersRecords, action.payload);
  yield put(actionCreators.showOwnerRecords(response));
}

export function* deleteOwnerRecordsFromFireBase(action) {
  const response = yield call(deleteOwnerRecords, action.payload);
  yield put(actionCreators.deleteOwnerRecordResponse(response));
  yield put(actionCreators.getAllOwners("owners"));
}

export function* getSingleAnimalFromFirebase(action) {
  const response = yield call(getSingleAnimal, action.payload);
  yield put(actionCreators.showSingleAnimal(response));
}

export function* addAnimalConditionToFirebase(action) {
  const response = yield call(saveAnimalCondition, action.payload);
  yield put(actionCreators.addAnimalConditionSuccess(response));
}

export function* getAnimalTreatmentsFromFirebase(action) {
  const response = yield call(getAnimalTreatments, action.payload);
  yield put(actionCreators.showTreatmentRecords(response));
}

export function* deleteAnimalTreatmentFromFirebase(action) {
  const response = yield call(deleteAnimalTreatment, action.payload);

  yield put(actionCreators.deleteAnimalTreatmentResponse(response));

  const { ownerId } = action.payload;

  yield put(actionCreators.getAnimalTreatments(ownerId));
}

//watchers
export function* addOwnerRecordWatcher() {
  yield takeEvery(CREATE, addOwnerRecordToFirebase);
}

export function* getAllOwnerRecordsWatcher() {
  yield takeEvery(GETRECORDS, getOwnerRecordsFromFireBase);
}

export function* deleteOwnerRecordWatcher() {
  yield takeEvery(GETRECORDS_DELETE, deleteOwnerRecordsFromFireBase);
}
export function* getSignleAnimalWatcher() {
  yield takeEvery(GET_SINGLE_ANIMAL, getSingleAnimalFromFirebase);
}
export function* addAnimalConditionWatcher() {
  yield takeEvery(ADD_ANIMAL_CONDITION, addAnimalConditionToFirebase);
}
export function* getAnimalTreatmentsWatcher() {
  yield takeEvery(GET_ANIMAL_TREATMENT, getAnimalTreatmentsFromFirebase);
}
export function* deleteAnimalTreatmentWatcher() {
  yield takeEvery(DELETE_ANIMAL_TREATMENT, deleteAnimalTreatmentFromFirebase);
}
