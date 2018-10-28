var EP = {
    startingHour: 8,
    endingHour: 17,
    minutesPeriod: 59,
    notificationTitle: "Remember",
    notificationMessage: "Go and do some rest for your eyes!",
    enableSound: 'true',
    disable: false,
    disableOnWeekend: false
};

function setUp () {
    if (typeof(Storage) !== "undefined") {
        // @todo loop through EP properties
        if(localStorage.startingHour){
            EP.startingHour = localStorage.startingHour;
        }
        if(localStorage.endingHour){
            EP.endingHour = localStorage.endingHour;
        }
        if(localStorage.minutesPeriod){
            EP.minutesPeriod = localStorage.minutesPeriod;
        }
        if(localStorage.notificationTitle){
            EP.notificationTitle = localStorage.notificationTitle;
        }
        if(localStorage.notificationMessage){
            EP.notificationMessage = localStorage.notificationMessage;
        }
        if(localStorage.disable){
            EP.disable = localStorage.disable;
        }
        if(localStorage.disableOnWeekend){
            EP.disableOnWeekend = localStorage.disableOnWeekend;
        }
        if(localStorage.enableSound){
            EP.enableSound = localStorage.enableSound;
        }
    }
}

setUp();