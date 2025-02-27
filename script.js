// Initialize the static map with a fixed image
const map = L.map('map', {
    crs: L.CRS.Simple, // Simple coordinate system for images
    zoomControl: false, // Disable zoom controls
    dragging: false, // Prevent movement
    scrollWheelZoom: false, // Disable zooming with scroll
    doubleClickZoom: false, // Disable double-click zoom
    touchZoom: false, // Disable pinch zoom
});

// Define the image bounds – Adjust if needed
const imageWidth = 2000; // Adjust based on the actual image
const imageHeight = 1333; // Adjust based on the actual image
const bounds = [[0, 0], [imageHeight, imageWidth]];

// Add the campus map image as an overlay
L.imageOverlay(
    'https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_2/v1661938386/bosco/gj9ncox3wdkzh3cbmn6m/Campus-MAP.jpg',
    bounds
).addTo(map);

map.fitBounds(bounds); // Center and scale the map
