
let hdvisble;
let hd;
window.onload = function(){
    let textbox = document.getElementById("editor");
    window.onfocus = function() { 
        if(localStorage.blackmode == "true"){
            textbox.classList.add("inverted");
        }
        if(localStorage.blackmode == "false"){
            textbox.classList.remove("inverted");
        }
    };
}
window.addEventListener("load",()=>{
    let textbox = document.getElementById("editor");
    hd = document.getElementById("hd");
    let text = localStorage.npcontent;
    hdvisble = localStorage.getItem('nphdvisible');
    if(!hdvisble){
        console.log("Accountedssssssaew");
        localStorage.nphdvisible = false;
        hdvisble = false;
    }
    if(text){
        console.log("Content Loaded");
        textbox.value = text;
    }
    else{
        console.log("Nothing Saved");
    }
    if(hdvisble =="true"){
        console.log("Accountedsss");
        hd.style.display = "block";
    }
    else if(hdvisble=="false"){
        console.log("Accounted");
        hd.style.display = "none";
    }
    if(localStorage.blackmode == "true"){
        textbox.classList.add("inverted");
    }
    textbox.addEventListener("keyup",()=>{
        localStorage.npcontent = textbox.value;
        text = textbox.value;
    });
});
function toggleHeader(){
    if(hdvisble){
        localStorage.nphdvisible = false;
        hdvisble = false;
        hd.style.display = "none";
    }
    else{
        localStorage.nphdvisible = true;
        hdvisble = true;
        hd.style.display = "block";
    }
}
document.addEventListener("keyup",event => {
    console.log("Toggled");
    if(event.key == "Escape"){
        toggleHeader();
        console.log("Toggled");
    }
});