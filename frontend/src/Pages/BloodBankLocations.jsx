import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer, InfoWindow, useLoadScript } from "@react-google-maps/api";
import { getBloodBank } from "../Helper/helper";

const API_KEY = "AIzaSyDJUTyc-w9jaUlVWIXFPs9O95TohmdjKAE";
const mapContainerStyle = { width: "100%", height: "100vh" };
const center = { lat: 24.8607, lng: 67.0011 };

const BloodBankMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [bloodBankLocations, setBloodBankLocations] = useState([]);
  const [closestBank, setClosestBank] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [directionsList, setDirectionsList] = useState([]); // Store multiple routes
  
  const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: API_KEY });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(userLoc);
        },
        (error) => {
          console.error("Error fetching user location:", error);
          setUserLocation(center);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUserLocation(center);
    }
  }, []);

  useEffect(() => {
    const fetchBloodBanks = async () => {
      try {
        const response = await getBloodBank();
        if (response?.data) {
          const locations = response.data.map((bank) => ({
            name: bank.name,
            address: bank.address,
            phone: bank.phone,
            location: { lat: bank.latitude, lng: bank.longitude },
          }));
          setBloodBankLocations(locations);
          if (userLocation) {
            findNearestBloodBank(userLocation, locations);
            generateRoutesToEachBank(userLocation, locations);
          }
        }
      } catch (error) {
        console.error("Error fetching blood bank data:", error);
      }
    };
    fetchBloodBanks();
  }, [userLocation]);

  const calculateDistance = (loc1, loc2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(loc2.lat - loc1.lat);
    const dLng = toRad(loc2.lng - loc1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(loc1.lat)) * Math.cos(toRad(loc2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestBloodBank = (userLoc, bloodBanks) => {
    if (userLoc && bloodBanks.length > 0) {
      let nearest = bloodBanks[0];
      let minDistance = calculateDistance(userLoc, bloodBanks[0].location);

      bloodBanks.forEach((bank) => {
        const distance = calculateDistance(userLoc, bank.location);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = bank;
        }
      });
      setClosestBank(nearest);
    }
  };

  const generateRoutesToEachBank = (userLoc, bloodBanks) => {
    if (!userLoc || bloodBanks.length === 0) return;

    const directionsService = new google.maps.DirectionsService();
    let routes = [];

    bloodBanks.forEach((bank) => {
      directionsService.route(
        {
          origin: userLoc,
          destination: bank.location,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            routes.push(result);
            setDirectionsList([...routes]); // Update state to store multiple routes
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ position: "relative" }}>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={userLocation || center}>
        
        {/* User's Location Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }} />
        )}

        {/* Blood Bank Markers */}
        {bloodBankLocations.map((bank, index) => (
          <Marker
            key={index}
            position={bank.location}
            icon={{
              url:
                closestBank && bank.name === closestBank.name
                  ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  : "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
            onClick={() => setSelectedBank(bank)}
          />
        ))}

        {/* InfoWindow for Selected Bank */}
        {selectedBank && (
          <InfoWindow position={selectedBank.location} onCloseClick={() => setSelectedBank(null)}>
            <div>
              <h3>{selectedBank.name}</h3>
              <p><strong>Address:</strong> {selectedBank.address}</p>
            </div>
          </InfoWindow>
        )}

        {/* Render Multiple Routes */}
        {directionsList.map((directions, index) => (
          <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />
        ))}
      </GoogleMap>
      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
        }}
      >
        <h4>Legend</h4>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt="User Location" width="20" height="20" />
          <span style={{ marginLeft: "5px" }}>Your Location</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="http://maps.google.com/mapfiles/ms/icons/green-dot.png" alt="Nearest Blood Bank" width="20" height="20" />
          <span style={{ marginLeft: "5px" }}>Nearest Blood Bank</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="http://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="Other Blood Banks" width="20" height="20" />
          <span style={{ marginLeft: "5px" }}>Other Blood Banks</span>
        </div>
      </div>
    </div>
  );
};

export default BloodBankMap;
