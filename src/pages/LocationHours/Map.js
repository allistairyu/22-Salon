
import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '500px',
  height: '300px'
};

function MyComponent() {

  const [center, changeCenter] = React.useState({lat: 47.706280, lng: -122.355710})
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
        disableDefaultUI
      >
        <Marker position={{ lat: 47.706280, lng: -122.355710 }} />
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)