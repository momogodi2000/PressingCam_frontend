import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, Mail, MailOpen, Search, Filter,
  X, Check, ArrowLeft, ArrowRight
} from 'lucide-react';
import ContactService from '../../../../Services/admin/admin_contact';
import AdminLayout from '../../../Dashboard/Layout/admin_layout'; // Import the AdminLayout

const ContactManagementPage = () => {
  // State management
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [filters, setFilters] = useState({ name: '', email: '', subject: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch contacts on component mount and whenever filters or page changes
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        const response = await ContactService.getContactMessages({
          ...filters,
          page: currentPage
        });
        
        if (response.success) {
          setContacts(response.data.results || response.data || []);
          // If your API returns pagination info:
          if (response.data && response.data.count) {
            setTotalPages(Math.ceil(response.data.count / 10)); // Assuming 10 per page
          }
        } else {
          showNotification(response.error || 'Failed to fetch contacts', 'error');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        showNotification('An error occurred while fetching contacts', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [filters, currentPage]);

  const fetchContactDetail = async (id) => {
    try {
      setIsLoading(true);
      const response = await ContactService.getContactDetail(id);
      
      if (response.success) {
        setSelectedContact(response.data);
        // Generate default response
        setResponseText(
          `Dear ${response.data.name},\n\nThank you for contacting us regarding '${response.data.subject}'.\n\nWe have received your message and will address your inquiry as soon as possible. If you have any additional questions, please don't hesitate to reach out.\n\nBest regards,\nThe Support Team`
        );
      } else {
        showNotification(response.error || 'Failed to fetch contact details', 'error');
      }
    } catch (error) {
      console.error('Error fetching contact details:', error);
      showNotification('An error occurred while fetching contact details', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        setIsLoading(true);
        const response = await ContactService.deleteContact(id);
        
        if (response.success) {
          showNotification('Contact message deleted successfully', 'success');
          // If the deleted contact is currently selected, clear the selection
          if (selectedContact && selectedContact.id === id) {
            setSelectedContact(null);
          }
          // Refetch contacts
          const contactsResponse = await ContactService.getContactMessages({
            ...filters,
            page: currentPage
          });
          
          if (contactsResponse.success) {
            setContacts(contactsResponse.data.results || contactsResponse.data || []);
          }
        } else {
          showNotification(response.error || 'Failed to delete contact', 'error');
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        showNotification('An error occurred while deleting the contact', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmitResponse = async () => {
    if (!selectedContact) return;
    
    try {
      setIsLoading(true);
      const response = await ContactService.respondToContact(selectedContact.id, {
        response: responseText
      });
      
      if (response.success) {
        showNotification('Response sent successfully', 'success');
        // Refresh the contacts list to update the is_responded status
        const contactsResponse = await ContactService.getContactMessages({
          ...filters,
          page: currentPage
        });
        
        if (contactsResponse.success) {
          setContacts(contactsResponse.data.results || contactsResponse.data || []);
        }
        
        // Update the local state of the selected contact
        setSelectedContact({
          ...selectedContact,
          is_responded: true
        });
        setIsResponding(false);
      } else {
        showNotification(response.error || 'Failed to send response', 'error');
      }
    } catch (error) {
      console.error('Error sending response:', error);
      showNotification('An error occurred while sending the response', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ name: '', email: '', subject: '' });
    setShowFilters(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <AdminLayout> {/* Wrap the existing content with AdminLayout */}
      <div className="min-h-screen bg-gray-50">
        {/* Notification */}
        <AnimatePresence>
          {notification.show && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
                notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white font-medium`}
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Contact Message Management</h1>
          
          {/* Loading overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-full">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left column: Contacts list */}
            <div className="w-full lg:w-2/5 bg-white rounded-xl shadow-md overflow-hidden">
              {/* Search and filters */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">Messages</h2>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition"
                  >
                    <Filter className="w-4 h-4 mr-1" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>
                </div>
                
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 mb-3">
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={filters.name}
                            onChange={handleFilterChange}
                            placeholder="Filter by name"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          />
                          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                        </div>
                        
                        <div className="relative">
                          <input
                            type="text"
                            name="email"
                            value={filters.email}
                            onChange={handleFilterChange}
                            placeholder="Filter by email"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          />
                          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                        </div>
                        
                        <div className="relative">
                          <input
                            type="text"
                            name="subject"
                            value={filters.subject}
                            onChange={handleFilterChange}
                            placeholder="Filter by subject"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          />
                          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      
                      <button
                        onClick={clearFilters}
                        className="text-xs text-gray-600 hover:text-gray-800 underline"
                      >
                        Clear all filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Contact list */}
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {!contacts || contacts.length === 0 ? (
                  <div className="py-12 text-center text-gray-500">
                    {filters.name || filters.email || filters.subject ? 
                      'No messages match your filter criteria' : 
                      'No contact messages available'}
                  </div>
                ) : (
                  <AnimatePresence>
                    {contacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => fetchContactDetail(contact.id)}
                        className={`p-4 hover:bg-blue-50 transition cursor-pointer ${
                          selectedContact && selectedContact.id === contact.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-gray-900 truncate mr-2">
                            {contact.subject || 'No Subject'}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {contact.is_responded ? (
                              <span className="flex items-center text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                <Check className="w-3 h-3 mr-1" />
                                Responded
                              </span>
                            ) : (
                              <span className="flex items-center text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                                <Mail className="w-3 h-3 mr-1" />
                                New
                              </span>
                            )}
                            <button
                              onClick={(e) => handleDelete(contact.id, e)}
                              className="text-gray-400 hover:text-red-500 transition"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-1 truncate">
                          From: {contact.name || 'Unknown'} ({contact.email || 'No email'})
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(contact.created_at)}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center p-4 border-t border-gray-200">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center text-sm ${
                      currentPage === 1 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`flex items-center text-sm ${
                      currentPage === totalPages 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}
            </div>

            {/* Right column: Message details and response */}
            <div className="w-full lg:w-3/5">
              {selectedContact ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-semibold text-gray-800 mb-1">
                        {selectedContact.subject || 'No Subject'}
                      </h2>
                      <div className="flex items-center space-x-2">
                        {selectedContact.is_responded ? (
                          <span className="flex items-center text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
                            <Check className="w-4 h-4 mr-1" />
                            Responded
                          </span>
                        ) : (
                          <button
                            onClick={() => setIsResponding(true)}
                            className="flex items-center text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                          >
                            <MailOpen className="w-4 h-4 mr-2" />
                            Respond
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedContact(null)}
                          className="text-gray-400 hover:text-gray-600 transition"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      From <span className="font-medium">{selectedContact.name || 'Unknown'}</span> &lt;{selectedContact.email || 'No email'}&gt; on {formatDate(selectedContact.created_at)}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <p className="text-gray-800 whitespace-pre-line">{selectedContact.message || 'No message content'}</p>
                    </div>
                    
                    <AnimatePresence>
                      {isResponding && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <h3 className="text-lg font-medium text-gray-800 mb-2">Your Response</h3>
                          <textarea
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4 transition"
                            placeholder="Type your response here..."
                          ></textarea>
                          
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={() => setIsResponding(false)}
                              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSubmitResponse}
                              disabled={!responseText.trim()}
                              className={`px-4 py-2 text-white rounded-lg transition ${
                                responseText.trim() 
                                  ? 'bg-blue-600 hover:bg-blue-700' 
                                  : 'bg-blue-400 cursor-not-allowed'
                              }`}
                            >
                              Send Response
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl shadow-md flex flex-col items-center justify-center text-center p-12 h-full"
                >
                  <Mail className="w-16 h-16 text-gray-300 mb-4" />
                  <h2 className="text-xl font-medium text-gray-700 mb-2">No message selected</h2>
                  <p className="text-gray-500 max-w-md">
                    Select a message from the list to view its details and respond to it.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactManagementPage;