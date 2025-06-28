import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';

//pages
import { LoginPage } from './pages/login/login.page';
import { ClientsPage } from './pages/clients/clients.page';
import { ProductsPage } from './pages/products/products.page';
import { OrdersPage } from './pages/orders/orders';

function App() {
  return (
    <>
      <Router>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
