
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, FileUp, FilePlus, AlertTriangle, Check, X, Download, 
  Trash2, FileText, ExternalLink, Link as LinkIcon, Copy, BarChart 
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const AdminBulkUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("file-upload");
  const [googleSheetUrl, setGoogleSheetUrl] = useState("");
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [selectedTemplateType, setSelectedTemplateType] = useState<string | null>(null);
  
  // Mock Google Sheet URL
  const mockSheetShareableUrl = "https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit?usp=sharing";

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
      { riderId: 'R004', riderName: 'Sarah Williams', clientId: 'C103', clientName: 'DeltaServices', date: '2023-05-12', amount: 1350 },
      { riderId: 'R005', riderName: 'Robert Brown', clientId: 'C100', clientName: 'BetaCorp', date: '2023-05-12', amount: 1275 },
    ];
    
    setPreviewData(mockPreviewData);
    toast.info(`Preview generated for ${file.name}`);
  };

  // Handle Google Sheet URL validation and processing
  const handleGoogleSheetProcess = () => {
    if (!googleSheetUrl.includes('docs.google.com/spreadsheets')) {
      toast.error('Please enter a valid Google Sheets URL');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate API call to process the Google Sheet
    setTimeout(() => {
      // Generate mock data similar to file upload
      const mockSheetData = [
        { riderId: 'G001', riderName: 'Alex Taylor', clientId: 'C104', clientName: 'OmegaTech', date: '2023-05-15', amount: 1425 },
        { riderId: 'G002', riderName: 'Chris Wilson', clientId: 'C105', clientName: 'SigmaSolutions', date: '2023-05-15', amount: 1180 },
        { riderId: 'G003', riderName: 'Dana Miller', clientId: 'C106', clientName: 'EpsilonInc', date: '2023-05-16', amount: 1320 },
      ];
      
      setPreviewData(mockSheetData);
      setIsUploading(false);
      toast.success('Google Sheet processed successfully!');
    }, 2000);
  };

  // Handle file upload
  const handleUpload = () => {
    if (activeTab === "file-upload" && !selectedFile) {
      toast.error('Please select a file first');
      return;
    }
    
    if (activeTab === "google-sheet" && !googleSheetUrl) {
      toast.error('Please enter a Google Sheet URL');
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setUploadedData(previewData);
      setUploadSuccess(true);
      toast.success(`${activeTab === "file-upload" ? "File" : "Google Sheet"} uploaded successfully!`);
    }, 2000);
  };

  // Handle cancel upload
  const handleCancelUpload = () => {
    if (activeTab === "file-upload") {
      setSelectedFile(null);
    } else {
      setGoogleSheetUrl("");
    }
    setPreviewData([]);
    setUploadSuccess(false);
    toast.info("Upload cancelled");
  };

  // Handle download template
  const handleDownloadTemplate = (templateType: string) => {
    setSelectedTemplateType(templateType);
    setShowTemplateDialog(true);
  };
  
  // Handle template download confirmation
  const handleConfirmTemplateDownload = () => {
    if (!selectedTemplateType) return;
    
    toast.success(`${selectedTemplateType} template downloaded successfully!`);
    setShowTemplateDialog(false);
    setSelectedTemplateType(null);
  };

  // Handle clear data
  const handleClearData = () => {
    setUploadedData([]);
    setSelectedFile(null);
    setGoogleSheetUrl("");
    setPreviewData([]);
    setUploadSuccess(false);
    toast.info('Uploaded data has been cleared');
  };
  
  // Handle copy link to clipboard
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };
  
  // Handle download results
  const handleDownloadResults = () => {
    toast.success('Results exported successfully!');
  };
  
  // Generate a verification report
  const handleGenerateVerificationReport = () => {
    toast.success('Verification report generated!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Bulk Upload System</h1>
      <p className="text-muted-foreground">
        Upload rider earnings data in bulk using CSV, Excel files, or Google Sheets.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file-upload">File Upload</TabsTrigger>
          <TabsTrigger value="google-sheet">Google Sheet</TabsTrigger>
        </TabsList>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "file-upload" ? "Upload Earnings Data" : "Import from Google Sheet"}
              </CardTitle>
              <CardDescription>
                {activeTab === "file-upload" 
                  ? "Select a CSV or Excel file containing rider earnings data" 
                  : "Enter a shareable Google Sheet URL to import data"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TabsContent value="file-upload" className="m-0 p-0">
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
              </TabsContent>
              
              <TabsContent value="google-sheet" className="m-0 p-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="sheet-url" className="text-sm font-medium">
                      Google Sheet URL
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="sheet-url"
                        placeholder="https://docs.google.com/spreadsheets/d/..."
                        value={googleSheetUrl}
                        onChange={(e) => setGoogleSheetUrl(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setGoogleSheetUrl(mockSheetShareableUrl);
                          toast.info("Demo URL inserted");
                        }}
                        title="Insert demo URL"
                      >
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Paste a shareable Google Sheet URL with edit permissions
                    </p>
                  </div>
                  
                  <Button
                    variant="secondary"
                    onClick={handleGoogleSheetProcess}
                    disabled={!googleSheetUrl}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Process Sheet
                  </Button>
                  
                  <Alert>
                    <AlertDescription className="text-xs">
                      Make sure your Google Sheet is properly formatted and shared with anyone with the link.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="default"
                  onClick={handleUpload}
                  disabled={
                    (activeTab === "file-upload" && !selectedFile) || 
                    (activeTab === "google-sheet" && !googleSheetUrl) || 
                    isUploading || 
                    previewData.length === 0
                  }
                  className="flex-1"
                >
                  {isUploading ? 'Uploading...' : 'Upload Data'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancelUpload}
                  disabled={
                    (activeTab === "file-upload" && !selectedFile) || 
                    (activeTab === "google-sheet" && !googleSheetUrl && previewData.length === 0) || 
                    isUploading
                  }
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>

              <div className="flex justify-between mt-4 flex-wrap gap-2">
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleDownloadTemplate("Excel")}>
                    <Download className="mr-2 h-4 w-4" />
                    Excel Template
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadTemplate("CSV")}>
                    <Download className="mr-2 h-4 w-4" />
                    CSV Template
                  </Button>
                </div>
                {uploadedData.length > 0 && (
                  <Button variant="destructive" size="sm" onClick={handleClearData}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Data
                  </Button>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={() => handleDownloadTemplate("Google Sheet")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Use Google Sheet Template
              </Button>
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
                  <li>Google Sheets (shared link)</li>
                  <li>Maximum file size: 5MB</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Verification Process:</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Data will be validated before upload</li>
                  <li>Rider information will be cross-checked with existing records</li>
                  <li>A verification report will be generated after upload</li>
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
      </Tabs>

      {/* Preview Section */}
      {previewData.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Data Preview</CardTitle>
                <CardDescription>
                  Review the data before confirming upload
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleGenerateVerificationReport}
              >
                <BarChart className="mr-2 h-4 w-4" />
                Verification Report
              </Button>
            </div>
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
                  <p className="text-sm font-medium">Source</p>
                  <p className="text-sm text-muted-foreground">
                    {activeTab === "file-upload" 
                      ? selectedFile?.name 
                      : "Google Sheet Import"}
                  </p>
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
                <Button onClick={handleDownloadResults}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Template Download Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download {selectedTemplateType} Template</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              This template includes all required fields and formatting for uploading rider earnings data.
            </p>
            
            {selectedTemplateType === "Google Sheet" ? (
              <div className="space-y-4">
                <div className="flex gap-2 items-center">
                  <Input 
                    value={mockSheetShareableUrl} 
                    readOnly
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleCopyLink(mockSheetShareableUrl)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    window.open(mockSheetShareableUrl, '_blank');
                    setShowTemplateDialog(false);
                  }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in Google Sheets
                </Button>
              </div>
            ) : (
              <div className="pt-4 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setShowTemplateDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleConfirmTemplateDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBulkUploadPage;
