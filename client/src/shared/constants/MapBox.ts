export const MAPBOX_TOKEN = 'pk.eyJ1Ijoia3lsZW5ndXllbjEwMTQiLCJhIjoiY2tyamp0YTMxNmYzeTJvcXVzemtnbno0bSJ9.WKz54uwMDegkN3IwUyGs3Q'
export const MAPBOX_BASE_API = 'https://api.tiles.mapbox.com/'
export const MAPBOX_GEOCODING_API = MAPBOX_BASE_API + 'geocoding/v5/mapbox.places/'
export const MAPBOX_QUERY_SEARCH = (text : string) => MAPBOX_GEOCODING_API + `${text}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true`
