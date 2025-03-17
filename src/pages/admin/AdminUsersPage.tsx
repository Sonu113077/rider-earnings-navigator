
import { useState, useEffect } from 'react';
import { 
  Users, CheckCircle, XCircle, Shield, UserCheck, UserX, Trash2, 
  Filter, Search, RefreshCw, UserPlus, Eye
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  },
  // New test users for pending approvals
  {
    id: 'user5',
    username: 'testuser1',
    fullName: 'Test User 1',
    email: 'test1@example.com',
    mobile: '9876543214',
    role: 'user',
    isApproved: false,
    isBlocked: false,
    registeredDate: '2023-11-05T09:30:00',
    lastActive: null
  },
  {
    id: 'user6',
    username: 'testuser2',
    fullName: 'Test User 2',
    email: 'test2@example.com',
    mobile: '9876543215',
    role: 'user',
    isApproved: false,
    isBlocked: false,
    registeredDate: '2023-11-07T14:20:00',
    lastActive: null
  }
];

type UserStatus = 'all' | 'approved' | 'pending' | 'blocked';

const AdminUsersPage = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS);
  const [statusFilter, setStatusFilter] = useState<UserStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  
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
  
  // Apply filters when search or filter changes
  useEffect(() => {
    applyFilters();
  }, [statusFilter, searchTerm, users]);
  
  const handleFilterChange = (status: UserStatus) => {
    setStatusFilter(status);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleApproveUser = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, isApproved: true } : user
      )
    );
    toast.success("User approved successfully");
  };
  
  const handleRejectUser = (userId: string) => {
    if (window.confirm('Are you sure you want to reject this user?')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      toast.success("User rejected successfully");
    }
  };
  
  const handleToggleBlock = (userId: string) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user => 
        user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
      );
      
      const user = updatedUsers.find(u => u.id === userId);
      if (user) {
        toast.success(`User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`);
      }
      
      return updatedUsers;
    });
  };
  
  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      toast.success("User deleted successfully");
    }
  };
  
  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsUserDetailsOpen(true);
  };
  
  const handleFilterByStatus = (status: UserStatus) => {
    setStatusFilter(status);
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
        <div 
          className="bg-card rounded-lg shadow p-4 border-l-4 border-primary cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleFilterByStatus('all')}
        >
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
        
        <div 
          className="bg-card rounded-lg shadow p-4 border-l-4 border-green-500 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleFilterByStatus('approved')}
        >
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
        
        <div 
          className="bg-card rounded-lg shadow p-4 border-l-4 border-amber-500 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleFilterByStatus('pending')}
        >
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
        
        <div 
          className="bg-card rounded-lg shadow p-4 border-l-4 border-red-500 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleFilterByStatus('blocked')}
        >
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
                      <div 
                        className="flex items-center cursor-pointer hover:bg-muted/30 p-1 rounded-md"
                        onClick={() => handleUserClick(user)}
                      >
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
      
      {/* User Detail Dialog */}
      <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about the user.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="text-xl font-bold">
                    {selectedUser.fullName.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Full Name</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Username</p>
                  <p className="text-sm text-muted-foreground">@{selectedUser.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Mobile</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.mobile}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Role</p>
                  <p className="text-sm text-muted-foreground capitalize">{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm">
                    {selectedUser.isBlocked ? (
                      <span className="text-destructive">Blocked</span>
                    ) : selectedUser.isApproved ? (
                      <span className="text-green-600 dark:text-green-400">Active</span>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400">Pending</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Registered</p>
                  <p className="text-sm text-muted-foreground">{formatDate(selectedUser.registeredDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Active</p>
                  <p className="text-sm text-muted-foreground">{formatDate(selectedUser.lastActive)}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                {!selectedUser.isApproved ? (
                  <>
                    <Button 
                      variant="default" 
                      onClick={() => {
                        handleApproveUser(selectedUser.id);
                        setIsUserDetailsOpen(false);
                      }}
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Approve User
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        handleRejectUser(selectedUser.id);
                        setIsUserDetailsOpen(false);
                      }}
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject User
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant={selectedUser.isBlocked ? "default" : "outline"}
                      onClick={() => {
                        handleToggleBlock(selectedUser.id);
                        setIsUserDetailsOpen(false);
                      }}
                    >
                      {selectedUser.isBlocked ? (
                        <>
                          <UserCheck size={16} className="mr-2" />
                          Unblock User
                        </>
                      ) : (
                        <>
                          <UserX size={16} className="mr-2" />
                          Block User
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        if (handleDeleteUser(selectedUser.id)) {
                          setIsUserDetailsOpen(false);
                        }
                      }}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete User
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsersPage;
