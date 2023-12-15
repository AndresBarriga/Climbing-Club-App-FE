

import React, { useState, useEffect, useRef } from 'react';
import RequestCard from '../../../components/requestCard';
import { useSwipeable } from 'react-swipeable';
import Button from "@mui/material/Button";
import UndoIcon from '@mui/icons-material/Undo';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { SendAMessage } from '../sendAMessage/sendAMessage';
import moment from "moment";
import { styled } from '@mui/system';
import { FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';





const SeeRequests = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dismissedRequests, setDismissedRequests] = useState([]);
    const [connectedCards, setConnectedCards] = useState([]);
    const [connectedUser, setConnectedUser] = useState(null);
    const currentIndexRef = useRef(0);
    const [notificationType, setNotificationType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardPosition, setCardPosition] = useState(0);





    //Const for the filters
    const [filterArea, setFilterArea] = useState(["All areas"]);
    const [filterCountry, setFilterCountry] = useState('');
    const [filterRegion, setFilterRegion] = useState(['All regions']);
    const [filterRoutes, setFilterRoutes] = useState(['All routes']);
    const [filterDateRange, setFilterDateRange] = useState([null, null]);
    const [filterStyle, setFilterStyle] = useState(['All styles']);

    //Managing what to show in filters selection
    const [uniqueAreas, setUniqueAreas] = useState([]);
    const [uniqueRegions, setUniqueRegions] = useState([]);
    const [uniqueRoutes, setUniqueRoutes] = useState([]);
    const [uniqueStyles, setUniqueStyles] = useState([]);
    //Passing filters to create new array
    const [requestsWithFilters, setRequestsWithFilters] = useState([]);

    const getUniqueAreas = (requests) => {
        const areas = requests.map(request => request.area);
        const uniqueAreas = [...new Set(areas)];
        setUniqueAreas(uniqueAreas);
    };

    useEffect(() => {
        const getUniqueRegions = () => {
            const regions = requestsWithFilters.map(request => request.region);
            const uniqueRegions = ['All regions', ...new Set(regions)];
            setUniqueRegions(uniqueRegions);
        };

        getUniqueRegions();
    }, [requestsWithFilters]);

    useEffect(() => {
        const getUniqueRoutes = () => {
            const routes = requestsWithFilters.flatMap(request => request.selected_routes ? request.selected_routes.map(routeString => {
                try {
                    const route = JSON.parse(routeString);
                    return route.name;
                } catch (error) {
                    console.error('Error parsing JSON string:', error);
                    return null;
                }
            }) : []);
            const uniqueRoutes = ['All routes', ...new Set(routes)];
            setUniqueRoutes(uniqueRoutes);
        };

        getUniqueRoutes();
    }, [requestsWithFilters]);

    useEffect(() => {
        const getUniqueStyles = () => {
            const styles = requestsWithFilters.flatMap(request => request.climbing_style);
            const uniqueStyles = ['All styles', ...new Set(styles)];
            setUniqueStyles(uniqueStyles);
        };

        getUniqueStyles();
    }, [requestsWithFilters]);

    const handleChange = (event) => {
        const newSelectedAreas = event.target.value;
        if (newSelectedAreas.length === 1 && newSelectedAreas[0] === 'All areas') {
            // If 'All areas' is the only selected area, deselect all other areas
            setFilterArea(['All areas']);
        } else if (newSelectedAreas.includes('All areas')) {
            // If another area is selected and 'All areas' is also selected, deselect 'All areas'
            setFilterArea(newSelectedAreas.filter(area => area !== 'All areas'));
        } else {
            // Otherwise, update the selected areas
            setFilterArea(newSelectedAreas);
        }
    };

    const handleRegionChange = (event) => {
        const newSelectedRegions = event.target.value;
        if (newSelectedRegions.length === 1 && newSelectedRegions[0] === 'All regions') {
            setFilterRegion(['All regions']);
        } else if (newSelectedRegions.includes('All regions')) {
            setFilterRegion(newSelectedRegions.filter(region => region !== 'All regions'));
        } else {
            setFilterRegion(newSelectedRegions);
        }
    };


    const handleRouteChange = (event) => {
        const newSelectedRoutes = event.target.value;
        if (newSelectedRoutes.length === 1 && newSelectedRoutes[0] === 'All routes') {
            // If 'All routes' is the only selected route, deselect all other routes
            setFilterRoutes(['All routes']);
        } else if (newSelectedRoutes.includes('All routes')) {
            // If another route is selected and 'All routes' is also selected, deselect 'All routes'
            setFilterRoutes(newSelectedRoutes.filter(route => route !== 'All routes'));
        } else {
            // Otherwise, update the selected routes
            setFilterRoutes(newSelectedRoutes);
        }
    };

    const handleStyleChange = (event) => {
        const newSelectedStyles = event.target.value;
        if (newSelectedStyles.length === 1 && newSelectedStyles[0] === 'All styles') {
            // If 'All styles' is the only selected style, deselect all other styles
            setFilterStyle(['All styles']);
        } else if (newSelectedStyles.includes('All styles')) {
            // If another style is selected and 'All styles' is also selected, deselect 'All styles'
            setFilterStyle(newSelectedStyles.filter(style => style !== 'All styles'));
        } else {
            // Otherwise, update the selected styles
            setFilterStyle(newSelectedStyles);
        }
    };

    useEffect(() => {
        const getUniqueStyles = () => {
            const styles = requestsWithFilters.flatMap(request => request.climbing_style);
            const uniqueStyles = ['All styles', ...new Set(styles)];
            setUniqueStyles(uniqueStyles);
        };

        getUniqueStyles();
    }, [requestsWithFilters]);

    const clearFilters = () => {
        setFilterArea(['All areas']);
        setFilterRegion(['All regions']);
        setFilterRoutes(['All routes']);
        setFilterDateRange(null);;
        setFilterStyle('');
    };

    useEffect(() => {
        if (requests.length > 0) {
            const filteredRequests = requests.filter(request =>
                (filterArea.length > 0 && !filterArea.includes('All areas') ? filterArea.includes(request.area) : true) &&
                (filterRegion.length > 0 && !filterRegion.includes('All regions') ? filterRegion.includes(request.region) : true) &&
                (filterRoutes.length > 0 && !filterRoutes.includes('All routes') ? request.selected_routes && request.selected_routes.some(routeString => {
                    try {
                        const route = JSON.parse(routeString);
                        return filterRoutes.includes(route.name);
                    } catch (error) {
                        console.error('Error parsing JSON string:', error);
                        return false;
                    }
                }) : true) &&
                ('startDate' in request.time_data ?
                (filterDateRange[0] !== null ? moment(request.time_data.startDate).isSameOrAfter(moment(filterDateRange[0].toDate())) : true) &&
                (filterDateRange[1] !== null ? moment(request.time_data.startDate).isSameOrBefore(moment(filterDateRange[1].toDate())) : true)
                : true) &&
                (filterStyle.length > 0 && !filterStyle.includes('All styles') ? request.climbing_style.some(style => filterStyle.includes(style)) : true)

            );
            setRequestsWithFilters(filteredRequests);
        }
    }, [requests, filterArea, filterRegion, filterRoutes, filterDateRange, filterStyle]);

    console.log("request....", requests)
    console.log("request with filters...", requestsWithFilters)
    console.log("date range is...", filterDateRange)

    // Create the swipe handlers
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => dismissCard(),
        onSwipedRight: () => connectCard(),
        onSwiping: (eventData) => {
            if (currentIndexRef.current === 0) {
                setCardPosition(eventData.absX);
            }
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
        delta: 100,
    });

    const handleClose = () => setIsModalOpen(false);

    const dismissCard = () => {
        const [firstCard, ...remainingCards] = requests;
        setDismissedRequests(prevDismissedRequests => [...prevDismissedRequests, firstCard]);
        setRequests(remainingCards);
        setNotificationType('dismiss');
        setTimeout(() => setNotificationType(null), 1000); // Set timeout for the notification to disappear
    };


    const undoDismiss = () => {
        const [lastCard, ...remainingDismissedCards] = dismissedRequests;
        setDismissedRequests(remainingDismissedCards);
        setRequests(prevRequests => [lastCard, ...prevRequests]);
        setNotificationType('undo');
        setTimeout(() => setNotificationType(null), 1000);
    };


    const connectCard = () => {
        const [firstCard, ...remainingCards] = requests;
        setConnectedCards(prevConnectedCards => [...prevConnectedCards, firstCard]);
        setConnectedUser(firstCard.user);
        setRequests(remainingCards);
        setNotificationType('connect');
        setTimeout(() => setNotificationType(null), 1000); // Set timeout for the notification to disappear
        setIsModalOpen(true);
    };




    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:3001/api/getAllRequests', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(response => response.json())
            .then(requestsData => {

                const userRequestsPromises = requestsData.map(request => {
                    return fetch(`http://localhost:3001/api/showOtherProfile/onlyProfile?userId=${request.user_id}`, {
                        method: "GET",
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                    })
                        .then(res => res.json())
                        .then(userData => {
                            return { ...request, user: userData.user };
                        });
                });

                Promise.all(userRequestsPromises)
                    .then(completeRequests => {
                        setRequests(completeRequests);
                        getUniqueAreas(completeRequests);
                        const getInitialUniqueRegions = () => {
                            const regions = completeRequests.map(request => request.region);
                            const uniqueRegions = ['All regions', ...new Set(regions)];
                            setUniqueRegions(uniqueRegions);
                        };
                        getInitialUniqueRegions();


                        const getInitialUniqueRoutes = () => {
                            const routes = completeRequests.flatMap(request => request.selected_routes.map(routeString => {
                                try {
                                    const route = JSON.parse(routeString);
                                    return route.name;
                                } catch (error) {
                                    console.error('Error parsing JSON string:', error);
                                    return null;
                                }
                            }));
                            const uniqueRoutes = ['All routes', ...new Set(routes)];
                            setUniqueRoutes(uniqueRoutes);
                        };
                        getInitialUniqueRoutes();

                        const getInitialUniqueStyles = () => {
                            const styles = completeRequests.map(request => request.style);
                            const uniqueStyles = ['All regions', ...new Set(styles)];
                            setUniqueStyles(uniqueStyles);
                        };
                        getInitialUniqueStyles();

                        setIsLoading(false);
                    })
                    .catch(err => {
                        console.error("Error fetching user data:", err);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error('Error fetching requests:', error);
                setIsLoading(false);
            });
    }, []);


    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <Typography variant="h6" style={{ flex: 1, opacity: 0.7 }}>🔎 Add filters to see what interest you the most! </Typography>
                     <Button onClick={clearFilters}sx={{ borderRadius: '12px', border: '1px solid grey' , flexGrow: 1, alignSelf: 'flex-end', margin: '10px' }}>Clear all</Button>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                       

                        <FormControl >
                            <InputLabel id="area-select-label" >Area</InputLabel>
                            <Select
                                labelId="area-select-label"
                                id="area-select"
                                multiple
                                value={filterArea}
                                label="Area"
                                onChange={handleChange}
                                sx={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: 4,
                                    maxWidth: '20em',
                                    margin: 1,
                                    cursor: "pointer",
                                    '&.Mui-selected': {
                                        backgroundColor: "#000000",
                                        color: "#ffffff",
                                    },
                                }}
                            >
                                <MenuItem value='All areas'>All areas</MenuItem>
                                {uniqueAreas.map((area, index) => (
                                    <MenuItem key={index} value={area}>
                                        {filterArea.includes(area) && <CheckIcon />}
                                        {area}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl >
                            <InputLabel id="region-select-label">Region</InputLabel>
                            <Select
                                labelId="region-select-label"
                                id="region-select"
                                multiple
                                value={filterRegion}
                                label="Region"
                                onChange={handleRegionChange}
                                sx={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: 4,
                                    maxWidth: '20em',
                                    margin: 1,
                                    cursor: "pointer",
                                    '&.Mui-selected': {
                                        backgroundColor: "#000000",
                                        color: "#ffffff",
                                    },
                                }}
                            >
                                {uniqueRegions.map((region, index) => (
                                    <MenuItem key={index} value={region}>
                                        {filterRegion.includes(region) && <CheckIcon />}
                                        {region}
                                    </MenuItem>

                                ))}
                            </Select>
                        </FormControl>

                        <FormControl >
                            <InputLabel id="route-select-label">Route</InputLabel>
                            <Select
                                labelId="route-select-label"
                                id="route-select"
                                multiple
                                value={filterRoutes}
                                label="Route"
                                onChange={handleRouteChange}
                                sx={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: 4,
                                    maxWidth: '20em',
                                    margin: 1,
                                    cursor: "pointer",
                                    '&.Mui-selected': {
                                        backgroundColor: "#000000",
                                        color: "#ffffff",
                                    },
                                }}
                            >
                                {uniqueRoutes.map((route, index) => (
                                    <MenuItem key={index} value={route}>
                                        {filterRoutes.includes(route) && <CheckIcon />}
                                        {route}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl >
                            <InputLabel id="style-select-label">Climbing Style</InputLabel>
                            <Select
                                labelId="style-select-label"
                                id="style-select"
                                multiple
                                value={filterStyle}
                                label="Style"
                                onChange={handleStyleChange}
                                sx={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: 4,
                                    maxWidth: '20em',
                                    margin: 1,

                                    cursor: "pointer",
                                    '&.Mui-selected': {
                                        backgroundColor: "#000000",
                                        color: "#ffffff",
                                    },
                                }}
                            >
                                {uniqueStyles.map((style, index) => (

                                    <MenuItem key={index} value={style}>
                                        {filterStyle.includes(style) && <CheckIcon />}
                                        {style}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ border: '1px solid grey', borderRadius: '4px', padding: '5px', width: 'fit-content' }}>
  <Typography variant="body2" >You want to climb between:</Typography>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateRangePicker
      startText="Start date"
      endText="End date"
      value={filterDateRange}
      onChange={(newValue) => {
        setFilterDateRange(newValue);
      }}
      renderInput={(startProps, endProps) => (
        <React.Fragment>
          <TextField {...startProps} sx={{ width: '40% !important' }} />
          <Box sx={{ mx: 2 }}> to </Box>
          <TextField {...endProps} sx={{ width: '40% !important' }} />
        </React.Fragment>
      )}
      inputFormat="DD/MM/YYYY"
    />
  </LocalizationProvider>
</Box>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 1000, marginTop: 20 }}>
                        <Button
                            variant="contained"
                            startIcon={<CloseIcon />}
                            
                            className="block w-full rounded bg-red-700 px-16 py-4 text-lg font-medium text-white shadow hover:bg-white hover:text-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto" onClick={() => {
                                dismissCard();

                            }}
                        >
                            Dismiss
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<UndoIcon />}
                           
                            className="undo-button block w-full rounded bg-yellow-700 px-12 py-6 text-sm font-medium text-white shadow hover:bg-white hover:text-yellow-700 focus:outline-none focus:ring active:bg-yellow-500 sm:w-auto"
                            onClick={undoDismiss}

                            disabled={dismissedRequests.length === 0}
                        >

                            Undo
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<CheckCircleIcon />}
                  
                            className="block w-full rounded bg-green-700 px-12 py-6 text-sm font-medium text-white shadow hover:bg-white hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
                            onClick={() => {
                                connectCard();

                            }}>
                            Connect
                        </Button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateRows: '1fr auto', height: '100vh', marginTop: "4rem" }}>
                        <Modal
                            open={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    bgcolor: 'background.paper',
                                    boxShadow: 24,
                                    p: 4,
                                    maxHeight: '90vh',
                                    overflow: 'auto'
                                }}
                            >
                                <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                    }}
                                >
                                    <CloseIcon fontSize="large" />
                                </IconButton>
                                <SendAMessage
                                    user={connectedUser}
                                />

                            </Box>
                        </Modal>
                        <div {...swipeHandlers} style={{ position: 'relative' }}>

                        {[...requestsWithFilters].reverse().map((request, index) => {
                                currentIndexRef.current = index;
                                const even = index % 2 === 0;
                                const rotation = even ? index * 1 : -index * 1; // degrees
                                const translateY = index * 4; // pixels


                                // Apply the swipe handlers to the top card only
                                const appliedSwipeHandlers = index === 0 ? swipeHandlers : {};


                                return (

                                    <div
                                        key={index}
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            transform: `translateY(-${translateY}px) rotate(${rotation}deg) translateX(${cardPosition}px)`,
                                            transition: 'transform 0.3s',
                                            cursor: 'pointer',
                                        }}
                                        {...appliedSwipeHandlers}
                                    >

                                        <RequestCard request={request} />

                                    </div>

                                );
                            })}

                        </div>

                        {notificationType && (
                            <div className={`notification ${notificationType}`} style={{ fontSize: '5em' }}>
                                {notificationType === 'connect' ? (
                                    <CheckCircleOutlineIcon style={{ fontSize: '4em' }} />
                                ) : notificationType === 'dismiss' ? (
                                    <HighlightOffIcon style={{ fontSize: '4em' }} />
                                ) : notificationType === 'undo' ? (
                                    <ReplayIcon style={{ fontSize: '4em' }} />
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    
    );
};

export default SeeRequests;