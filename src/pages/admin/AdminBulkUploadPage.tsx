
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileUp, FilePlus, AlertTriangle, Check, X, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminBulkUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a valid CSV or Excel file');
      return;
    }

    setSelectedFile(file);
    setUploadSuccess(false);
    
    // Mock preview functionality
    generateMockPreview(file);
  };

  // Generate mock preview data
  const generateMockPreview = (file: File) => {
    // In a real application, you would parse the file here
    // For this demo, we'll generate mock data
    const mockPreviewData = [
      { riderId: 'R001', riderName: 'John Doe', clientId: 'C100', clientName: 'BetaCorp', date: '2023-05-10', amount: 1250 },
      { riderId: 'R002', riderName: 'Jane Smith', clientId: 'C101', clientName: 'AlphaTech', date: '2023-05-10', amount: 980 },
      { riderId: 'R003', riderName: 'Mike Johnson', clientId: 'C102', clientName: 'GammaSys', date: '2023-05-11', amount: 1100 },
      // Add more mock data as needed
    ];
    
    setPreviewData(mockPreviewData);
    toast.info(`Preview generated for ${file.name}`);
  };

  // Handle file upload
  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setUploadedData(previewData);
      setUploadSuccess(true);
      toast.success('File uploaded successfully!');
    }, 2000);
  };

  // Handle cancel upload
  const handleCancelUpload = () => {
    setSelectedFile(null);
    setPreviewData([]);
    setUploadSuccess(false);
  };

  // Handle download template
  const handleDownloadTemplate = () => {
    toast.success('Template downloaded successfully!');
  };

  // Handle clear data
  const handleClearData = () => {
    setUploadedData([]);
    setSelectedFile(null);
    setPreviewData([]);
    setUploadSuccess(false);
    toast.info('Uploaded data has been cleared');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Bulk Upload System</h1>
      <p className="text-muted-foreground">
        Upload rider earnings data in bulk using CSV or Excel files.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Earnings Data</CardTitle>
            <CardDescription>
              Select a CSV or Excel file containing rider earnings data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                accept=".csv,.xlsx,.xls"
              />
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Upload className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Drag and drop your file here or
                </p>
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  Browse Files
                </label>
              </div>
              {selectedFile && (
                <div className="mt-4 text-sm">
                  <p className="font-medium">Selected file:</p>
                  <p className="text-muted-foreground">{selectedFile.name}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="default"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="flex-1"
              >
                {isUploading ? 'Uploading...' : 'Upload File'}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancelUpload}
                disabled={!selectedFile || isUploading}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>

            <div className="flex justify-between mt-4">
              <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
              {uploadedData.length > 0 && (
                <Button variant="destructive" size="sm" onClick={handleClearData}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Data
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Instructions/Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Guidelines</CardTitle>
            <CardDescription>
              Follow these guidelines to ensure successful data upload
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <FilePlus className="h-4 w-4" />
              <AlertDescription>
                Use our template to ensure correct formatting
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <h3 className="font-medium">Required Fields:</h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Rider ID</li>
                <li>Rider Name</li>
                <li>Client ID</li>
                <li>Earning Date</li>
                <li>Earning Amount</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">File Format:</h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Excel files (.xlsx, .xls)</li>
                <li>CSV files (.csv)</li>
                <li>Maximum file size: 5MB</li>
              </ul>
            </div>
            
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Duplicate entries will be rejected. Ensure data consistency before upload.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      {previewData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Data Preview</CardTitle>
            <CardDescription>
              Review the data before confirming upload
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rider ID</TableHead>
                    <TableHead>Rider Name</TableHead>
                    <TableHead>Client ID</TableHead>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.riderId}</TableCell>
                      <TableCell>{item.riderName}</TableCell>
                      <TableCell>{item.clientId}</TableCell>
                      <TableCell>{item.clientName}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="text-right">{item.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Status */}
      {uploadSuccess && (
        <Card>
          <CardHeader className="bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Upload Successful</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">File Name</p>
                  <p className="text-sm text-muted-foreground">{selectedFile?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Records Processed</p>
                  <p className="text-sm text-muted-foreground">{uploadedData.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Upload Date</p>
                  <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm text-green-500">Complete</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleClearData}>
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Export Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminBulkUploadPage;
