import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  const jateDb = await openDB('jate', 1);
  const trx = jateDb.transaction('jate', 'readwrite');
  const store = trx.objectStore('jate');
  const req = store.add({id: 1, value: content});
  const res = await req;
  console.log('data has been saved to the database!', res);
}
// console.error('putDb not implemented'); do i need this?

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const trx = jateDb.transaction('jate', 'readonly');
  const store = trx.objectStore('jate'
  );
  const req = store.get(1);
  const res = await req;
  console.log('res', res);
  return res;
}
//  console.error('getDb not implemented');

initdb();
