export const baseUrl = 'http://127.0.0.1:8000/'

// internal
export const fetchRoads = `${baseUrl}roads/api/list/`
export const fetchRoutes = `${baseUrl}roads/api/list_routes/`
export const fetchRoadStatus = `${baseUrl}roads/api/road_status/`
export const bulkUpload = `${baseUrl}roads/api/bulk_segments/`

// external
export const getStringDetails = `https://routes.googleapis.com/directions/v2:computeRoutes` // computeRoutes in Google API
export const fetchTravelInfo = `https://maps.googleapis.com/maps/api/distancematrix/json`
