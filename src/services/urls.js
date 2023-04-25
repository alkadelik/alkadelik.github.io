export const baseUrl = 'http://127.0.0.1:8000/'

// internal
export const fetchSegments = `${baseUrl}roads/api/list/`
export const fetchRoutes = `${baseUrl}roads/api/list_routes/`
export const fetchRoadStatus = `${baseUrl}roads/api/road_status/`
export const bulkUpload = `${baseUrl}roads/api/add_bulk_segments/`

export const updateAddresses = `${baseUrl}roads/api/update_address/`
export const updateCode = `${baseUrl}roads/api/update_segment_code/`
export const updateCoordinates = `${baseUrl}roads/api/update_coordinates/`
export const updateName = `${baseUrl}roads/api/update_segment_name/`
export const updateState = `${baseUrl}roads/api/update_segment_state/`
export const updateStatus = `${baseUrl}roads/api/update_status/`

// external
export const getStringDetails = `https://routes.googleapis.com/directions/v2:computeRoutes` // computeRoutes in Google API
export const fetchTravelInfo = `https://maps.googleapis.com/maps/api/distancematrix/json`
