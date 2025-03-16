
import { useState } from 'react';
import { 
  Users, CheckCircle, XCircle, Shield, UserCheck, UserX, Trash2, 
  Filter, Search, RefreshCw, UserPlus
} from 'lucide-react';

// Mock users data
const MOCK_USERS = [
  {
    id: 'user1',
    username: 'johndoe',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '9876543210',
    role: 'user',
    isApproved: true,
    isBlocked: false,
    registeredDate: '2023-09-15T10:30:00',
    lastActive: '2023-11-01T14:22:00'
  },
  {
    id: 'user2',
    username: 'janesmith',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    mobile: '9876543211',
    role: 'user',
    isApproved: true,
    isBlocked: false,
    registeredDate: '2023-09-20T11:45:00',
    lastActive: '2023-11-02T09:15:00'
  },
  {
    id: 'user3',
    username: 'mikebrown',
    fullName: 'Mike Brown',
    email: 'mike.brown@example.com',
    mobile: '9876543212',
    role: 'user',
    isApproved: false,
    isBlocked: false,
    registeredDate: '2023-10-25T16:20:00',
    lastActive: null
  },
  {
    id: 'user4',
    username: 'sarahwilson',
    fullName: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    mobile: '9876543213',
    role: 'user',
    isApproved: true,
    isBlocked: true,
    registeredDate: '2023-08-10T08:15:00',
    lastActive: '2023-10-15T13:40:00'
  }
];

type UserStatus = 'all' | 'approved' | 'pending' | 'blocked';

const AdminUsersPage = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS);
  const [statusFilter, setStatusFilter] = useState<UserStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const applyFilters = () => {
    let result = [...users];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => {
        if (statusFilter === 'approved') return user.isApproved && !user.isBlocked;
        if (statusFilter === 'pending') return !user.isApproved;
        if (statusFilter === 'blocked') return user.isBlocked;
        return true;
      });
    }
    
    // Apply search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.username.toLowerCase().includes(search) ||
        user.fullName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.mobile.includes(search)
      );
    }
    
    setFilteredUsers(result);
  };
  
  // Immediately apply filters when search or filter changes
  useState(() => {
    applyFilters();
  });
  
  const handleFilterChange = (status: UserStatus) => {
    setStatusFilter(status);
    setTimeout(applyFilters, 0);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setTimeout(applyFilters, 0);
  };
  
  const handleApproveUser = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, isApproved: true } : user
      )
    );
    setTimeout(applyFilters, 0);
  };
  
  const handleRejectUser = (userId: string) => {
    // In a real app, this might delete the user or mark them as rejected
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    setTimeout(applyFilters, 0);
  };
  
  const handleToggleBlock = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
    setTimeout(applyFilters, 0);
  };
  
  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setTimeout(applyFilters, 0);
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString([], { 
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };
  
  const statusCounts = {
    all: users.length,
    approved: users.filter(user => user.isApproved && !user.isBlocked).length,
    pending: users.filter(user => !user.isApproved).length,
    blocked: users.filter(user => user.isBlocked).length
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-7 w-7" /> 
          User Management
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage user accounts, approve registrations, and monitor user activity
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg shadow p-4 border-l-4 border-primary">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{statusCounts.all}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
              <UserCheck size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold">{statusCounts.approved}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow p-4 border-l-4 border-amber-500">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Approval</p>
              <p className="text-2xl font-bold">{statusCounts.pending}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow p-4 border-l-4 border-red-500">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <UserX size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Blocked Users</p>
              <p className="text-2xl font-bold">{statusCounts.blocked}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-card rounded-lg shadow p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, email, mobile..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              <Filter size={14} className="inline mr-1" /> 
              Filter:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange(e.target.value as UserStatus)}
              className="rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">All Users ({statusCounts.all})</option>
              <option value="approved">Active ({statusCounts.approved})</option>
              <option value="pending">Pending ({statusCounts.pending})</option>
              <option value="blocked">Blocked ({statusCounts.blocked})</option>
            </select>
            
            <button
              onClick={() => {
                setUsers(MOCK_USERS);
                setFilteredUsers(MOCK_USERS);
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-muted rounded-md hover:bg-muted/80"
              aria-label="Reset filters"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </div>
      
      {/* User Table */}
      <div className="bg-card rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-3 text-left font-medium">User</th>
                <th className="px-6 py-3 text-left font-medium">Contact</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Registered</th>
                <th className="px-6 py-3 text-left font-medium">Last Active</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No users found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className={user.isBlocked ? 'bg-destructive/5' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <span className="text-xs font-bold">
                            {user.fullName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">{user.fullName}</p>
                          <p className="text-xs text-muted-foreground">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p>{user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.mobile}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isBlocked ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                          Blocked
                        </span>
                      ) : user.isApproved ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(user.registeredDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(user.lastActive)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {!user.isApproved ? (
                          <>
                            <button
                              onClick={() => handleApproveUser(user.id)}
                              className="flex items-center text-xs text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400"
                            >
                              <CheckCircle size={14} className="mr-1" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectUser(user.id)}
                              className="flex items-center text-xs text-destructive hover:text-destructive/80"
                            >
                              <XCircle size={14} className="mr-1" />
                              Reject
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleToggleBlock(user.id)}
                            className={`flex items-center text-xs ${
                              user.isBlocked 
                                ? 'text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400' 
                                : 'text-amber-600 hover:text-amber-800 dark:text-amber-500 dark:hover:text-amber-400'
                            }`}
                          >
                            {user.isBlocked ? (
                              <>
                                <UserCheck size={14} className="mr-1" />
                                Unblock
                              </>
                            ) : (
                              <>
                                <UserX size={14} className="mr-1" />
                                Block
                              </>
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="flex items-center text-xs text-destructive hover:text-destructive/80"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
