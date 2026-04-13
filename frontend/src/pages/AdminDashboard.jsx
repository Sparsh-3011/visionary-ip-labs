import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { 
  Download, 
  RefreshCw, 
  Search, 
  Users, 
  FileText, 
  TrendingUp,
  Eye,
  LogOut,
  Mail,
  Phone,
  School
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInterest, setFilterInterest] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Simple authentication (you can make this more secure later)
  const ADMIN_PASSWORD = 'admin123'; // Change this!

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      toast.success('Login successful!');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    toast.success('Logged out successfully');
  };

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
      fetchStats();
    }
  }, [isAuthenticated]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/applications/list?limit=100`);
      if (response.data.success) {
        setApplications(response.data.applications);
      }
    } catch (error) {
      toast.error('Failed to fetch applications');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/applications/stats`);
      if (response.data.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Full Name', 'Email', 'Phone', 'College', 'Course', 'Year', 'Area of Interest', 'Submitted At'];
    const csvData = filteredApplications.map(app => [
      app.fullName,
      app.email,
      app.phone,
      app.collegeName,
      app.course,
      app.year,
      app.areaOfInterest,
      new Date(app.createdAt).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV!');
  };

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.collegeName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterInterest === 'all' || app.areaOfInterest === filterInterest;
    
    return matchesSearch && matchesFilter;
  });

  // Get unique interest areas
  const interestAreas = ['all', ...new Set(applications.map(app => app.areaOfInterest))];

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center font-bold text-slate-950 mx-auto mb-4 text-2xl">
              VIP
            </div>
            <CardTitle className="text-2xl text-white">Admin Dashboard</CardTitle>
            <CardDescription className="text-slate-400">
              Enter password to access applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-900/50 border-slate-700 text-white"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold">
                Login
              </Button>
              <p className="text-xs text-slate-500 text-center mt-4">
                Default password: admin123 (Please change this!)
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-400">Visionary IP Labs - Application Management</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-slate-300">Total Applications</CardTitle>
                <Users className="w-5 h-5 text-amber-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats?.totalApplications || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-slate-300">Interest Areas</CardTitle>
                <TrendingUp className="w-5 h-5 text-amber-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats?.byInterest?.length || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-slate-300">Filtered Results</CardTitle>
                <FileText className="w-5 h-5 text-amber-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{filteredApplications.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Actions */}
        <Card className="bg-slate-800/30 border-slate-700 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name, email, or college..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>
              </div>
              <Select value={filterInterest} onValueChange={setFilterInterest}>
                <SelectTrigger className="w-full md:w-64 bg-slate-900/50 border-slate-700 text-white">
                  <SelectValue placeholder="Filter by interest" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  {interestAreas.map(area => (
                    <SelectItem key={area} value={area} className="text-white">
                      {area === 'all' ? 'All Areas' : area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={fetchApplications}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={exportToCSV}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Applications ({filteredApplications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12 text-slate-400">Loading...</div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-12 text-slate-400">No applications found</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-slate-800/50">
                      <TableHead className="text-slate-300">#</TableHead>
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Contact</TableHead>
                      <TableHead className="text-slate-300">Education</TableHead>
                      <TableHead className="text-slate-300">Interest</TableHead>
                      <TableHead className="text-slate-300">Submitted</TableHead>
                      <TableHead className="text-slate-300">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app, index) => (
                      <TableRow key={app.id} className="border-slate-700 hover:bg-slate-800/30">
                        <TableCell className="text-slate-400">{index + 1}</TableCell>
                        <TableCell>
                          <div className="text-white font-medium">{app.fullName}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-slate-400">
                              <Mail className="w-3 h-3 mr-1" />
                              {app.email}
                            </div>
                            <div className="flex items-center text-sm text-slate-400">
                              <Phone className="w-3 h-3 mr-1" />
                              {app.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-slate-300">
                              <School className="w-3 h-3 mr-1" />
                              {app.collegeName}
                            </div>
                            <div className="text-xs text-slate-500">
                              {app.course} - {app.year}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                            {app.areaOfInterest}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-400 text-sm">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800"
                            onClick={() => {
                              const details = `
Name: ${app.fullName}
Email: ${app.email}
Phone: ${app.phone}
College: ${app.collegeName}
Course: ${app.course} - ${app.year}
Interest: ${app.areaOfInterest}

Motivation:
${app.motivation}

Submitted: ${new Date(app.createdAt).toLocaleString()}
                              `.trim();
                              alert(details);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
