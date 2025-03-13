import React from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapListing: React.FC = () => {
  const markerData = [
    { id: 1, lat: 19.2183, lng: 73.0860, postId: "/post/1" },
    { id: 2, lat: 19.2190, lng: 73.0870, postId: "/post/2" },
    ];
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY || ''}>
          <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: 19.2183, lng: 73.0860 }}
              zoom={15}>
                {markerData.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => {
                            window.location.href = marker.postId;
                        }}
                    />
                ))}
            </GoogleMap>
    </LoadScript>
  )
}

export default MapListing;