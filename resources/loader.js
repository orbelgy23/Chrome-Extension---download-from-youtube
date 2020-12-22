
s= document.createElement("script");
s.src = chrome.extension.getURL("resources/code.js");

s.onload = function(){
    this.remove();
}

document.head.appendChild(s);



window.addEventListener("message",function(e){

    chrome.runtime.sendMessage({"name":e.data.name , "url":e.data.url} ,function(res){
        console.log("res = " ,res);

    })

})