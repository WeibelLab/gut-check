Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

var data_rows = [
    ["time", "value"],
];

var video_player = document.querySelector("video");
var affect_face_p = document.getElementById("affect_face");

function checkVideo() {
    if(video_player.paused){
        return false;
    }
    else{
        return true;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showFace(val) {
    if(val == 1){
        affect_face_p.innerHTML = "&#128512;";
        await sleep(1000);
        affect_face_p.innerHTML = "";
    }else if(val == -1){
        affect_face_p.innerHTML = "&#128533;";
        await sleep(1000);
        affect_face_p.innerHTML = "";
    }
}

function sliderOnKeypress(keyEvt) {
    var time = video_player.currentTime;
    if(video_player.readyState != 4){
        console.log("video NOT loaded");
    }
    else if(checkVideo()) {
        data_rows.push([time, keyEvt]);
        showFace(keyEvt);
        console.log("pressed " + keyEvt + " at " + time);
    }else{
        console.log("video NOT playing");
    }
}

function sliderOnSlide(slideEvt) {
    var time = video_player.currentTime;
    if(video_player.readyState != 4){
        console.log("video NOT loaded");
    }
    else if(checkVideo()) {
        data_rows.push([time, slideEvt.value]);
        console.log("slider slid to " + slideEvt.value + " at " + time);
    }else{
        console.log("video NOT playing");
    }
};

function sliderOnChange(changeEvt) {
    var time = video_player.currentTime;
    if(video_player.readyState != 4){
        console.log("video NOT loaded");
    }
    else if(checkVideo()){
        data_rows.push([time, changeEvt.value]);
        console.log("slider changed to " + changeEvt.value + " at " + time);
    }else{
        console.log("video NOT playing");
    }
}

$("#slider").kendoSlider({
    increaseButtonTitle: "Right",
    decreaseButtonTitle: "Left",
    smallStep: 1,
    largeStep: 6,
    value: 0,
    min: -3,
    max: 3,
    slide: sliderOnSlide,
    change: sliderOnChange
});

function downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8," 
    + data_rows.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "video_slider_data.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        sliderOnKeypress(1);
    }
    else if (e.keyCode == '40') {
        // down arrow
        sliderOnKeypress(-1);
    }

}