import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Edit2, Save } from 'lucide-react';
import AuthService from '../../../../Services/auth/authentication';

const MonProfile = ({ onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      setFetchLoading(true);
      try {
        const userData = await AuthService.getUserProfile();
        setUser(userData);
        setFormData({
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          email: userData.email || '',
          phone_number: userData.phone_number || '',
        });
      } catch (err) {
        setError('Impossible de récupérer vos informations. Veuillez réessayer.');
        console.error('Error fetching user profile:', err);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Exclude email from update since it's usually not allowed to be changed
      const updateData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
      };

      // Call AuthService to update the profile
      const updatedProfile = await AuthService.updateUserProfile(updateData);
      setSuccess('Profil mis à jour avec succès');
      setIsEditing(false);
      
      // Update the local user data
      setUser({
        ...user,
        ...updatedProfile,
      });

      // Notify the parent component about the update
      if (onUpdate) {
        onUpdate({
          ...user,
          ...updatedProfile,
        });
      }
    } catch (error) {
      setError('Échec de la mise à jour du profil. Veuillez réessayer.');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    // Reset form data to current user data
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
      });
    }
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Mon Profil</h2>
          <p className="text-sm text-gray-500 mt-1">Gérez vos informations personnelles</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {fetchLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Profile Picture */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user?.first_name?.[0] || ''}{user?.last_name?.[0] || ''}
                  {!user?.first_name && !user?.last_name && (user?.email?.[0]?.toUpperCase() || 'U')}
                </div>
              </div>

              {/* Error and Success Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                  {success}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Edit/Save/Cancel Buttons */}
                  <div className="flex justify-end space-x-4">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                          disabled={loading}
                        >
                          <X size={16} className="mr-1" />
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                          disabled={loading}
                        >
                          <Save size={16} className="mr-1" />
                          {loading ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={toggleEditMode}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 size={16} className="mr-1" />
                        Modifier
                      </button>
                    )}
                  </div>

                  {/* First Name */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center text-gray-800 py-2">
                        <User size={18} className="text-gray-500 mr-2" />
                        {formData.first_name || 'Non renseigné'}
                      </div>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Nom</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center text-gray-800 py-2">
                        <User size={18} className="text-gray-500 mr-2" />
                        {formData.last_name || 'Non renseigné'}
                      </div>
                    )}
                  </div>

                  {/* Email (Read-only) */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="flex items-center text-gray-800 py-2">
                      <Mail size={18} className="text-gray-500 mr-2" />
                      {formData.email || 'Non renseigné'}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center text-gray-800 py-2">
                        <Phone size={18} className="text-gray-500 mr-2" />
                        {formData.phone_number || 'Non renseigné'}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonProfile;