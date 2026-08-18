// B-100 · Editorial Quiet Luxury: rotas curtas, previsíveis e com escape claro.
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Redirect from '../pages/Redirect';
import AdminRoute from './AdminRoute';
import AdminLogin from '../pages/admin/Login';
import ImportProducts from '../pages/admin/ImportProducts';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:cat" element={<Home />} />
        <Route path="/go/:id" element={<Redirect />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <ImportProducts />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
