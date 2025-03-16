
import { useState } from 'react';
import { Search, Download, Filter, Calendar, User } from 'lucide-react';

// Mock data for rider earnings
const MOCK_RIDER_DATA = [
  {
    id: 'R001',
    name: 'John Doe',
    mobile: '9876543201',
    userId: 'RID001',
    clientId: 'CL001',
    clientName: 'ABC Logistics',
    tlName: 'Mike Johnson',
    earnings: [
      { date: '2023-10-01', amount: 750, absent: false },
      { date: '2023-10-02', amount: 850, absent: false },
      { date: '2023-10-03', amount: 0, absent: true },
      { date: '2023-10-04', amount: 920, absent: false },
      { date: '2023-10-05', amount: 780, absent: false },
    ]
  },
  {
    id: 'R002',
    name: 'Jane Smith',
    mobile: '9876543202',
    userId: 'RID002',
    clientId: 'CL002',
    clientName: 'XYZ Deliveries',
    tlName: 'Sarah Williams',
    earnings: [
      { date: '2023-10-01', amount: 820, absent: false },
      { date: '2023-10-02', amount: 0, absent: true },
      { date: '2023-10-03', amount: 900, absent: false },
      { date: '2023-10-04', amount: 850, absent: false },
      { date: '2023-10-05', amount: 780, absent: false },
    ]
  }
];

const SearchEarningsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'riderId' | 'clientId'>('riderId');
  const [searchResults, setSearchResults] = useState<typeof MOCK_RIDER_DATA | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (searchType === 'riderId') {
        setSearchResults(MOCK_RIDER_DATA.filter(rider => 
          rider.userId.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      } else {
        setSearchResults(MOCK_RIDER_DATA.filter(rider => 
          rider.clientId.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      }
      setIsLoading(false);
    }, 800);
  };

  const handleExport = (format: 'csv' | 'excel') => {
    // In a real app, this would generate and download the file
    alert(`Exporting data as ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Search Rider Earnings</h1>
        <p className="mt-2 text-muted-foreground">
          Look up earnings for riders by User ID or Client ID
        </p>
      </div>
      
      {/* Search form */}
      <div className="bg-card rounded-lg shadow p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search-type" className="block text-sm font-medium mb-1">
                Search By
              </label>
              <select 
                id="search-type"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'riderId' | 'clientId')}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="riderId">Rider User ID</option>
                <option value="clientId">Client ID</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label htmlFor="search-term" className="block text-sm font-medium mb-1">
                {searchType === 'riderId' ? 'Rider User ID' : 'Client ID'}
              </label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  id="search-term"
                  type="text"
                  placeholder={searchType === 'riderId' ? 'Enter rider user ID...' : 'Enter client ID...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
            
            <div className="self-end">
              <button
                type="submit"
                disabled={isLoading || !searchTerm}
                className="rounded-md px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 min-w-[120px] flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Search size={16} className="mr-2" />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Search Results */}
      {searchResults && searchResults.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-semibold">Search Results</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleExport('csv')}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-muted rounded-md hover:bg-muted/80"
              >
                <Download size={14} />
                Export CSV
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-muted rounded-md hover:bg-muted/80"
              >
                <Download size={14} />
                Export Excel
              </button>
            </div>
          </div>
          
          {searchResults.map((rider) => (
            <div key={rider.id} className="bg-card rounded-lg shadow overflow-hidden">
              {/* Rider Details Card */}
              <div className="p-5 border-b border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{rider.name}</h3>
                    <p className="text-sm text-muted-foreground">Rider ID: {rider.userId}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Mobile Number</p>
                    <p className="text-sm font-medium">{rider.mobile}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Client Details</p>
                    <p className="text-sm font-medium">{rider.clientName} ({rider.clientId})</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Team Lead</p>
                    <p className="text-sm font-medium">{rider.tlName}</p>
                  </div>
                </div>
              </div>
              
              {/* Earnings Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-6 py-3 text-left font-medium">Date</th>
                      <th className="px-6 py-3 text-left font-medium">Biker Amount</th>
                      <th className="px-6 py-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {rider.earnings.map((earning, index) => (
                      <tr key={index} className={earning.absent ? 'bg-destructive/5' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-2 text-muted-foreground" />
                            {new Date(earning.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {earning.absent ? (
                            '—'
                          ) : (
                            <span className="font-medium">₹{earning.amount.toFixed(2)}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {earning.absent ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                              Absent
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Present
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-muted/50">
                      <th className="px-6 py-3 text-left font-medium">Total</th>
                      <th className="px-6 py-3 text-left font-medium">
                        ₹{rider.earnings.reduce((total, day) => total + day.amount, 0).toFixed(2)}
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        {rider.earnings.filter(e => e.absent).length} absent days
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {searchResults && searchResults.length === 0 && (
        <div className="bg-card rounded-lg shadow p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No results found</h3>
          <p className="text-muted-foreground">
            We couldn't find any riders matching your search criteria. Please try with a different ID.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchEarningsPage;
