import { all } from "redux-saga/effects";

import {
  addOwnerRecordWatcher,
  getAllOwnerRecordsWatcher,
  deleteOwnerRecordWatcher,
  getSignleAnimalWatcher,
  addAnimalConditionWatcher,
  getAnimalTreatmentsWatcher,
  deleteAnimalTreatmentWatcher
} from "./sections/database";

export default function* rootSaga() {
  yield all([
    addOwnerRecordWatcher(),
    getAllOwnerRecordsWatcher(),
    deleteOwnerRecordWatcher(),
    getSignleAnimalWatcher(),
    addAnimalConditionWatcher(),
    getAnimalTreatmentsWatcher(),
    deleteAnimalTreatmentWatcher() 
  ]);
}
