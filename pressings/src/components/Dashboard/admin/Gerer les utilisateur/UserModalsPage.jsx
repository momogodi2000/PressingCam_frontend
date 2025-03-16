import React from 'react';
import { X } from 'lucide-react';
import UserFormPage from './UserFormPage';
import UserStatsModal from './UserStatsModal';
import AdminUserService from '../../../../Services/admin/crud_services';

const UserModalsPage = ({
  showAddModal,
  setShowAddModal,
  showEditModal,
  setShowEditModal,
  showDeleteModal,
  setShowDeleteModal,
  showStatsModal,
  setShowStatsModal,
  currentUser,
  fetchUsers,
  userStats,
}) => {
  const handleAddSubmit = async (formData) => {
    // Handle add user logic
    try {
      await AdminUserService.createUser(formData);
      setShowAddModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditSubmit = async (formData) => {
    // Handle edit user logic
    try {
      await AdminUserService.updateUser(currentUser.id, formData);
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async () => {
    // Handle delete user logic
    try {
      await AdminUserService.deleteUser(currentUser.id);
      setShowDeleteModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Improved Modal Component with fixed z-index and proper event handling
  const ModalBackdrop = ({ onClose, children }) => (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        // Only close if the backdrop itself was clicked
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true"></div>
      
      {/* Modal Content - positioned relative to overlay */}
      <div className="relative z-50 mx-auto max-w-lg w-full">
        {children}
      </div>
    </div>
  );

  return (
    <>
      {/* Add User Modal */}
      {showAddModal && (
        <ModalBackdrop onClose={() => setShowAddModal(false)}>
          <UserFormPage
            isEdit={false}
            onSubmit={handleAddSubmit}
            onClose={() => setShowAddModal(false)}
          />
        </ModalBackdrop>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <ModalBackdrop onClose={() => setShowEditModal(false)}>
          <UserFormPage
            isEdit={true}
            currentUser={currentUser}
            onSubmit={handleEditSubmit}
            onClose={() => setShowEditModal(false)}
          />
        </ModalBackdrop>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && (
        <ModalBackdrop onClose={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Delete User</h3>
              <button
                type="button"
                className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                onClick={() => setShowDeleteModal(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-red-50 rounded-md border-l-4 border-red-500">
              <h4 className="text-md font-medium text-gray-800 mb-2">User Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Name:</span>{' '}
                  {currentUser?.first_name && currentUser?.last_name
                    ? `${currentUser.first_name} ${currentUser.last_name}`
                    : 'Not provided'}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {currentUser?.email || 'Not provided'}
                </div>
                <div>
                  <span className="font-medium">Role:</span>{' '}
                  {currentUser?.role ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1) : 'Not provided'}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{' '}
                  {currentUser?.is_active !== undefined ? (currentUser.is_active ? 'Active' : 'Inactive') : 'Unknown'}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-2">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            
            <p className="text-sm text-red-600 font-medium mb-4">
              All data associated with this account will be permanently removed.
            </p>
            
            <div className="mt-6 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleDeleteUser}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </ModalBackdrop>
      )}

      {/* Statistics Modal */}
      {showStatsModal && (
        <ModalBackdrop onClose={() => setShowStatsModal(false)}>
          <UserStatsModal userStats={userStats} onClose={() => setShowStatsModal(false)} />
        </ModalBackdrop>
      )}
    </>
  );
};

export default UserModalsPage;