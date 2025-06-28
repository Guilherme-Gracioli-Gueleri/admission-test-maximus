import styles from './style.module.css';
import { Products } from '../../components/products/products';

export function ProductsPage() {
  return (
    <section className={styles.products}>
      <Products />
    </section>
  );
}
