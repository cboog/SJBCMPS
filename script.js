document.addEventListener("DOMContentLoaded", () => {
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

        // Place marker-1 at 34% x, 26% y
        updateMarker("marker-1", 34, 26, mapWidth, mapHeight);
    };
});
