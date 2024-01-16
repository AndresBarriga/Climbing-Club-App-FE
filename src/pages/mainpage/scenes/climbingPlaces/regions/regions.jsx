import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, Button, TableHead, TableRow, TextField, Box, Typography, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useParams, Link } from "react-router-dom";
import europe from "../../../../../styles/images/europe.jpg"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchBar from '../../../../../components/reusable/searchBar';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon } from "leaflet"
import pin from "../../../../../styles/images/pin.png"
import MarkerClusterGroup from "react-leaflet-cluster"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Regions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true)
  const navigate = useNavigate();
  const { country } = useParams();
  const [routes, setRoutes] = useState([]);

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
    if (firstRender) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/climbing-locations/${country}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then(res => res.json())
        .then(data => {
          setRegions(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error:", err);
          setLoading(false);
        });
    }
  }, [country, firstRender]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <div style={{ width: '95%', height: '300px', overflow: 'hidden', margin: 20, borderRadius: '10px', position: 'relative' }}>
          <MapContainer center={[51.165691, 10.451526]} zoom={6} style={{ height: "50vh", width: "90%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup
          chunkedLoadings
        >
          {routes.map((route, index) => (
            <Marker key={route.name} icon={customIcon} position={[route.x_axis, route.y_axis]}>
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
      <SearchBar
      />
      <Paper><Button
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




          <Typography variant="h6" className="font-bold text-green-900" style={{ paddingTop: 14 }}>Regions available in {country}</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Region Name</TableCell>
                <TableCell>Style</TableCell>
                <TableCell>Amount of Routes</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>

              {regions.map((region, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#9EC69B',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell>{region.id}</TableCell>
                  <TableCell onClick={() => navigate(`/climbing-locations/${country}/${region.name}`)}>{region.name}</TableCell>
                  <TableCell onClick={() => navigate(`/climbing-locations/${country}/${region.name}`)}>{region.style}</TableCell>
                  <TableCell onClick={() => navigate(`/climbing-locations/${country}/${region.name}`)} >{region.amount_of_routes}</TableCell>

                </TableRow>

              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Regions;
