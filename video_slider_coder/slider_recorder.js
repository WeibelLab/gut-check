Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

var data_rows = [
    ["time", "value"],
];

var video_player = document.querySelector("video");

function checkVideo() {
    if(video_player.paused){
        return false;
    }
    else{
        return true;
    }
}

var onSliderSlide = function (slideEvt) {
    var time = video_player.currentTime;
    if(checkVideo()){
        data_rows.push([time, slideEvt.value]);
        console.log("slider slid to " + slideEvt.value + " at " + time);
    }else{
        console.log("video NOT playing");
    }
};

$("#slider").kendoSlider({
    increaseButtonTitle: "Right",
    decreaseButtonTitle: "Left",
    smallStep: 1,
    largeStep: 6,
    value: 0,
    min: -3,
    max: 3,
    slide: onSliderSlide
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
