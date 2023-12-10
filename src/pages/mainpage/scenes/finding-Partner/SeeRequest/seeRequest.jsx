import React, { useState, useEffect, useRef } from 'react';
import RequestCard from '../../../components/requestCard';
import { useSwipeable } from 'react-swipeable';
import Button from "@mui/material/Button";
import UndoIcon from '@mui/icons-material/Undo';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';

const SeeRequests = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dismissedRequests, setDismissedRequests] = useState([]);
    const [connectedCards, setConnectedCards] = useState([]);
    const currentIndexRef = useRef(0);
    const [notificationType, setNotificationType] = useState(null);

    const [cardPosition, setCardPosition] = useState(0);

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
        setRequests(remainingCards);
        setNotificationType('connect');
        setTimeout(() => setNotificationType(null), 1000); // Set timeout for the notification to disappear
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
                <div style={{ display: 'grid', gridTemplateRows: '1fr auto', height: '100vh', marginTop: "4rem" }}>
                    <div {...swipeHandlers} style={{ position: 'relative' }}>

                        {[...requests].reverse().map((request, index) => {
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 1000 }}>
                        <Button
                            variant="contained"
                            startIcon={<CloseIcon />}
                            style={{ width: '150px', height: '60px', fontSize: '1.25rem' }}
                            className="block w-full rounded bg-red-700 px-16 py-4 text-lg font-medium text-white shadow hover:bg-white hover:text-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto" onClick={() => {
                                dismissCard();

                            }}
                        >
                            Dismiss
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<UndoIcon />}
                            style={{ width: '150px', height: '60px', fontSize: '1.25rem' }}
                            className="undo-button block w-full rounded bg-yellow-700 px-12 py-6 text-sm font-medium text-white shadow hover:bg-white hover:text-yellow-700 focus:outline-none focus:ring active:bg-yellow-500 sm:w-auto"
                            onClick={undoDismiss}

                            disabled={dismissedRequests.length === 0}
                        >

                            Undo
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<CheckCircleIcon />}
                            style={{ width: '150px', height: '60px', fontSize: '1.25rem' }}
                            className="block w-full rounded bg-green-700 px-12 py-6 text-sm font-medium text-white shadow hover:bg-white hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
                            onClick={() => {
                                connectCard();

                            }}>
                            Connect
                        </Button>
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
            )}
        </div>
    );
};

export default SeeRequests;