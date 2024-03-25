import React, { useEffect, useState } from "react";
import PlacesAutocomplete from 'react-places-autocomplete';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { useCheckAuthentication, loginMessage } from "../../../../Website/Auth/auth";
import { Button, Autocomplete, TextField, Checkbox, FormControlLabel, Typography, Tooltip } from "@mui/material";
import multilocations from "../../../../../styles/images/multilocations.png"
import { margin } from "@mui/system";


// First component of the wizard. Has GMaps API connection to offer autcomplete options for City + Country.
export function LocationStep({ setActiveStep, formData, onFormDataChange }) {

  const [country, setCountry] = useState({});
  const [availableCountries, setAvailableCountries] = useState({});
  const [availableRegions, setAvailableRegions] = useState({});
  const [region, setRegion] = useState('');
  const [availableAreas, setAvailableAreas] = useState({});
  const [area, setArea] = useState('');
  const [availableRoutes, setAvailableRoutes] = useState([]);
  const [route, setRoute] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [areaChecked, setAreaChecked] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const { isAuthenticated, loginMessage } = useCheckAuthentication();
  const [areaError, setAreaError] = useState(false);



  // Populates user country´s in Country Field as pre-defined Value
  useEffect(() => {
    if (firstRender) {
      if (isAuthenticated) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getUserLocation`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        })
          .then(res => {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return res.json();
            } else {
              throw new Error('Server response is not JSON');
            }
          })
          .then(data => {
            console.log('Data received from server:', data);
            const locationArray = data.preferences.location.split(', ');
            setCountry(locationArray[1]);
            setFirstRender(false) // In order to avoid infinite renders

          })
          .catch(err => {
            console.error("Error:", err);
          });
      }
    }
  }, [isAuthenticated, firstRender]);

  // Function to get all Countries from DB
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getAvailableLocations/countries`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(res => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        } else {
          throw new Error('Server response is not JSON');
        }
      })
      .then(data => {
        console.log('Data received from server:', data);
        const countryNames = data.preferences.map(item => item.name)
        setAvailableCountries(countryNames);
      })
      .catch(err => {
        console.error("Error:", err);
      });
  }, []);



  // Function to get all regions for the choosen country
  useEffect(() => {
    if (country) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getAvailableLocations/countries/regions?country=${country}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then(res => {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return res.json();
          } else {
            throw new Error('Server response is not JSON');
          }
        })
        .then(data => {
          console.log('Data about communities:', data)
          const regionsNames = data.preferences.map(item => item.name)
          setAvailableRegions(regionsNames);
          setRegion('');
          setArea('');
          setRoute('');
        })
        .catch(err => {
          console.error("Error:", err);
        });
    }
  }, [country]);

  // Function to get all areas for the choosen region
  useEffect(() => {
    if (region) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getAvailableLocations/countries/regions/area?region=${region}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then(res => {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return res.json();
          } else {
            throw new Error('Server response is not JSON');
          }
        })
        .then(data => {
          console.log('Data about regions:', data);
          const areasNames = data.preferences.map(item => item.name)
          setAvailableAreas(areasNames);
          setArea('');
          setRoute('');
        })
        .catch(err => {
          console.error("Error:", err);
        });
    }
  }, [region]);


  // Function to get all routes from choosen Area
  useEffect(() => {
    if (area) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getAvailableLocations/countries/regions/area/route?area=${area}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then(res => {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return res.json();
          } else {
            throw new Error('Server response is not JSON');
          }
        })
        .then(data => {
          console.log('Data for routes:', data);
          console.log('data.preferences:', data.preferences);
          const routes = data.preferences.map(item => ({
            name: item.name,
            route_style: item.route_style
          }));
          // Sort the routes so that the ones with 'Gym' come first
          routes.sort((a, b) => {
            if (a.route_style === 'Gym' && b.route_style !== 'Gym') {
              return -1;
            }
            if (a.route_style !== 'Gym' && b.route_style === 'Gym') {
              return 1;
            }
            return 0;
          });

          setAvailableRoutes(routes);
          setRoute('');
        })
        .catch(err => {
          console.error("Error:", err);
        });
    }
  }, [area]);


  const handleNext = () => {
    if (!area || (!selectedRoutes.length && !areaChecked)) {
      setAreaError(true);
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };



  return (
    <div>
      <h1 className=" text-base sm:text-lg text-green-900 font-extrabold  sm:mx-4 mb-2 sm:py-2">Step 1: Choose your climbing location <span style={{ fontSize: 30 }}>🧗‍♂️</span> </h1>
      <h2 className=" text-base sm:text-lg  font-semibold text-gray-700  sm:mx-4 mb-2 sm:py-2"> Let's kick things off by finding <span className="text-green-700 font-bold"> the perfect spot for your next ascent. 🌍✨</span> </h2>

      <div style={{ display: 'flex', justifyContent: 'center', margin: 30 }}>
        <img
          src={multilocations}
          alt="Multilocations"
          style={{ height: "200px" }} />
        <p className=" text-sm sm:text-base text-gray-700  sm:mx-4 mb-2 sm:py-2">Whether you are up to climb in the whole region or you wanna visit a local crag, your favorite indoor gym, share your perfect location, and <span className="text-green-700 font-bold">  we'll help you find the ideal partner.
 </span> </p>

      </div>

      <p className=" text-sm sm:text-base text-gray-700 italic font-light sm:mx-4 mb-2 sm:py-2">Select your desired climbing location(s):</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }}>

        <Autocomplete
          options={availableCountries}
          value={country}
          onChange={(event, newValue) => {
            setCountry(newValue); onFormDataChange('country', newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Country" style={{ width: '60%' }} />}
        />



        <Autocomplete
          options={availableRegions}
          disabled={!country}
          value={region}
          onChange={(event, newValue) => {
            setRegion(newValue); onFormDataChange('region', newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Region" style={{ width: '60%' }} />}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Autocomplete
            options={availableAreas}
            disabled={!region}
            value={area}
            onChange={(event, newValue) => {
              setArea(newValue); onFormDataChange('area', newValue);
            }}
            renderInput={(params) =>
              <TextField
                {...params}
                label="Specific Area / City"
                style={{ width: '60%' }}
                error={areaError}
                helperText={areaError ? "Please select an area or city" : ""}
              />
            }
          />
          <Tooltip title="By clicking this checkbox, your request will encompass the entire selected area, incorporating any routes associated with it.">
            <FormControlLabel
              control={<Checkbox checked={areaChecked} onChange={(event) => {
                setAreaChecked(event.target.checked);
                onFormDataChange('areaChecked', event.target.checked);
                setSelectedRoutes([]);
              }} />}
              label={<Typography variant="body2">* Make request for entire Area</Typography>}
              style={{ alignSelf: 'flex-start', marginTop: '-5px' }}
            />
          </Tooltip>
        </div>

        {!areaChecked && (
          <Autocomplete
            multiple
            options={availableRoutes}
            disabled={!area}
            getOptionLabel={(option) => {
              if (typeof option.name === 'string' && typeof option.route_style === 'string') {
                return `${option.name} - ${option.route_style}`;
              } else {
                return '';
              }
            }}
            value={selectedRoutes}
            onChange={(event, newValue) => {
              setSelectedRoutes(newValue); onFormDataChange('selectedRoutes', newValue);
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  checked={selectedRoutes.some(route => route.name === option.name && route.route_style === option.route_style)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelectedRoutes(prev => {
                        if (!prev.some(route => route.name === option.name && route.route_style === option.route_style)) {
                          return [...prev, option];
                        } else {
                          return prev;
                        }
                      });
                    } else {
                      setSelectedRoutes(prev => prev.filter(route => route.name !== option.name || route.route_style !== option.route_style));
                    }
                  }}
                />
                {`${option.name} - ${option.route_style}`}
              </li>
            )}
            renderInput={(params) => <TextField {...params} label="Route/Gym" />}
          />
        )}

      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
      </div>

    </div>
  );
}

