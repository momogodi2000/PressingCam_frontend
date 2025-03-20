import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Paperclip, Image, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ClientsLayout from '../../Layout/clients_layout'; // Import the ClientsLayout

//import images 
import Avarta from '../../../../assets/images/avarta.webp';

// Example data - In a real app, this would come from an API
const SAMPLE_CONVERSATIONS = [
  {
    id: 1,
    name: "Support Contour Wash",
    avatar: Avarta, // Use the imported image variable here
    lastMessage: "Votre commande a été ramassée avec succès.",
    time: "10:30",
    unread: 1,
    isAdmin: true,
    messages: [
      { id: 1, text: "Bonjour, votre commande #CW2503 a été programmée pour ramassage aujourd'hui entre 14h et 16h.", sender: "them", time: "09:15", date: "Aujourd'hui" },
      { id: 2, text: "Merci, quelqu'un sera présent pour la remise.", sender: "me", time: "09:20", date: "Aujourd'hui" },
      { id: 3, text: "Parfait. Notre livreur Paul arrivera dans cet intervalle.", sender: "them", time: "09:22", date: "Aujourd'hui" },
      { id: 4, text: "Votre commande a été ramassée avec succès.", sender: "them", time: "10:30", date: "Aujourd'hui" },
    ]
  },
  {
    id: 2,
    name: "Paul Ndjomo (Livreur)",
    avatar: Avarta, // Use the imported image variable here
    lastMessage: "Je suis en route pour la livraison.",
    time: "Hier",
    unread: 0,
    isAdmin: false,
    messages: [
      { id: 1, text: "Bonjour, je suis votre livreur assigné pour aujourd'hui.", sender: "them", time: "15:40", date: "Hier" },
      { id: 2, text: "Je suis en route pour la livraison.", sender: "them", time: "15:45", date: "Hier" },
    ]
  }
];


const MessagesPage = () => {
  const [conversations, setConversations] = useState(SAMPLE_CONVERSATIONS);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showConversations, setShowConversations] = useState(true);
  const messagesEndRef = useRef(null);

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation]);

  // Select a conversation and mark it as read
  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    
    // Mark as read
    setConversations(conversations.map(conv => 
      conv.id === conversation.id 
        ? {...conv, unread: 0} 
        : conv
    ));
    
    if (isMobile) {
      setShowConversations(false);
    }
  };

  // Send a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const updatedMessage = {
      id: activeConversation.messages.length + 1,
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: "Aujourd'hui"
    };
    
    // Update the active conversation
    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, updatedMessage],
      lastMessage: newMessage,
      time: 'À l\'instant'
    };
    
    setActiveConversation(updatedConversation);
    
    // Update the conversations list
    setConversations(conversations.map(conv => 
      conv.id === updatedConversation.id 
        ? updatedConversation 
        : conv
    ));
    
    setNewMessage('');
    
    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Go back to conversations list on mobile
  const handleBackToList = () => {
    setShowConversations(true);
  };

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groupedMessages = {};
    
    messages.forEach(message => {
      if (!groupedMessages[message.date]) {
        groupedMessages[message.date] = [];
      }
      groupedMessages[message.date].push(message);
    });
    
    return groupedMessages;
  };

  return (
    <ClientsLayout> {/* Wrap the content with ClientsLayout */}
      <div className="flex flex-col h-full bg-gray-50">
        <div className="bg-blue-600 text-white p-4 shadow-md">
          <h1 className="text-xl font-semibold">Messages</h1>
          <p className="text-blue-100 text-sm">
            Communiquez avec notre équipe et suivez vos commandes
          </p>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Conversations List */}
          <AnimatePresence>
            {(showConversations || !isMobile) && (
              <motion.div 
                className={`${isMobile ? 'w-full' : 'w-1/3'} border-r border-gray-200 bg-white`}
                initial={{ x: isMobile ? -300 : 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Conversations</h2>
                </div>
                
                {conversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 p-4 text-center text-gray-500">
                    <p>Aucune conversation pour le moment</p>
                    <p className="text-sm mt-2">Vos échanges avec notre équipe apparaîtront ici</p>
                  </div>
                ) : (
                  <div className="overflow-y-auto h-full">
                    {conversations.map(conversation => (
                      <div 
                        key={conversation.id}
                        className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors duration-200 ${activeConversation?.id === conversation.id ? 'bg-blue-50' : ''}`}
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <div className="relative">
                          <img 
                            src={conversation.avatar} 
                            alt={conversation.name} 
                            className="w-12 h-12 rounded-full"
                          />
                          {conversation.isAdmin && (
                            <span className="absolute bottom-0 right-0 bg-blue-600 w-4 h-4 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-medium text-gray-900">{conversation.name}</h3>
                            <span className="text-xs text-gray-500">{conversation.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate w-48">{conversation.lastMessage}</p>
                        </div>
                        
                        {conversation.unread > 0 && (
                          <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-2">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Conversation Detail */}
          <AnimatePresence>
            {(!showConversations || !isMobile) && activeConversation ? (
              <motion.div 
                className={`${isMobile ? 'w-full' : 'w-2/3'} flex flex-col bg-white`}
                initial={{ x: isMobile ? 300 : 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Conversation Header */}
                <div className="flex items-center p-4 border-b border-gray-200 shadow-sm">
                  {isMobile && (
                    <button 
                      onClick={handleBackToList} 
                      className="mr-2 text-gray-600 hover:text-gray-900"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}
                  
                  <img 
                    src={activeConversation.avatar} 
                    alt={activeConversation.name} 
                    className="w-10 h-10 rounded-full"
                  />
                  
                  <div className="ml-3">
                    <h3 className="font-medium">{activeConversation.name}</h3>
                    <p className="text-xs text-gray-500">
                      {activeConversation.isAdmin ? 'Support Contour Wash' : 'Livreur'}
                    </p>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {Object.entries(groupMessagesByDate(activeConversation.messages)).map(([date, messages]) => (
                    <div key={date}>
                      <div className="flex justify-center my-4">
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {date}
                        </span>
                      </div>
                      
                      {messages.map(message => (
                        <motion.div 
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex mb-4 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-xs md:max-w-md py-2 px-4 rounded-lg ${
                              message.sender === 'me' 
                                ? 'bg-blue-600 text-white rounded-br-none' 
                                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 text-right ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                              {message.time}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <div className="flex space-x-2 mr-2">
                      <button type="button" className="text-gray-500 hover:text-blue-600">
                        <Paperclip size={20} />
                      </button>
                      <button type="button" className="text-gray-500 hover:text-blue-600">
                        <Image size={20} />
                      </button>
                      <button type="button" className="text-gray-500 hover:text-blue-600">
                        <MapPin size={20} />
                      </button>
                    </div>
                    
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Écrivez votre message..."
                      className="flex-1 rounded-full py-2 px-4 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-colors duration-200"
                    />
                    
                    <button 
                      type="submit" 
                      disabled={!newMessage.trim()}
                      className={`ml-2 rounded-full w-10 h-10 flex items-center justify-center ${
                        newMessage.trim() ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : !activeConversation && !isMobile ? (
              <div className="w-2/3 flex flex-col items-center justify-center bg-white">
                <img 
                  src={Avarta} 
                  alt="Select a conversation" 
                  className="w-24 h-24 opacity-30"
                />
                <p className="mt-4 text-gray-500">Sélectionnez une conversation pour commencer</p>
              </div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </ClientsLayout>
  );
};

export default MessagesPage;