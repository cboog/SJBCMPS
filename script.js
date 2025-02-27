document.addEventListener("DOMContentLoaded", () => {
    // ... (Your existing fetchEvents and addEventButton code) ...

    function updateMarker(markerId, xPercent, yPercent) {
        const marker = document.getElementById(markerId);
        if (marker) {
            marker.style.left = `${xPercent}%`;
            marker.style.top = `${yPercent}%`;
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

    fetchEvents(); // Initial event list load
});
