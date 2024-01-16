import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box, Typography, Paper, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import { useParams, Link, useNavigate } from "react-router-dom";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import europe from "../../../../../styles/images/europe.jpg";
import Tooltip from '@mui/material/Tooltip';
import PublicIcon from '@mui/icons-material/Public';
import DirectionsIcon from '@mui/icons-material/Directions';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LaunchIcon from '@mui/icons-material/Launch';
import SearchBar from '../../../../../components/reusable/searchBar';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon } from "leaflet"
import pin from "../../../../../styles/images/pin.png"
import MarkerClusterGroup from "react-leaflet-cluster"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const RoutesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [route, setRoutes] = useState([{}])
  const [firstRender, setFirstRender] = useState(true)
  const [loading, setLoading] = useState(true)
  const { country, region, area } = useParams();
  const [favourites, setFavourites] = useState([]);
  const [routes2, setRoutes2] = useState([]);
  const navigate = useNavigate()
  const [coordinates, setCoordinates] =  useState({ y_axis: 52.520008, x_axis: 13.404954 })

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
        setRoutes2(data)
      })
      .catch(err => {
        console.error("Error:", err);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getLocationsForMap/coordinates/${area}`, {
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
   }, [area]);


  const handleFavorite = (route) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user_favourites`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route_id: route.id
      })
    })
      .then(res => res.json())
      .then(data => {
        // Update the state based on the response
        setRoutes(prevRoutes => prevRoutes.map((r) => r.id === route.id ? { ...r, isFavorite: !r.isFavorite } : r));
      })
      .catch(err => {
        console.error("Error:", err);
      });
  };
  useEffect(() => {
    if (firstRender) {
      console.log("Fetching is happening")
      fetch(`${process.env.REACT_APP_BACKEND_URL}/climbing-locations/${country}/${region}/${area}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setRoutes(data)
          setFirstRender(false)
          setLoading(false)
        })
        .catch(err => {
          console.error("Error:", err);
          setLoading(false)
        });
    }
  }, [region, country, area, firstRender]);

  useEffect(() => {
    if (firstRender) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user_favourites_get`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log("Favorites:", data)
          setFavourites(data);
          setFirstRender(false)
        })
        .catch(err => {
          console.error("Error:", err);
        });
    }
  }, [firstRender]);


  useEffect(() => {
    // Update the routes with the isFavorite property
    setRoutes(prevRoutes => prevRoutes.map(route => ({
      ...route,
      isFavorite: favourites.includes(route.id)
    })));
  }, [favourites]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleStartRequest = (selectedRoute) => {
  
    // Prepare the initial data for the wizard
    const initialData = {
      country: country,
      region: region,
      area: area,
      route: selectedRoute.name,
    };
  
    // Use navigate to change the route and pass the initial data as state
    navigate('/find-a-buddy', { state: { initialData: initialData } });
  };

  const routeStyleTitles = {
    "Gym": "Climbing / Boulder Gyms",
    "Wall": "Climbing",
    "Boulder": "Boulder",
    "Urban Boulder": "Boulder"
  };
  const routeStyles = ["Climbing / Boulder Gyms", "Climbing", "Boulder"];
  const filteredRoutes = routeStyles.map(title => {
    return {
      title,
      routes: route.filter(r => routeStyleTitles[r.route_style.trim()] === title)
    };
  });

  return (
    <Box>
      <div style={{ width: '95%', height: '300px', overflow: 'hidden', margin: 20, borderRadius: '10px', position: 'relative' }}>
      <MapContainer center={[ coordinates.y_axis, coordinates.x_axis]} zoom={13} style={{ height: "70vh", width: "90%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup
          chunkedLoadings
        >
          {routes2.map((route2, index) => (
            <Marker key={route2.name} icon={customIcon} position={[  route2.x_axis, route2.y_axis]}>
              {<Popup>
                <span style={{ fontWeight: 'bold', color: 'darkgreen' }}>Route Name: </span> {route2.name}<br />
                <span style={{ fontWeight: 'bold', color: 'darkgreen' }}>Route Style :  </span> {route2.route_style === "Gym" ? `${route2.route_style} - Indoors` : `${route2.route_style} - Outdoors`} <br />
                You can practice here {route2.style}<br />
                {route2.route_style !== "Gym" && <><span style={{ fontWeight: 'bold', color: 'darkgreen' }}>Number of routes: </span>{route2.number_routes}<br /></>}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
                <Button
                  variant="contained"
                  className="block w-full rounded bg-green-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"

                  onClick={async () => {
                    let url = `${process.env.REACT_APP_BACKEND_URL}/api/getLocationsForMap/${route2.name}`;
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
      <div>

      </div>
      <Paper>
        <Button
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
          <Link to={`/climbing-locations/${country}/${region}/${area}`} style={{ textDecoration: 'underline', color: "blue", cursor: 'pointer' }}>{area}/ </Link>



          <Typography variant="h6" className="font-bold text-green-900" style={{ paddingTop: 14 }}>Routes available in {area}</Typography>
        </Box>
        <TableContainer>
          <Table style={{ width: '100%', margin: 0 }}>

            <TableBody>

              {filteredRoutes.map((filteredRoute, index) => (
                <Accordion key={index} >
                  <Tooltip title={`Click to open all ${filteredRoute.title} routes`}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6" className="text-green-800">{filteredRoute.title}</Typography>
                    </AccordionSummary>
                  </Tooltip>
                  <AccordionDetails>
                    <TableContainer>
                      <Table style={{ width: '100%', margin: 0 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Country Name</TableCell>
                            <TableCell>Style</TableCell>
                            {filteredRoute.title !== "Climbing / Boulder Gyms" && <TableCell>Amount of Routes</TableCell>}
                            <TableCell>Avg. height</TableCell>
                            <TableCell>Helpful Links</TableCell>
                            <TableCell>&nbsp;&nbsp;Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredRoute.routes.map((route, index) => (

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
                                <Link to={`/climbing-locations/${country}/${region}/${area}/${route.name}`}>
                                  {route.id}
                                </Link>
                              </TableCell>
                              <TableCell>
                                <Link to={`/climbing-locations/${country}/${region}/${area}/${route.name}`}>
                                  {route.name}
                                </Link>
                              </TableCell>
                              <TableCell>
                                <Link to={`/climbing-locations/${country}/${region}/${area}/${route.name}`}>
                                  {route.style}
                                </Link>
                              </TableCell>
                              {filteredRoute.title !== "Climbing / Boulder Gyms" && <TableCell>{route.number_routes}</TableCell>}
                              <TableCell>
                                <Link to={`/climbing-locations/${country}/${region}/${area}/${route.name}`}>
                                  {route.height_avg}
                                </Link>
                              </TableCell>
                              <TableCell style={{ width: '150px' }}>
                                <Tooltip title="Open website">
                                  <IconButton onClick={() => window.open(route.link_site, "_blank")}>
                                    <PublicIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Open maps">
                                  <IconButton onClick={() => window.open(route.link_maps, "_blank")}>
                                    <DirectionsIcon />
                                  </IconButton>
                                </Tooltip>

                              </TableCell>
                              <TableCell style={{ width: '150px' }}>
                                <Box display="flex">
                                  <Tooltip title="Marking as favourite will notify you about request to climb, events happening & more">
                                    <IconButton onClick={() => handleFavorite(route)}>
                                      {route.isFavorite ? <StarIcon /> : <StarBorderIcon />}
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Find here people to climb with">
                                  <IconButton onClick={() => handleStartRequest(route)}>
  <Diversity1Icon  />
</IconButton>
                                  </Tooltip>
                                  <Tooltip title="Open route details">
                                    <IconButton component={Link} to={`/climbing-locations/${country}/${region}/${area}/${route.name}`}>
                                      <LaunchIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default RoutesList;