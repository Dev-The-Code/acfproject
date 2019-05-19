import { firestore, storage, firebase } from "../firebase";

import dbStore from "./indexedDBHelpers";
import { blobToArrayBuffer } from "../utils";

export function addFamilyRecord(payload) {
  var familyRef = firestore.collection("families").doc();

  familyRef.set(payload);

  return familyRef;
}

export function uploadFamilyImages(images, familyRef) {
  Object.keys(images).forEach(key => {
    blobToArrayBuffer(images[key]).then(arrayBuffer => {
      dbStore("pending").set(`families-${familyRef.id}-${key}`, arrayBuffer);
    });
  });
}

export async function deleteAnimalTreatment(payload) {
  const { id, ownerId } = payload;
  try {
    await firestore
      .collection("animals")
      .doc(ownerId)
      .collection("treatments")
      .doc(id)
      .delete();

    return {
      status: "success",
      id,
      message: "Successfully Deleted"
    };
  } catch (error) {
    return {
      status: "error",
      id,
      message: "An error occurred"
    };
  }
}

export async function getAnimalTreatments(payload) {
  const { id } = payload;

  const querySnapshot = await firestore
    .collection("animals")
    .doc(id)
    .collection("treatments")
    .get();

  let dataArray = [];

  querySnapshot.forEach(doc => {
    dataArray.push({ ...doc.data(), key: doc.id });
  });

  return dataArray;
}
export async function saveAnimalCondition(payload) {
  const { docId, ...rest } = payload;

  const docRef = await firestore
    .collection("animals")
    .doc(docId)
    .collection("treatments")
    .add({
      ...rest,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

  return docRef.id;
}

export async function getSingleAnimal(payload) {
  const { collection, id } = payload;
  const querySnapshot = await firestore
    .collection(collection)
    .doc(id)
    .get();

  return { key: querySnapshot.id, ...querySnapshot.data() };
}

export async function getAllOwnersRecords(payload) {
  const { collection } = payload;
  // console.log(collection , 'collection')
  const querySnapshot = await firestore.collection(collection).get();
  // console.log(querySnapshot , 'querySnapshot')

  let dataArray = [];

  querySnapshot.forEach(doc => {
    dataArray.push({ ...doc.data(), showAnimalDetails: false, key: doc.id });
  });
  // console.log(dataArray)

  return dataArray;
}

export async function deleteOwnerRecords(payload) {
  const { id, collection } = payload;
  try {
    await firestore
      .collection(collection)
      .doc(id)
      .delete();

    return {
      status: "success",
      message: "Owner Successfully deleted",
      id
    };
  } catch (error) {
    return {
      status: "error",
      message: "There was an error",
      id
    };
  }
}
export async function updateOwnerRecords(payload) {
  const { id, collection } = payload;
  try {
    await firestore
      .collection(collection)
    console.log(collection, 'collection')

    return {
      status: "success",
      message: "Owner Successfully deleted",
      id
    };
  } catch (error) {
    return {
      status: "error",
      message: "There was an error",
      id
    };
  }
}

export function addOwnerToDatabase(values) {
  const { ownerImage, animalDetails, ...rest } = values;
  console.log(ownerImage);
  console.log(values)
  return new Promise((resolve, reject) => {
    firestore
      .collection("owners")
      .add({
        ...rest,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(docRef => {
        console.log(
          "uploaded the initial data with document reference" + docRef
        );
        // console.log('owner_images')
        const { id } = docRef;
        console.log(docRef , 'docRef')
        // console.log(id)
        console.log(ownerImage, 'ownerImage')
        console.log(ownerImage.fileList[0]);

        // ownerImage.fileList.map((val) => {
        //     return console.log(val)
        // })
        //upload owner's image
        const task = storage
          .child(`owner_images/${id}`)
          .put(ownerImage.fileList[0]);


        console.log('ownerImage')
        task.on(
          "state_changed",
          function (snapshot) { },
          function (error) { },
          function () {
            task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log("uploaded the owner image with URL: " + downloadURL);
              docRef
                .update({
                  ownerImage: downloadURL
                })
                .then(() => {
                  console.log(
                    "updated the owner document with owner image url."
                  );
                  //upload animals
                  console.log("uploading animals");

                  Promise.all(uploadAnimals(docRef, animalDetails)).then(
                    childAnimalDocRef => {
                      docRef
                        .update({
                          animals: [...childAnimalDocRef]
                        })
                        .then(() => {
                          resolve("Form has been submitted successfully");
                        });
                    }
                  );
                });
            });
          }
        );
        // var connectedRef = firebase.database().ref(".info/connected");
        // console.log(connectedRef)
        // connectedRef.on("value", function (snap) {
        //   console.log(snap.val())
        //   if (snap.val() === true) {
        //     // alert("connected");
        //   } else {
        //     // alert("not connected");
        //   }
        // });
      })
      .catch(error => { });
  });

}

function uploadAnimals(ownerDoc, animalDetails) {
  const animalCollection = firestore.collection("animals");

  return animalDetails.map((animal, index) => {
    return new Promise((resolve, reject) => {
      let { age, image } = animal;
      console.log(animal, 'animal');
      console.log(animalDetails, 'animalDetails')

      const docRef = animalCollection.doc(ownerDoc.id + index);
      

      docRef
        .set({
          age,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          console.log("uploaded child animal with id: " + docRef.id);
          const { id } = docRef;
          //upload owner's image
          console.log(image)
          const task = storage
            .child(`animal_images/${id}`)
            .put(image);
          task.on(
            "state_changed",
            function (snapshot) { },
            function (error) { },
            function () {
              task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log(
                  "uploaded the child Image with url: " + downloadURL
                );
                docRef
                  .update({
                    image: downloadURL
                  })
                  .then(() => {
                    console.log("updated the child document with image");
                    resolve(docRef);
                  });
              });
            }
          );
        });
    });
  });
}
