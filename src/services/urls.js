export const baseUrl = 'https://alkadelik.pythonanywhere.com/'

// internal
export const fetchSegments = `${baseUrl}roads/api/list/`
export const fetchRoutes = `${baseUrl}roads/api/list_routes/`
export const fetchRoadStatus = `${baseUrl}roads/api/road_status/`
export const bulkUpload = `${baseUrl}roads/api/add_bulk_segments/`

export const updateAddresses = `${baseUrl}roads/api/update_address/`
export const updateSegmentCodes = `${baseUrl}roads/api/update_segment_codes/`
export const updateCoordinates = `${baseUrl}roads/api/update_coordinates/`
export const updateStatus = `${baseUrl}roads/api/udpate_status/`

// external
export const getStringDetails = `https://routes.googleapis.com/directions/v2:computeRoutes` // computeRoutes in Google API
export const fetchTravelInfo = `https://maps.googleapis.com/maps/api/distancematrix/json`
