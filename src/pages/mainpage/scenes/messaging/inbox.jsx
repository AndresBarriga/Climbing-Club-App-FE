import 'react-chat-elements/dist/main.css';
import { MessageBox, ChatList, Input, Button, MessageList } from 'react-chat-elements';
import { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, Paper, Modal } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CloseIcon from '@mui/icons-material/Close';
import UserProfileCardOthers from '../profileCard/profileCardOthers';


const Inbox = () => {
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([])
    const [selectedChat, setSelectedChat] = useState(null);
    const [userId, setUserId] = useState()
    const [otherUserName, setOtherUserName] = useState('');
    const messagesEndRef = useRef(null);
    const scrollableContainerRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [otherUserId, setOtherUserId] = useState(null);

    useEffect(() => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
        }
    }, [messages]);


    const [messageContent, setMessageContent] = useState('');

    console.log("MEssage", messages)
    const handleSendMessage = (messageContent) => {
        const { conversation_id, receiver_id, request_uid } = messages[0];

        fetch('http://localhost:3001/api/sendMessage/answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                conversation_id,
                receiver_id,
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
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    const handleChatClick = (chat) => {
        if (selectedChat && selectedChat.conversation_id === chat.conversation_id) {
            setSelectedChat(null);
        } else {
            console.log('Chat clicked:', chat);
            setSelectedChat(chat);
            const nameAndLastName = chat.title.split(' - ')[0]; // This will give you 'Alex tio'
            setOtherUserName(nameAndLastName);
            fetch(`http://localhost:3001/api/getMessage/${chat.conversation_id}/messages`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Messagr received from server:', data);
                    setMessages(data);
                    const otherUserId = data[0].sender_id === userId ? data[0].receiver_id : data[0].sender_id;
                    setOtherUserId(otherUserId);

                    // Update the read status of the messages in the clicked conversation
                    fetch('http://localhost:3001/api/updateMessagesStatus', {  // Replace with the actual endpoint
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

    useEffect(() => {
        fetch('http://localhost:3001/api/getMessage/conversations', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data received from server:', data);
                const sortedConversations = data.conversations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Ordering conversation by latest on top
                const uniqueConversations = Array.from(new Set(sortedConversations.map(conversation => conversation.conversation_id))) // Sets allow to only show unique values, so conversations are not rendered twice
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
                setUserId(data.userId)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])

    return (

        <Paper elevation={3} style={{ display: 'flex', flexDirection: 'row', height: '120vh' }}>
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

                <ChatList
                    className='chat-list'
                    onClick={(chat) => handleChatClick(chat)}
                    dataSource={conversations.map((conversation, index) => ({
                        avatar: conversation.profile_picture,
                        title: conversation.request_uid
                            ? `${conversation.name} ${conversation.last_name} - About climbing request ${conversation.request_uid}`
                            : `${conversation.name} ${conversation.last_name}`,
                        subtitle: conversation.content,
                        date: new Date(conversation.timestamp),
                        unread: conversation.unread,
                        conversation_id: conversation.conversation_id,
                    }))}
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
>
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
                        <Box border={1} borderColor="grey.500" borderRadius={1} p={1} m={2}>
                            <Input
                                placeholder="Type here..."
                                multiline
                                onChange={(event) => setMessageContent(event.target.value)}
                                rightButtons={
                                    <Button
                                        text='Send'
                                        onClick={() => handleSendMessage(messageContent)}
                                    />
                                }
                            />
                        </Box>
                    </Box>

                </Box>
            )}
        </Paper>

    );
}

export default Inbox;