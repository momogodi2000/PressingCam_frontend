import React, { useState, useContext, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, X, PlusCircle, Edit, Trash2, Check } from 'lucide-react';
import { LanguageContext } from '../../Layout/admin_layout';
import AdminUserService from '../../../../Services/admin/crud_services';
import UserModalsPage from './UserModalsPage';
import AdminLayout from '../../Layout/admin_layout';

const UserListPage = () => {
  const { language } = useContext(LanguageContext) || { language: 'en' };
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const usersPerPage = 10;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await AdminUserService.getAllUsers();
      setUsers(data);
    } catch (error) {
      setError("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const stats = await AdminUserService.getUserStats();
      setUserStats(stats);
      setShowStatsModal(true);
    } catch (error) {
      setError("Failed to fetch user statistics. Please try again.");
      console.error("Error fetching user statistics:", error);
    }
  };

  const filteredUsers = React.useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        (user.email && user.email.toLowerCase().includes(lowerSearchTerm)) ||
        (user.first_name && user.first_name.toLowerCase().includes(lowerSearchTerm)) ||
        (user.last_name && user.last_name.toLowerCase().includes(lowerSearchTerm)) ||
        (user.phone_number && user.phone_number.includes(searchTerm))
    );
  }, [users, searchTerm]);

  const paginatedUsers = React.useMemo(() => {
    return filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);
  }, [filteredUsers, page, usersPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));

  const translations = {
    en: {
      userManagement: "User Management",
      manageUsers: "Manage all user accounts from this dashboard",
      viewStatistics: "View Statistics",
      addUser: "Add User",
      searchUsers: "Search users by name, email or phone...",
      noUsersFound: "No users found.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      role: "Role",
      status: "Status",
      verified: "Verified",
      actions: "Actions",
      active: "Active",
      inactive: "Inactive",
      showing: "Showing",
      to: "to",
      of: "of",
      results: "results",
      previous: "Previous",
      next: "Next"
    },
    fr: {
      userManagement: "Gestion des Utilisateurs",
      manageUsers: "Gérez tous les comptes utilisateurs à partir de ce tableau de bord",
      viewStatistics: "Voir les Statistiques",
      addUser: "Ajouter un Utilisateur",
      searchUsers: "Rechercher des utilisateurs par nom, email ou téléphone...",
      noUsersFound: "Aucun utilisateur trouvé.",
      name: "Nom",
      email: "Email",
      phone: "Téléphone",
      role: "Rôle",
      status: "Statut",
      verified: "Vérifié",
      actions: "Actions",
      active: "Actif",
      inactive: "Inactif",
      showing: "Affichage de",
      to: "à",
      of: "sur",
      results: "résultats",
      previous: "Précédent",
      next: "Suivant"
    },
  };

  const t = translations[language] || translations.en;

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchUsers}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <AdminLayout 
      activeTab="users" 
      setActiveTab={() => {}} 
      searchQuery={searchTerm} 
      setSearchQuery={setSearchTerm}
    >
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.userManagement}</h1>
            <p className="mt-1 text-sm text-gray-500">{t.manageUsers}</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <button
              onClick={fetchUserStats}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t.viewStatistics}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              {t.addUser}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t.searchUsers}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          {isLoading ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">{t.noUsersFound}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.name}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.email}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.phone}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.role}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.status}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.verified}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="transition-opacity duration-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 font-medium">
                              {user.first_name && user.last_name
                                ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
                                : user.email ? user.email.charAt(0).toUpperCase() : '?'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.first_name && user.last_name
                                ? `${user.first_name} ${user.last_name}`
                                : 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.date_joined ? `Joined: ${new Date(user.date_joined).toLocaleDateString()}` : ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.phone_number || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : user.role === 'deliver'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {user.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.is_active ? t.active : t.inactive}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.is_email_verified ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setCurrentUser(user);
                            setShowEditModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          aria-label={`Edit ${user.email}`}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentUser(user);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                          aria-label={`Delete ${user.email}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredUsers.length > usersPerPage && (
          <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200 sm:px-6 rounded-b-lg">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t.previous}
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  page === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t.next}
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  {t.showing} <span className="font-medium">{(page - 1) * usersPerPage + 1}</span> {t.to}{' '}
                  <span className="font-medium">
                    {Math.min(page * usersPerPage, filteredUsers.length)}
                  </span>{' '}
                  {t.of} <span className="font-medium">{filteredUsers.length}</span> {t.results}
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={i}
                        onClick={() => setPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                          page === pageNum
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                        aria-label={`Page ${pageNum}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      page === totalPages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <UserModalsPage
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          showStatsModal={showStatsModal}
          setShowStatsModal={setShowStatsModal}
          currentUser={currentUser}
          fetchUsers={fetchUsers}
          userStats={userStats}
        />
      </div>
    </AdminLayout>
  );
};

export default UserListPage;