import {getNote,addNote} from "../../DB.js";

const params = new URLSearchParams(window.location.search);
const noteId = +params.get("id");
const editMode = params.get("edit") === "true" ? true : false;

if(editMode){
    document.querySelectorAll("#dis").forEach(node=>{
        node.removeAttribute("readonly");
    });
    
}
document.querySelector(".editMode").style.display = editMode ? "block" : "none";
document.querySelector(".lookMode").style.display = editMode ? "none" : "block";

const noteContent = document.querySelector(".noteContent");
const noteTitle = document.querySelector(".noteTitle");


(async()=>{
    if(noteId && noteId !== 0){
        let note = await getNote(noteId);
        if(!note){alert("Couldnt load your note :/")};
        const {content, title} = note;
        noteContent.value = content;
        noteTitle.value = title;
        document.title = title;
    }
    else{
        document.title = "New Note";
    }
})()
const goHome = () =>  window.location.href = window.location.origin + "/notes/";
document.querySelector("#okBtn").addEventListener("click",()=>{
    goHome();
})
document.querySelector("#editBtn").addEventListener("click",()=>{
    window.location.href = `${window.location.origin}/notes/note/edit.html?edit=true&id=${noteId}`;
})
document.querySelector("#saveBtn").addEventListener("click",async e=>{
    const title = noteTitle.value;
    const cont = noteContent.value;
    if(!title || !cont) {
        alert(`Couldnt save your note, your note's ${!title ? "title" : "content"} is empty!`);
        return;
    }
    let id = undefined;
    if(typeof noteId === "number" && !isNaN(noteId)) id = noteId;
    const note = await addNote(title,cont,"white",false,id);
    goHome();
});
document.querySelector("#cancelBtn").addEventListener("click",e=>{
    
    if((!noteTitle.value && (!noteContent.value || noteContent.value === "New Note")) || confirm("Are you sure?")){
        goHome();
    }
});