import styles from './style.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import maximuslogo from '../../assets/icon-maximus.png';

export function Navbar() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && (
        <aside className={styles.navbar}>
          <figure>
            <img
              src={maximuslogo}
              width={maximuslogo.width}
              height={maximuslogo.height}
              alt=""
            />
          </figure>
          <nav>
            <ul>
              <li>
                <Link
                  to="/clients"
                  data-active={
                    location.pathname === '/clients' ? '' : undefined
                  }
                >
                  Clientes
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  data-active={
                    location.pathname === '/products' ? '' : undefined
                  }
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  data-active={location.pathname === '/orders' ? '' : undefined}
                >
                  Pedidos
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
}
