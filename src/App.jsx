import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Outbound from './pages/Outbound';
import FormPage from './pages/FormPage';
import VideoPage from './pages/VideoPage';
import DownloadPage from './pages/DownloadPage';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';

function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.default.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, [location]);

  return null;
}

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PageTracker />
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout><Home /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/outbound" element={
            <ProtectedRoute>
              <Layout><Outbound /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/form" element={
            <ProtectedRoute>
              <Layout><FormPage /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/video" element={
            <ProtectedRoute>
              <Layout><VideoPage /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/download" element={
            <ProtectedRoute>
              <Layout><DownloadPage /></Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
