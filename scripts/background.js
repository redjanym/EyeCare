chrome.runtime.getBackgroundPage(function (backgroundPage) {
    var keepSendingNotifications = true;

    var notification = new Notify(EP.notificationTitle, {
        body: EP.notificationMessage,
        icon: "images/icon128.png",
        timeout: 2,
        notifyClick: stopSendingNotifications
    });

    function doNotification() {
        audioNotification();
        notification.show();
    }

    function stopSendingNotifications() {
        keepSendingNotifications = false;
    }

    function audioNotification() {
        if(EP.enableSound == false){
            return;
        }

        var sound = new Audio('sound.mp3');
        sound.volume = 0.2;
        sound.play();
    }

    function itsTime() {
        var date = new Date();
        var hour = date.getHours();
        var minutes = date.getMinutes();

        return hour >= EP.startingHour && hour <= EP.endingHour && minutes % EP.minutesPeriod === 0
    }

    function isWeekend() {
        var date = new Date();
        return date.getDay() == 6 || date.getDay() == 0;
    }

    // Check the time
    setInterval(function () {
        if (itsTime() && keepSendingNotifications && ( EP.disable === 'false' || EP.disable === false ) && ( ( EP.disableOnWeekend === 'true' || EP.disableOnWeekend === true ) && isWeekend()) == false) {
            doNotification();
        } else if (!itsTime()) {
            keepSendingNotifications = true;
        }
        
        console.log(EP);
    }, 5000);
});