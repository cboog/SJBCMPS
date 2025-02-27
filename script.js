document.addEventListener("DOMContentLoaded", () => {
    const addEventButton = document.getElementById("add-event-button");
    const eventList = document.getElementById("events");

    function fetchEvents() {
        fetch("/events")
            .then(response => response.json())
            .then(events => {
                eventList.innerHTML = ""; // Clear existing list
                events.forEach(event => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${event.eventName} - ${event.eventHour}:${event.eventMinute} ${event.eventPeriod} at ${event.location}`;

                    const marker = document.getElementById(event.location);
                    if (marker){
                        marker.setAttribute("data-visible", "true");
                        const eventText = document.createElement("div");
                        eventText.classList.add("event-text");
                        eventText.textContent = `${event.eventName} - ${event.eventHour}:${event.eventMinute} ${event.eventPeriod}`;
                        marker.appendChild(eventText);
                    }

                    eventList.appendChild(listItem);
                });
            });
    }

    addEventButton.addEventListener("click", () => {
        const location = document.getElementById("event-location").value;
        const eventName = document.getElementById("event-name").value.trim();
        const eventHour = document.getElementById("event-hour").value;
        const eventMinute = document.getElementById("event-minute").value;
        const eventPeriod = document.getElementById("event-period").value;

        if (!eventName || !eventHour || !eventMinute) {
            alert("Please fill in all event details.");
            return;
        }

        fetch("/addevent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                location,
                eventName,
                eventHour,
                eventMinute,
                eventPeriod,
            }),
        })
            .then(response => {
                if (response.ok) {
                    fetchEvents(); // Refresh the event list
                } else {
                    alert("Failed to add event.");
                }
            });
    });

    fetchEvents(); // Initial event list load
});

function updateMarker(markerId, xPercent, yPercent) {
    const marker = document.getElementById(markerId);
    if (marker) {
        marker.style.left = `${xPercent}%`;
        marker.style.top = `${yPercent}%`;
        marker.setAttribute("data-visible", "true");
    }
}

updateMarker("marker-1", 34, 26);
updateMarker("marker-2", 57, 51);
updateMarker("marker-3", 80, 23);
updateMarker("marker-4", 57, 45);
updateMarker("marker-5", 80, 80);
updateMarker("marker-6", 34, 67);
updateMarker("marker-7", 54, 67);
updateMarker("marker-8", 34, 50);
updateMarker("marker-9", 45, 76);
updateMarker("marker-10", 34, 76);
updateMarker("marker-11", 12, 65);
