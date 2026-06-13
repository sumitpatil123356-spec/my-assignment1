import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './layouts/AppLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Payment from './pages/Payment';
import NotFound from './pages/NotFound';

import Dashboard from './pages/admin/Dashboard';
import TransactionLogs from './pages/admin/TransactionLogs';
import HardwareProtocols from './pages/admin/HardwareProtocols';
import InventoryControl from './pages/admin/InventoryControl';
import CustomerIntelligence from './pages/admin/CustomerIntelligence';
import AITrendAnalyzer from './pages/admin/AITrendAnalyzer';
import AIFraudDetection from './pages/admin/AIFraudDetection';
import SupportCenter from './pages/admin/SupportCenter';
import VisitorTracking from './pages/admin/VisitorTracking';
import DropManagement from './pages/admin/DropManagement';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Customer Store Front Routes */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="payment" element={<Payment />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Secured Admin Command Center Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<TransactionLogs />} />
            <Route path="protocols" element={<HardwareProtocols />} />
            <Route path="inventory" element={<InventoryControl />} />
            <Route path="customers" element={<CustomerIntelligence />} />
            <Route path="trends" element={<AITrendAnalyzer />} />
            <Route path="fraud" element={<AIFraudDetection />} />
            <Route path="support" element={<SupportCenter />} />
            <Route path="visitors" element={<VisitorTracking />} />
            <Route path="drops" element={<DropManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}