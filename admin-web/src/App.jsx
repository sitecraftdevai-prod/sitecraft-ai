import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Login from './pages/Login';
import TeamManagement from './pages/TeamManagement';

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen bg-[#03040a] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  );

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="text-white min-h-screen bg-[#03040a]">
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route 
              path="/" 
              element={<ProtectedAdminRoute><Dashboard /></ProtectedAdminRoute>} 
            />
            <Route 
              path="/projects" 
              element={<ProtectedAdminRoute><Projects /></ProtectedAdminRoute>} 
            />
            <Route 
              path="/projects/:projectId" 
              element={<ProtectedAdminRoute><ProjectDetails /></ProtectedAdminRoute>} 
            />
            <Route 
              path="/messages" 
              element={<ProtectedAdminRoute><Messages /></ProtectedAdminRoute>} 
            />
            <Route 
              path="/settings" 
              element={<ProtectedAdminRoute><Settings /></ProtectedAdminRoute>} 
            />
            <Route 
              path="/team" 
              element={<ProtectedAdminRoute><TeamManagement /></ProtectedAdminRoute>} 
            />
            <Route 
              path="/clients" 
              element={<ProtectedAdminRoute><div className="ml-72 p-20 text-center"><h2 className="text-4xl font-black">Client Management Coming Soon</h2></div></ProtectedAdminRoute>} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
