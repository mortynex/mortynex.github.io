import {getNote,deleteNote, addNote} from "./DB.js";
import {html, render} from 'https://unpkg.com/lit-html?module';

let notes = [];
const container = document.querySelector(".noteContainer")
const regex = (value) => new RegExp(value,"gi");

function QueryEventListenerAll(query,callback){
    document.querySelectorAll(query).forEach(ele=>{
        ele.addEventListener("click",callback)
    })
}

function renderNotess(arr,value){
    let content = [...arr].map(n=>{
        const title = n.title.replace(regex(value),`<span class='hl'>$&</span>`);
        return `<div class="note">
                <div class="noteTop" data-id=${n.id}>
                    <h5 id="titleClick" title="${n.title}" class="noteTitle">${title}</h5>
                    <div class="iconContainer">
                        <i id="del" title="Delete" class="fas fa-trash"></i>
                        <i id="edit" title="Edit" class="fas fa-pen"></i>
                        <i id="like" title="Pin" class="${n.liked ? "fas" : "far"} fa-heart"></i> 
                    </div>
                </div>
                <p class="noteDesc">
                    ${n.content}
                </p>
            </div>`
        })
        .join("");
    container.innerHTML = content;
}
function renderNotes(arr,value){
    const frag = function(string = '') {
        return document.implementation
          .createHTMLDocument()
          .createRange()
          .createContextualFragment(string)
    }
    const reg = (value) ? regex(value) : undefined;
    const content = [...arr].map(n=>{
        const title = n.title.replace(reg,`<span class='hl'>$&</span>`);
        return html`
            <div class="note">
                <div class="noteTop" data-id=${n.id}>
                    <h5 id="titleClick" title="${n.title}" class="noteTitle">${frag(title)}</h5>
                    <div class="iconContainer">
                        <i id="del" title="Delete" class="fas fa-trash"></i>
                        <i id="edit" title="Edit" class="fas fa-pen"></i>
                        <i id="like" title="Pin" class="${n.liked ? "fas" : "far"} fa-heart"></i> 
                    </div>
                </div>
                <p class="noteDesc">
                    ${n.content}
                </p>
            </div>`
    })
    render(content,container);
}
async function init(){
    notes = await getNote(true);
    notes = notes.filter(obj=>{
        return typeof obj === "object" && obj.hasOwnProperty("title")  && obj.hasOwnProperty("content")  && obj.hasOwnProperty("liked")  && obj.hasOwnProperty("color")
     }).map(obj=>{
        obj.content = obj.content.substring(0,500);
        return obj
    })
    //notes.sort((a,b)=>b?.liked - a?.liked);
    renderNotes(notes);

    document.querySelectorAll("#titleClick").forEach(title=>{
        title.addEventListener("click",()=>{
            window.location.href = `${window.location.origin}/notes/note?id=${title.parentNode.dataset.id}`;
        })
    })
    QueryEventListenerAll("#edit",(e)=>{
        window.location.href = `${window.location.origin}/notes/note?id=${e.target.parentNode.parentNode.dataset.id}&edit`;
    })
    QueryEventListenerAll("#del", async (e)=>{
        let id = +e.target.parentNode.parentNode.dataset.id;
        if(!id) return;
        const conf = window.confirm(`Do you really want to delete note "${notes.find(n=>n.id===id)?.title}"?`)
        if(!conf) return
        let res = await deleteNote(id);
        if(res){
            await init();
        }
        else{
            console.log(res)
            alert("Ops, something went wrong")
        }
    })
    QueryEventListenerAll("#like", async (e)=>{
        let id = +e.target.parentNode.parentNode.dataset.id;
        let obj = await getNote(id);
        obj.liked = obj.liked ? false : true;
        await addNote(obj.title,obj.content,obj.color,obj.liked,obj.id);
        await init();
    })
}

(async ()=>{
    await init();
})()

document.querySelector("#newBtn").addEventListener("click",()=>{
    window.location.href = `${window.location.origin}/notes/note?new`;
});

document.querySelector("#searchBox").addEventListener("input",(e)=>{
    const value = e.target.value;
    const filtredArray = [...notes].filter(note => regex(value).test(note.title))
    renderNotes(filtredArray,value)
})
