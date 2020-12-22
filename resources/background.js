
chrome.runtime.onMessage.addListener(function(request,sender,callback){
    console.log("recieved" , request);

    var ext = request.name.split(" ")[1].split("(")[1].split(")")[0];
    console.log("test final = ", ext);
    var prefix = request.name.split(" ")[0];
    var fn = prefix + "." + ext;
    console.log("fn = ", fn);

    chrome.downloads.download({url:request.url, filename:fn});

})

