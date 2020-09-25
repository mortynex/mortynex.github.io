import { openDB } from 'https://unpkg.com/idb?module';
let db;

(async ()=>{
    db = openDB("noteBook",2,{
        upgrade(db){
            const notes = db.createObjectStore("notes",{keyPath:"id",autoIncrement: true})
            notes.createIndex('index', 'id');
        }
    })
})();





export async function getNote (id){
    let d = await db;
    let transaction = await d.transaction('notes');
    let notes = transaction.objectStore("notes")
    let index = notes.index("index");
    let promise = id === true ? index.getAll() : index.get(id); 
    return await promise;
}

export async function addNote (title,content,color,liked,id){
    let d = await db;
    let transaction = await d.transaction('notes', 'readwrite');
    let notes = transaction.objectStore('notes');
    let obj = id ? {title,content,color,liked,id} : {title,content,color,liked};
    try{
        let d = await notes.put(obj);
        return d;
    }catch(err){
        return err;
    }
}
export async function deleteNote(id){
    let d = await db;
    let transaction = await d.transaction('notes',"readwrite");
    let notes = transaction.objectStore("notes")
    if(!id) return null;
    await notes.delete(id);
    return true;
}