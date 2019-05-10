import idb from 'idb';
export default function dbStore(name) {

  const uploadsDB = idb.open('image-uploads', 1, upgradeDB => {
    upgradeDB.createObjectStore(name);
  });

  return {
    get(key) {
      return uploadsDB.then(db => {
        return db.transaction(name)
          .objectStore(name).get(key);
      });
    },
    set(key, val) {
      return uploadsDB.then(db => {
        const tx = db.transaction(name, 'readwrite');
        tx.objectStore(name).put(val, key);
        return tx.complete;
      });
    },
    delete(key) {
      return uploadsDB.then(db => {
        const tx = db.transaction(name, 'readwrite');
        tx.objectStore(name).delete(key);
        return tx.complete;
      });
    },
    clear() {
      return uploadsDB.then(db => {
        const tx = db.transaction(name, 'readwrite');
        tx.objectStore(name).clear();
        return tx.complete;
      });
    },
    keys() {
      return uploadsDB.then(db => {
        const tx = db.transaction(name);
        const keys = [];
        const store = tx.objectStore(name);

        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // openKeyCursor isn't supported by Safari, so we fall back
        (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
          if (!cursor) return;
          keys.push(cursor.key);
          cursor.continue();
        });

        return tx.complete.then(() => keys);
      });
    }
  }
}
