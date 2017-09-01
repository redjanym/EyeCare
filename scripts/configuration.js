// Config Time Settings

function showErrorMessage(message) {
    $('#error').show();
    $('#error > p').html(message);
}
function hideErrorMessage() {
    $('#error').hide();
    $('#error > p').html('');
}

$(document).ready(function () {
    var backgroundPage = chrome.extension.getBackgroundPage();

// Get elements
    var startingHourInput = $('#starting-hour');
    var endingHourInput = $('#ending-hour');
    var period30Input = $('#30min');
    var period59Input = $('#59min');
    var notificationMessageInput = $('#message');
    var disableOnWeekendInput = $('#disable-on-weekend');
    var disableInput = $('#disable-always');
    var enableSoundInput = $('#enable-sound');

    var options = '';
    for (var i = 1; i <= 24; i++) {
        options += '<option value="' + i + '">' + i + '</option>';
    }
    startingHourInput.html(options);
    endingHourInput.html(options);

// Populate form
    startingHourInput.val(Number(EP.startingHour) + 1).change();
    endingHourInput.val(Number(EP.endingHour) + 1).change();
    $('#' + EP.minutesPeriod + 'min').prop('checked', true);
    notificationMessageInput.val(EP.notificationMessage);
    disableOnWeekendInput.prop('checked', EP.disableOnWeekend == 'true');
    disableInput.prop('checked', EP.disable == 'true');
    enableSoundInput.prop('checked', EP.enableSound == 'true');

    if (EP.disable == 'true') {
        $('#overlay').show();
    }

// Listen for changes
    startingHourInput.change(function () {
        if (Number(startingHourInput.val()) >= Number(endingHourInput.val())) {
            startingHourInput.val(Number(endingHourInput.val()) - 1);
            EP.startingHour = Number(endingHourInput.val()) - 1;
            localStorage.startingHour = Number(startingHourInput.val()) - 1;

            showErrorMessage('Starting hour must be lower then Ending hour!');
            return;
        } else {
            hideErrorMessage();
        }

        EP.startingHour = Number(startingHourInput.val()) - 1;
        localStorage.startingHour = Number(startingHourInput.val()) - 1;
        backgroundPage.setUp();
    });

    endingHourInput.change(function () {
        if (Number(endingHourInput.val()) <= Number(startingHourInput.val())) {
            endingHourInput.val(Number(startingHourInput.val()) + 1);
            EP.endingHour = Number(startingHourInput.val());
            localStorage.endingHour = Number(startingHourInput.val());

            showErrorMessage('Ending hour must be bigger then Starting hour!');
            return;
        } else {
            hideErrorMessage();
        }

        EP.endingHour = Number(endingHourInput.val()) - 1;
        localStorage.endingHour = Number(endingHourInput.val()) - 1;
        backgroundPage.setUp();
    });

    period30Input.click(function () {
        if (this.checked == true) {
            EP.minutesPeriod = 30;
            localStorage.minutesPeriod = 30;
            $('#59min').prop('checked', false);
        } else {
            EP.minutesPeriod = 59;
            localStorage.minutesPeriod = 59;
            $('#59min').prop('checked', true);
        }

        backgroundPage.setUp();
    });

    period59Input.click(function () {
        if (this.checked == true) {
            EP.minutesPeriod = 59;
            localStorage.minutesPeriod = 59;
            $('#30min').prop('checked', false);
        } else {
            EP.minutesPeriod = 30;
            localStorage.minutesPeriod = 30;
            $('#30min').prop('checked', true);
        }

        backgroundPage.setUp();
    });

    notificationMessageInput.keyup(function () {
        var value = this.value;

        if(value.length == 0){
            showErrorMessage('Notification message must not be empty!');
            return;
        }

        EP.notificationMessage = value;
        localStorage.notificationMessage = value;

        backgroundPage.setUp();
    });

    disableOnWeekendInput.click(function () {
        EP.disableOnWeekend = this.checked;
        localStorage.disableOnWeekend = this.checked;

        backgroundPage.setUp();
    });

    disableInput.click(function () {
        EP.disable = this.checked;
        localStorage.disable = this.checked;

        if (this.checked == true) {
            $('#overlay').show();
        } else {
            $('#overlay').hide();
        }

        backgroundPage.setUp();
    });

    enableSoundInput.click(function () {
        EP.enableSound = this.checked;
        localStorage.enableSound = this.checked;

        backgroundPage.setUp();
    });
});



