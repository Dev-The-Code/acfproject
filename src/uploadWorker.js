// WIP
// have to make this done with actual worker

import dbStore from "./database-helpers/indexedDBHelpers";
import { firestore, storage } from "./firebase";
import { arrayBufferToBlob } from './utils'

export default async function uploadPolling() {
  const dbRef = await dbStore("pending");
  let seelatestUploads = true;

  setInterval(async () => {
    if (seelatestUploads) {
      // console.log("this ran in 5 sec");
      seelatestUploads = false;

      const keys = await dbRef.keys();
      if (keys.length > 0) {
        console.log("now keys found and ran", keys);

        const uploadedKeys = await keys.reduce(async (acc, key) => {
          const accNew = await acc;
          let value = await dbRef.get(key);

          //convert to blob;
          value = arrayBufferToBlob(value, 'image/jpeg');

          // 0 = collection 1 = familyId, 2 = fieldName
          const splitKey = key.split("-");

          const uploadTask = await storage
            .child(`${splitKey[0]}/${splitKey[1]}/${splitKey[2]}`)
            .put(value)
            .then(
              async snapshot => {
                const url = await snapshot.ref.getDownloadURL();
                try {
                  await firestore
                    .doc(`${splitKey[0]}/${splitKey[1]}`)
                    .update({ [splitKey[2]]: url });
                  console.log("uploadeddd the images");
                  await dbRef.delete(key);
                } catch (error) {
                  console.log("error", error);
                }
              },
              async error => { }
            );
          return [...accNew, key];
        }, []);
      }
      seelatestUploads = true;
    }
  }, 7000);
}
