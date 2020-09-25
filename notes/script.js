import {getNote,deleteNote, addNote} from "./DB.js";
import {html, render} from 'https://unpkg.com/lit-html?module';

document.querySelector("#newBtn").addEventListener("click",()=>{
    window.location.href = `${window.location.origin}/notes/note/edit?edit=true`;
});

function multi(query,callback){
    document.querySelectorAll(query).forEach(ele=>{
        ele.addEventListener("click",callback)
    })
}
let notes = [];

function reRender(arr){
    console.log("Renred")
    const container = document.querySelector(".noteContainer")
    render(html`${arr.map(n=>html`<div class="note">
        <div class="noteTop" data-id=${n.id}>
            <h5 id="titleClick" title="${n.title}" class="noteTitle">${n.title}</h5>
            <div class="iconContainer">
                <i id="del" title="Delete" class="fas fa-trash"></i>
                <i id="edit" title="Edit" class="fas fa-pen"></i>
                <i id="like" title="Pin" class="${n.liked ? "fas" : "far"} fa-heart"></i> 
            </div>
        </div>
        <p class="noteDesc">
            ${n.content}
        </p>
    </div>`)}`,container)
}

async function init(){
    notes = await getNote(true);
    notes = notes.filter(obj=>{
        return typeof obj === "object" && obj.hasOwnProperty("title")  && obj.hasOwnProperty("content")  && obj.hasOwnProperty("liked")  && obj.hasOwnProperty("color")
     }).map(obj=>{
        obj.content = obj.content.substring(0,500);
        return obj
    })
    notes.sort((a,b)=>b?.liked - a?.liked);
    reRender(notes);
}

(async ()=>{
    await init();

    document.querySelectorAll("#titleClick").forEach(title=>{
        title.addEventListener("click",()=>{
            window.location.href = `${window.location.origin}/notes/note/edit?id=${title.parentNode.dataset.id}`;
        })
    })
    multi("#edit",(e)=>{
        window.location.href = `${window.location.origin}/notes/note/edit?edit=true&id=${e.target.parentNode.parentNode.dataset.id}`;
    })
    multi("#del",async (e)=>{
        let id = +e.target.parentNode.parentNode.dataset.id;
        if(!id) return;
        let res = await deleteNote(id);
        if(res){
            window.location.reload();
        }
        else{
            console.log(res)
            alert("Ops, something went wrong")
        }
    })
    multi("#like",async (e)=>{
        let id = +e.target.parentNode.parentNode.dataset.id;
        let obj = await getNote(id);
        obj.liked = obj.liked ? false : true;
        await addNote(obj.title,obj.content,obj.color,obj.liked,obj.id);
        await init();
    })
})()
document.querySelector("#searchBox").addEventListener("input",(e)=>{
    const value = e.target.value.toLowerCase();
    if(value.length < 3) return reRender(notes);
    const filtred = notes.filter(n=>n.title.toLowerCase().includes(value));
    reRender(filtred)
})
