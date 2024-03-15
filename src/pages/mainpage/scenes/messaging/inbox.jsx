import 'react-chat-elements/dist/main.css';
import { MessageBox, ChatList, Input, MessageList } from 'react-chat-elements';
import { Button as ChatButton } from 'react-chat-elements';
import { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, Paper, Button, Modal } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CloseIcon from '@mui/icons-material/Close';
import UserProfileCardOthers from '../profileCard/profileCardOthers';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import grey from "@mui/material"



const Inbox = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([])
    const [selectedChat, setSelectedChat] = useState(null);
    const [otherUserName, setOtherUserName] = useState('');
    const messagesEndRef = useRef(null);
    const scrollableContainerRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [otherUserId, setOtherUserId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);



    useEffect(() => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
        }
    }, [messages]);


    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleDeleteChat = async () => {
        if (selectedChat && selectedChat.conversation_id) {
            const conversationId = selectedChat.conversation_id;

            // Call the API to delete the conversation on the backend
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/deleteConversation`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    conversation_id: conversationId
                })
            });

            if (response.ok) {
                // Remove the chat from the conversations array in the UI
                setConversations(conversations.filter(conversation => conversation.conversation_id !== conversationId));
            } else {
                console.error('Failed to delete conversation');
            }
        }

        // Close the delete dialog and reset the selected chat
        setOpenDeleteDialog(false);
        setSelectedChat(null);
    };


    const [messageContent, setMessageContent] = useState('');

    const handleSendMessage = (messageContent, userId) => {
        const { conversation_id, receiver_id, sender_id, request_uid } = messages[0];

        const otherUserId = sender_id === userId ? receiver_id : sender_id;

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/sendMessage/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                conversation_id,
                receiver_id: otherUserId,
                content: messageContent,
                request_uid
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Update the local state after the message is successfully sent so message is rendered without using further GET requests
                setMessages(prevMessages => [...prevMessages, {
                    conversation_id,
                    receiver_id,
                    content: messageContent,
                    request_uid,
                    sender_id: userId,  // Assuming userId is the id of the current user
                    timestamp: new Date().toISOString(),  // Assuming the backend expects an ISO string
                }]);
                // Clear the text box
                setMessageContent('');
                fetchUpdatedConversations()
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    const handleChatClick = (chat) => {
        if (selectedChat && selectedChat.conversation_id === chat.conversation_id) {
            setSelectedChat(null);
        } else {
            setSelectedChat(chat);
            const nameAndLastName = chat.title.split(' - ')[0]; // This will give you 'Alex tio'
            setOtherUserName(nameAndLastName);
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getMessage/${chat.conversation_id}/messages`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    setMessages(data);
                    const otherUserId = data[0].sender_id === userId ? data[0].receiver_id : data[0].sender_id;
                    setOtherUserId(otherUserId);

                    // Update the read status of the messages in the clicked conversation
                    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/updateMessagesStatus`, {  // Replace with the actual endpoint
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            conversation_id: chat.conversation_id,
                            receiver_id: userId,
                            status: 'read'
                        }),
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Message status updated:', data);
                        })
                        .catch(error => {
                            console.error('Error updating message status:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    const fetchUpdatedConversations = () => {
        // First, fetch the conversation table to determine which conversations should not be rendered
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getMessage/conversationsTable`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => response.json())
        .then(data => {
            const userId = data.userId; // Retrieve the user ID from the response
    
            // Extract the conversation IDs that should not be rendered
            const conversationIdsToSkip = data.conversations
                .filter(conversation => (conversation.deleted_user1 && conversation.user1_id === userId) || (conversation.deleted_user2 && conversation.user2_id === userId))
                .map(conversation => conversation.conversation_id);
    
            return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getMessage/conversations`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then(response => response.json())
            .then(data => {
                const filteredConversations = data.conversations.filter(conversation => !conversationIdsToSkip.includes(conversation.conversation_id));

                // Sort and process the remaining conversations 
                const sortedConversations = filteredConversations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                const uniqueConversations = Array.from(new Set(sortedConversations.map(conversation => conversation.conversation_id)))
                    .map(conversation_id => {
                        const conversation = sortedConversations.find(conversation => conversation.conversation_id === conversation_id);
                        const unread = sortedConversations.filter(c =>
                            c.conversation_id === conversation_id &&
                            c.status === 'unread' &&
                            c.receiver_id === data.userId
                        ).length;
                        return { ...conversation, unread };
                    });
                setConversations(uniqueConversations);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    useEffect(() => {
        fetchUpdatedConversations()
    }, [])

    return (

        <Paper elevation={3} style={{ display: 'flex', flexDirection: 'row', height: '120vh' }}>

            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete this chat?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this chat? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteChat} color="primary" variant="contained" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Box width={selectedChat ? '33%' : '100%'} height="100%" overflow="auto">
                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '10%',
                            left: '10%',
                            width: '80%',
                            maxHeight: '85vh',
                            overflow: 'auto',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <IconButton
                            aria-label="close"
                            onClick={() => setIsModalOpen(false)}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <CloseIcon fontSize="large" />
                        </IconButton>
                        <UserProfileCardOthers userId={otherUserId} />

                    </Box>
                </Modal>
                <Box display="flex" alignItems="center" padding={2}>
                    <IconButton>
                        <MailOutlineIcon />
                    </IconButton>
                    <Typography variant="h6">Inbox</Typography>
                </Box>
                {conversations.length === 0 && (
                    <Paper elevation={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40%', padding: '16px', width: '50%', margin: 'auto' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'grey.700' }}>
                            It looks like your Inbox is empty! Send a message to another climber and you will be able to see it at this section.
                        </Typography>
                    </Paper>
                )}

                <ChatList
                    className='chat-list'
                    onClick={(chat) => handleChatClick(chat)}
                    dataSource={conversations.map((conversation, index) => {
                        const lastSender = conversation.sender_id;
                        const subtitle = lastSender === userId ? `Me: ${conversation.content}` : `Other: ${conversation.content}`;

                        return {
                            avatar: conversation.profile_picture,
                            title: conversation.request_uid
                                ? `${conversation.name} ${conversation.last_name} - About climbing request ${conversation.request_uid}`
                                : `${conversation.name} ${conversation.last_name}`,
                            subtitle: subtitle,
                            date: new Date(conversation.timestamp),
                            unread: conversation.unread,
                            conversation_id: conversation.conversation_id,
                        };
                    })}
                />
            </Box>

            {selectedChat && (

                <Box width="67%" height="100%" display="flex" flexDirection="column">

                    <Box flexGrow={1}>
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton
                                onClick={() => setSelectedChat(null)}
                                style={{ right: 0 }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Box
                            display="flex"
                            border={1}
                            borderColor="grey.500"
                            borderRadius={1}
                            p={2}
                            mx={2}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Box>
                                Conversation with{" "}
                                <span
                                    style={{
                                        cursor: "pointer",
                                        marginLeft: "8px",
                                        fontWeight: "600", // Adjust the default font weight as needed
                                        color: "#506c7f", // Blue/grey color
                                        transition: "color 0.3s, font-weight 0.3s", // Smooth transition for color and font-weight
                                    }}
                                    onClick={() => setIsModalOpen(true)}
                                    onMouseEnter={(e) => (e.target.style.fontWeight = "bold")}
                                    onMouseLeave={(e) => (e.target.style.fontWeight = "600")} // Reset to the default font weight on hover out
                                >
                                    {otherUserName}
                                </span>
                            </Box>
                            <IconButton onClick={handleOpenDeleteDialog}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        <Box border={1} borderColor="grey.500" borderRadius={1} p={2} m={2} height="80vh" overflow="auto" ref={scrollableContainerRef}>

                            <MessageList
                                key={messages.length}
                                className='message-list'
                                lockable={true}
                                toBottomHeight={'100%'}
                                dataSource={messages.map((message, index) => ({
                                    position: message.sender_id === userId ? "right" : "left",
                                    type: "text",
                                    title: message.sender_id === userId ? "You" : <span onClick={() => setIsModalOpen(true)}>{otherUserName}</span>,
                                    text: message.content,
                                    date: new Date(message.timestamp),
                                }))}
                                scrollToBottom={true}
                            />

                        </Box>
                        <Box border={1} borderColor="grey.500" borderRadius={1} p={1} m={2} display="flex" alignItems="center">
                            <textarea
                                placeholder="Type here..."
                                value={messageContent}
                                onChange={(event) => setMessageContent(event.target.value)}
                                style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                            <Box marginLeft="10px">
                                <ChatButton
                                    text='Send'
                                    onClick={() => handleSendMessage(messageContent, userId)}
                                />
                            </Box>
                        </Box>
                    </Box>

                </Box>
            )}
        </Paper>

    );
}

export default Inbox;