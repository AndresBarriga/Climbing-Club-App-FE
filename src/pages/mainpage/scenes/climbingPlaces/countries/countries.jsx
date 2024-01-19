import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, Button, TableRow, TextField, Box, Typography, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import SearchBar from '../../../../../components/reusable/searchBar';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon } from "leaflet"
import pin from "../../../../../styles/images/pin.png"
import MarkerClusterGroup from "react-leaflet-cluster"




const CountryList = () => {
  const navigate = useNavigate()
  const [countries, setCountries] = useState([{}])
  const [loading, setLoading] = useState(true)
  const [routes, setRoutes] = useState([]);

  



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


  //for the list
  useEffect(() => {

    fetch(`${process.env.REACT_APP_BACKEND_URL}/climbing-locations`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data[0])
        setCountries(data[0])
        setLoading(false)
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false)
      });

  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <MapContainer center={[52.520008, 13.404954]} zoom={13} style={{ height: "50vh", width: "90%" }}>
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
                  sx={{'&:hover': {
                    transform: 'scale(1.1)', // Slightly increase the size on hover
                  }}}
                  
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

      <SearchBar
      />
      <Paper>
        <div style={{
          margin: '10px',

        }}><Link to={`/climbing-locations/`} style={{ textDecoration: 'underline', color: "blue", cursor: 'pointer' }}>All climbing Locations /</Link>
          <span>&nbsp;&nbsp;</span></div>




        <Box m="20px">
          <Typography variant="h6" className="font-bold text-green-900">Countries</Typography>
        </Box>
        <TableContainer>
          <Table style={{ width: '100%', margin: 0 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Country Name</TableCell>
                <TableCell>Style</TableCell>
                <TableCell>Amount of Routes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {countries.map((country, index) => (

                <TableRow
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#9EC69B',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell>

                    {country.id}
                  </TableCell>
                  <TableCell onClick={() => navigate(`/climbing-locations/${country.name}`)}>{country.name}</TableCell>
                  <TableCell onClick={() => navigate(`/climbing-locations/${country.name}`)}>{country.style}</TableCell>
                  <TableCell onClick={() => navigate(`/climbing-locations/${country.name}`)} >{country.amount_of_routes}</TableCell>

                </TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CountryList;