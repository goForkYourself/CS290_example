apiURL = 'https://api.github.com/repos/';
user = 'goForkYourself/';
myRepo = 'CS290_example/';

function getRequest(payload, func){
    var req = new XMLHttpRequest();
    req.open('GET', payload, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        func(response);
      } else {
        func(null);
      }});
    req.send(null);
}

document.getElementById('getAllIssues').addEventListener('click', function(event){
    var url = apiURL + user + myRepo + 'issues';
    getRequest(url, addIssues);
    event.preventDefault();
});

document.getElementById('getOneIssue').addEventListener('click', function(event){
    var num = document.getElementById('enteredIssueNum').value;
    if(num < 1){ alert('Please enter a value greater than 0.');}
    if(num != null && num > 0){
        var url = apiURL + user + myRepo + 'issues/' + num;
        getRequest(url, addSingleIssue);
    }
    event.preventDefault();
});

function addSingleIssue(issue){
    clearNode('singleIssue');
    var issueElem = document.getElementById('singleIssue');
    if(issue === null){
        issueElem.innerHTML = 'The specified issue was not found.'
    } else{
        issueElem.appendChild(createIssueNode(issue));
    }
}

function createIssueNode(issue){
    var issueElem = document.createElement('div');
        
    var issueNum = document.createElement('h3');
    issueNum.innerHTML = 'Issue Number ' + issue.number;
    issueElem.appendChild(issueNum);

    var issueBody = document.createElement('div');
    issueBody.innerHTML = 'Issue Body: ' + issue.body;
    issueElem.appendChild(issueBody);

    var issueState = document.createElement('div');
    issueState.innerHTML = 'Issue State: ' + issue.state;
    issueElem.appendChild(issueState);
    
    var issuemilestone = document.createElement('div');
    issuemilestone.innerHTML = 'Issue Milestone: ' + issue.milestone;
    issueElem.appendChild(issuemilestone);
    return issueElem;
}

function addIssues(issues){
    clearNode('allIssues');
    var issuesElem = document.getElementById('allIssues');
    issues.reverse().forEach(function (issue, i) {
        issuesElem.appendChild(createIssueNode(issue));
        issuesElem.appendChild(document.createElement('br'));
    });
    if(issues.length == 0){
        var issueElem = document.createElement('div');
        issueElem.innerHTML = 'There are no issues for this repository.';
        issuesElem.appendChild(issueElem);
    }
}

function clearNode(elementId){
    var node = document.getElementById(elementId);
    while (node.firstChild) {
        node.removeChild(node.firstChild);  
    }
}