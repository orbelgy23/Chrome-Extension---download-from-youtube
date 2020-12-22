
var checker = 0;
var videos_itags = [];
var videos_urls = [];
var videos_types = [];
var videoUrls


//create the urls from youtube database
window.onload = function(){
videoUrls = window.ytplayer.config.args.raw_player_response.streamingData.adaptiveFormats;

    for (i in videoUrls){
        videos_itags.splice(i,0,videoUrls[i]["quality"]);
        if(videoUrls[i]["url"] != undefined){                   //regular url in adaptiveFormats
            videos_urls.splice(i,0,videoUrls[i]["url"]);
        }
        else{                                                   //url in signatureCipher 
            var y = videoUrls[i]["signatureCipher"].split("=")[3];
            //console.log("cipher link = " , y);
            videos_urls.splice(i,0,y); 
        }
        videos_types.splice(i, 0, videoUrls[i]["mimeType"]);
    }
}






//create download button 
var container = document.getElementById("center");
var btn = document.createElement("button");
btn.className = "my_button";
btn.setAttribute("type","button");
btn.innerText = "Download";
container.appendChild(btn); 

//create the drop menu
var droper = document.createElement("div");
droper.id = "download_drop_menu";
container.appendChild(droper); 

var drop_menu_ul = document.createElement("ul");
drop_menu_ul.id = "drop_menu_ul";
droper.appendChild(drop_menu_ul);




//function that makes drop menu appear when download button is clicked
function downloadVideo(){

    //add the download options to the drop menu - happens once 
    if(checker === 0){ 
        for (var i=0 ;i < videos_itags.length;i++){ 
            var item = document.createElement("a");
            item.href = videos_urls[i];
            var ext = videos_types[i].split("/")[1].split(";")[0];
            item.innerText = videos_itags[i] + " (" + ext + ")";
            item.addEventListener("click",DownloadURL);
            drop_menu_ul.appendChild(item);
        }
    }
    checker = 1;


    //clicking on the download button makes the drop menu appears or disappears
    var x = document.getElementById("download_drop_menu");
    if(x.className.indexOf("download_drop_menu_shown") > -1){
        x.classList.remove("download_drop_menu_shown");
    }
    else{
        x.classList.add("download_drop_menu_shown");
    }

    var data = {"type":"download clicked"};
    window.postMessage(data,"*");

} 




// click the download button then the drop menu appears or disappears
btn.addEventListener("click", downloadVideo)      




//choose any video quality from the drop menu that you want to download
function DownloadURL(event){
    event.preventDefault();
    event.stopPropagation();
    console.log("event=", event);

    var url = event.target.getAttribute("href");
    //console.log("you clicked on url ==", event.target.getAttribute("href"));
    var name = event.target.innerText;
    //console.log("name=", event.target.innerText);
    var data = {url:url, name:name, sender:"YTDL"};
    window.postMessage(data,"*");

    var x = document.getElementById("download_drop_menu");
    if(x.className.indexOf("download_drop_menu_shown") > -1){
        x.classList.remove("download_drop_menu_shown");
    }
    else{
        x.classList.add("download_drop_menu_shown");
    }
    return false;
}
