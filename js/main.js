'use strict';
// partices = participants

var gMeetings = [];
var gPrevEl;
var gPrevButton;

createObj('Birthday',1495430506793,1495431606793,['Puki','Tuki','Zalupa']);
createObj('Funeral',1495637606793,1495638706793,['Tuki','Zalupa','Shlomo','Puki']);
createObj('Wedding',1495435206793,1495436306793,['Puki','Tuki','Zalupa']);
createObj('Circumcision',1495432406793,1495433506793,['Suki','Suzuki']);
// createObj('Circumcision',toTimeStamp('24-5-2017 8:30'),toTimeStamp('24-5-2017 9:30'),['Suki','Suzuki']);


function init() {
    sortByStart();
    renderMeetings();
};

function createObj(title,start,end,partices) {
    var meeting = {title: title, start: start, end: end, partices: partices}
    gMeetings.push(meeting);
};

//       sortByTimeStamp()
function sortByStart() {
    gMeetings.sort(function(meetingA,meetingB) {
        return (meetingA.start - meetingB.start)
    });
};

function renderMeetings() {
    var elContainer = document.querySelector('.list-group');
    
    var strHTML = '';
    gMeetings.forEach(function(meeting) {


        // var string = 
        // `
        // <div>
        //     <h1>${message}</h1>
        //     <p>${text}</p>
        // </div>
        // `;

        strHTML += '\n<a href="#" class="list-group-item" onclick="activateMeeting(this)">';
        strHTML += '\n\t<h4 class="title list-group-item-heading">' + meeting.title + '</h4>';
        strHTML += '\n\t<p class="start list-group-item-text">' + toDate(meeting.start) + '</p>';
        strHTML += '\n\t<p class="end list-group-item-text">' + toDate(meeting.end) + '</p>';
        strHTML += '\n\t<p class="partices list-group-item-text">' + meeting.partices + '</p>';
        strHTML += '\n</a>';
        elContainer.innerHTML = strHTML;
    });
};

function prepareAndRun(button) {
    
    if (gPrevButton === 'addMeeting') {
        var elDivFormAdd = document.querySelector('.add-meeting');
        elDivFormAdd.classList.add('hide'); 

    } else if (gPrevButton === 'findNext') {
        var elFindMsg = document.querySelector('#find-next-info');
        elFindMsg.classList.add('hide');

    } else if (gPrevButton === 'countFor') {
        var elDivFormCount = document.querySelector('.meetings-count-for');
        elDivFormCount.classList.add('hide');
    };

    gPrevButton = button;

    if (button === 'addMeeting') {
        var elDivFormAdd = document.querySelector('.add-meeting');
        elDivFormAdd.classList.remove('hide');

    } else if (button === 'findNext') {
        var elFindMsg = document.querySelector('#find-next-info');
        elFindMsg.classList.remove('hide');
        elFindMsg.innerText = '';
        findNextMeeting()
    } else {
        var elDivFormCount = document.querySelector('.meetings-count-for');
        elDivFormCount.classList.remove('hide');
        var elCountMsg = document.querySelector('#count-info');     
        elCountMsg.innerText = '';
    };
};

function addMeeting() {
    var elFormInputs = document.querySelectorAll('.add-meeting input');

    // not the correct syntax but it's the idea (need to give "name" attr):
    // var title = elForm.userName.value;
    // var passwotd = elForm.pass.value;

    var title = elFormInputs[0].value;
    var startDate = elFormInputs[1].value;
    var startTime = elFormInputs[2].value;
    var endDate = elFormInputs[3].value;
    var endTime = elFormInputs[4].value;
    var particesStr = elFormInputs[5].value;
    
    var start = toTimestamp(startDate,startTime);
    var end = toTimestamp(endDate,endTime);

    var partices = particesStr.split(',');

    createObj(title,start,end,partices);
    sortByStart();
    renderMeetings();

    var elFormAdd = document.querySelector('.add-meeting > form');
    elFormAdd.reset();
};

function findNextMeeting() {

    var timeNow = Date.now();
    var idx = gMeetings.findIndex(function(meeting) {
        return (meeting.start > timeNow);
    });
    if (idx === -1) {
        var elResultMsg = document.querySelector('#find-next-info');
        elResultMsg.innerText = 'Next meeting not found';
        return;
    };
    var elByIdx = document.querySelectorAll('.list-group-item')[idx];
    activateMeeting(elByIdx);
};

function getMeetingsCountFor() {

    var elNameInput = document.querySelector('#input-name');
    var name = elNameInput.value;
    elNameInput.value = '';

    var counter = 0;
    gMeetings.forEach(function(meeting) {
        if (meeting.partices.includes(name)) {
            counter++;
        };
    });
    var elResultMsg = document.querySelector('#count-info');
    elResultMsg.innerText = name + ' participates in ' + counter + ' meetings';
};

// elMeeting
function activateMeeting(el) {
    if (gPrevEl) {
        gPrevEl.classList.remove('active');
    };
    el.classList.add('active');
    gPrevEl = el;
};

function toDate(timestamp) {
    return moment(timestamp).format("DD/MM/YYYY H:mm");
};

function toTimestamp(date, time) {
    return (moment(date + ' ' + time).unix())*1000;
};

// elSidebar
function openMenu(el) {
    el.parentElement.classList.toggle('opened');

    var elDivMenu = document.querySelector('.menu');
    elDivMenu.classList.toggle('hide');
};
