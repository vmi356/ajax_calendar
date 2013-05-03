$(function() {
    var calendar = $("#calendar").fullCalendar({
        dayClick: function(date, allDay, jsEvent, view) {

            var title = prompt("Enter event name"),
                event_data = {
                    title: title,
                    start: date,
                    duration: 60
                };

            $.ajax("/events/api/v1/event/", {
                type: 'post',
                data: JSON.stringify(event_data),
                contentType: 'application/json'
            })
                .success(function() {
                    calendar.fullCalendar('renderEvent', event_data);
                })
                .error(function(data) {
                    var err = $.parseJSON(data.responseText);
                    console.log(err.error_message);
                    err.traceback.split('\n').forEach(function(line) {
                        console.log(line);
                    })

                })

        }
    });

    $.ajax("/events/api/v1/event/").success(function(data) {
        data.objects.forEach(function(ev) {
            calendar.fullCalendar('renderEvent', ev);
        });

    });
});
