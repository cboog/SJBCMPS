// Initialize the map
const map = L.map('map', {
    crs: L.CRS.Simple,  // Simple coordinate system for an image
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    touchZoom: false
});

// Define the image bounds
const imageWidth = 2000;  // Adjust to match the real image size
const imageHeight = 1333; // Adjust to match the real image size
const bounds = [[0, 0], [imageHeight, imageWidth]];

// Add the static image overlay
L.imageOverlay(
    'https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_2/v1661938386/bosco/gj9ncox3wdkzh3cbmn6m/Campus-MAP.jpg',
    bounds
).addTo(map);

// Fit the map to the bounds
map.fitB
