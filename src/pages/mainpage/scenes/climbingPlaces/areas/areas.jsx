import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate, useParams, Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import europe from "../../../../../styles/images/europe.jpg"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchBar from '../../../../../components/reusable/searchBar';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon } from "leaflet"
import pin from "../../../../../styles/images/pin.png"
import MarkerClusterGroup from "react-leaflet-cluster"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Areas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true)
  const navigate = useNavigate();
  const { country, region } = useParams();
  const [routes, setRoutes] = useState([]);
  const [coordinates, setCoordinates] =  useState({ y_axis: 52.520008, x_axis: 13.404954 })
  console.log("coordinates",coordinates)

  const [selectedRoute, setSelectedRoute] = useState(null);
  const customIcon = new Icon({
    iconUrl: pin,
    iconSize: [34, 34]
  })
  
   //for the map
   useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getLocationsForMap`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setRoutes(data)
      })
      .catch(err => {
        console.error("Error:", err);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getLocationsForMap/coordinates/${region}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCoordinates({  y_axis: data.y_axis , x_axis: data.x_axis})
      })
      .catch(err => {
        console.error("Error:", err);
      });
   }, [region]);


  useEffect(() => {
    if (firstRender) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/climbing-locations/${country}/${region}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then(res => res.json())
        .then(data => {
          setAreas(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error:", err);
          setLoading(false);
        });
    }
  }, [region, country, firstRender]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <div style={{ width: '95%', height: '300px', overflow: 'hidden', margin: 20, borderRadius: '10px', position: 'relative' }}>
      <MapContainer center={[ coordinates.y_axis, coordinates.x_axis]} zoom={10} style={{ height: "70vh", width: "90%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup
          chunkedLoadings
        >
          {routes.map((route, index) => (
            <Marker key={route.name} icon={customIcon} position={[  route.x_axis, route.y_axis]}>
              {<Popup>
                <span style={{ fontWeight: 'bold', color: 'darkgreen' }}>Route Name: </span> {route.name}<br />
                <span style={{ fontWeight: 'bold', color: 'darkgreen' }}>Route Style :  </span> {route.route_style === "Gym" ? `${route.route_style} - Indoors` : `${route.route_style} - Outdoors`} <br />
                You can practice here {route.style}<br />
                {route.route_style !== "Gym" && <><span style={{ fontWeight: 'bold', color: 'darkgreen' }}>Number of routes: </span>{route.number_routes}<br /></>}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
                <Button
                  variant="contained"
                  className="block w-full rounded bg-green-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"

                  onClick={async () => {
                    let url = `${process.env.REACT_APP_BACKEND_URL}/api/getLocationsForMap/${route.name}`;
                    fetch(url, {
                      method: "GET",
                      headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                    })
                      .then(res => res.json())
                      .then(data => {
                        const { area, regions, country } = data;
                        const routeName = route.name; // Assuming route.name is available here
                        const link = `/climbing-locations/${country}/${regions}/${area}/${routeName}`;
                        window.open(link, "_blank");
                      })
                      .catch(err => {
                        console.error("Error:", err);
                      });
                  }}
                >
                  View Location
                </Button>
                </div>
              </Popup>}
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      </div>
      <div> <SearchBar /> </div>
      <Paper> <Button
        onClick={() => navigate(-1)}
        style={{
          margin: '10px',
          border: '2px solid green',
          borderRadius: '5px',
          padding: '5px 10px'
        }}
      >
        <ArrowBackIcon style={{ fontSize: 30, cursor: 'pointer' }} />
        Back
      </Button>
        <Box m="20px">
          <Link to={`/climbing-locations/`} style={{ textDecoration: 'underline', color: "blue", cursor: 'pointer' }}>All climbing Locations /</Link>
          <span>&nbsp;&nbsp;</span>
          <Link to={`/climbing-locations/${country}`} style={{ textDecoration: 'underline', color: "blue", cursor: 'pointer' }}>{country}/</Link>
          <span>&nbsp;&nbsp;</span>
          <Link to={`/climbing-locations/${country}/${region}`} style={{ textDecoration: 'underline', color: "blue", cursor: 'pointer' }}>{region}/</Link>
          <span>&nbsp;&nbsp;</span>


          <Typography variant="h6" className="font-bold text-green-900" style={{ paddingTop: 14 }}>Areas within {region}</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Area Name</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>

              {areas.map((area, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#9EC69B',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell>{area.id}</TableCell>
                  <TableCell onClick={() => navigate(`/climbing-locations/${country}/${region}/${area.name}`)}>{area.name}</TableCell>

                </TableRow>

              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Areas;
