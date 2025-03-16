import React from 'react';
import { X, Users, UserCheck, UserX, Percent, Calendar, Activity } from 'lucide-react';

const UserStatsModal = ({ userStats, onClose }) => {
  if (!userStats) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">User Statistics Dashboard</h3>
        <button
          type="button"
          className="bg-white rounded-md text-gray-400 hover:text-gray-500"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Main stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <Users className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-700">Total Users</p>
              <p className="text-2xl font-bold text-blue-800">{userStats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <UserCheck className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-700">Active Users</p>
              <p className="text-2xl font-bold text-green-800">{userStats.activeUsers}</p>
              <p className="text-xs text-green-600">
                {Math.round((userStats.activeUsers / userStats.totalUsers) * 100)}% of total
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 mr-4">
              <UserX className="h-6 w-6 text-red-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-700">Inactive Users</p>
              <p className="text-2xl font-bold text-red-800">{userStats.inactiveUsers}</p>
              <p className="text-xs text-red-600">
                {Math.round((userStats.inactiveUsers / userStats.totalUsers) * 100)}% of total
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Statistics */}
      {userStats.roleDistribution && (
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-700 mb-3">User Role Distribution</h4>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(userStats.roleDistribution).map(([role, count]) => (
                <div key={role} className="flex items-center">
                  <div className="p-2 rounded-full bg-purple-100 mr-3">
                    <Percent className="h-4 w-4 text-purple-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 capitalize">{role}</p>
                    <p className="text-lg font-bold text-gray-900">{count}</p>
                    <p className="text-xs text-gray-500">
                      {Math.round((count / userStats.totalUsers) * 100)}% of total
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity & Registration Trends (if available) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userStats.recentActivity && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <Activity className="h-5 w-5 text-gray-700 mr-2" />
              <h4 className="text-md font-medium text-gray-700">Recent Activity</h4>
            </div>
            <div className="space-y-2">
              {userStats.recentActivity.map((activity, index) => (
                <div key={index} className="text-sm p-2 bg-white rounded border-l-4 border-blue-500">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-xs">{activity.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {userStats.registrationTrends && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <Calendar className="h-5 w-5 text-gray-700 mr-2" />
              <h4 className="text-md font-medium text-gray-700">Registration Trends</h4>
            </div>
            <div className="space-y-2">
              {Object.entries(userStats.registrationTrends).map(([period, count]) => (
                <div key={period} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{period}</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.min(100, (count / userStats.totalUsers) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={onClose}
          className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserStatsModal;