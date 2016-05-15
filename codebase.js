apiURL = 'https://api.github.com/repos/';
user = 'goForkYourself/';
myRepo = 'CS290_example/';

function getRequest(payload, func){
    var req = new XMLHttpRequest();
    req.open('GET', payload, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        //console.log(req.responseText);
        var response = JSON.parse(req.responseText);
        func(response);
      } else {
        func(null);
      }});
    req.send(null);
    event.preventDefault();
}

document.getElementById('getOneFile').addEventListener('click', function(event){
    var filePath = document.getElementById('filename').value; 
    if(filePath === null){
        alert('Please enter a file path.');
    } else{
        var url = apiURL+user+myRepo+'contents/' + filePath;
        getRequest(url, getSingleFile);
    }
});

function getSingleFile(file){
    clearNode('singleFile');
    var fileElem = document.getElementById('singleFile'); 
    if(file === null){
        file.innerHTML = 'The specified file was not found.'
    } else{
        console.log(file.content);
        fileElem.appendChild(createFileNode(file));        
    }   
}

function createFileNode(file){
    var fileNode = document.createElement('div');
    console.log(file.size);
    var fSize = document.createElement('div');
    fSize.innerHTML = 'File size: ' + file.size;
    fileNode.appendChild(fSize);
    
    // TODO: NOT DONE
    // var txt = downloadFileContents(file.download_url);
    // if(txt === null){ return; }
    
    var pre = document.createElement('pre');
    var code = document.createElement('code');
    code.innerHTML = atob(file.content);//.toString('utf8'); 
    
    pre.appendChild(code);
    fileNode.appendChild(pre);
    return pre;
}

/* SOURCE: http://stackoverflow.com/questions/6375461/get-html-code-using-javascript-with-a-url  */ 
function makeHttpObject() {
        try {return new XMLHttpRequest();}
        catch (error) {}
        try {return new ActiveXObject("Msxml2.XMLHTTP");}
        catch (error) {}
        try {return new ActiveXObject("Microsoft.XMLHTTP");}
        catch (error) {}

        throw new Error("Could not create HTTP request object.");
}
/* SOURCE: http://stackoverflow.com/questions/6375461/get-html-code-using-javascript-with-a-url  */ 
function downloadFileContents(url){
    var request = makeHttpObject();
    request.open("GET", "your_url", false);
    request.send(null);
    request.onreadystatechange = function() {
    if (request.readyState == 4)
        // TODO: Not Done
        alert(request.responseText);
    };
}
//   2hwCS381/MiniLogo.schallee.hs