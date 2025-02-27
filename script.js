document.addEventListener("DOMContentLoaded", () => {
    // ... (Your existing fetchEvents and addEventButton code) ...

    function updateMarker(markerId, xPercent, yPercent, mapWidth, mapHeight) {
        const marker = document.getElementById(markerId);
        if (marker) {
            const left = (xPercent / 100) * mapWidth;
            const top = (yPercent / 100) * mapHeight;
            marker.style.left = `${left}px`;
            marker.style.top = `${top}px`;
        }
    }

    const mapImage = document.querySelector(".map-container img");
    mapImage.onload = function() {
        const mapWidth = mapImage.offsetWidth;
        const mapHeight = mapImage.offsetHeight;

        updateMarker("marker-1", 34, 26, mapWidth, mapHeight);
        updateMarker("marker-2", 57, 51, mapWidth, mapHeight);
        updateMarker("marker-3", 80, 23, mapWidth, mapHeight);
        updateMarker("marker-4", 57, 45, mapWidth, mapHeight);
        updateMarker("marker-5", 80, 80, mapWidth, mapHeight);
        updateMarker("marker-6", 34, 67, mapWidth, mapHeight);
        updateMarker("marker-7", 54, 67, mapWidth, mapHeight);
        updateMarker("marker-8", 34, 50, mapWidth, mapHeight);
        updateMarker("marker-9", 45, 76, mapWidth, mapHeight);
        updateMarker("marker-10", 34, 76, mapWidth, mapHeight);
        updateMarker("marker-11", 12, 65, mapWidth, mapHeight);
    };

    fetchEvents(); // Initial event list load
});
