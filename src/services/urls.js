export const baseUrl = process.env.VUE_APP_API_BASE_URL

// internal
export const fetchSegments = `${baseUrl}roads/api/list/`
export const fetchRoutes = `${baseUrl}roads/api/list_routes/`
export const fetchRoadStatus = `${baseUrl}roads/api/road_status/`
export const bulkUpload = `${baseUrl}roads/api/add_bulk_segments/`

export const updateAddresses = `${baseUrl}roads/api/update_address/`
export const updateCode = `${baseUrl}roads/api/update_code/`
export const updateName = `${baseUrl}roads/api/update_name/`
export const updateState = `${baseUrl}roads/api/update_state/`
export const updateStatus = `${baseUrl}roads/api/update_status/`

// external
export const getStringDetails = `https://routes.googleapis.com/directions/v2:computeRoutes` // computeRoutes in Google API
export const fetchTravelInfo = `https://maps.googleapis.com/maps/api/distancematrix/json`
