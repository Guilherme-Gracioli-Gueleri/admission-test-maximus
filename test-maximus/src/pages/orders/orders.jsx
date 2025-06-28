import styles from './style.module.css';
import { Orders } from '../../components/orders/orders';

export function OrdersPage() {
  return (
    <section className={styles.orders}>
      <Orders />
    </section>
  );
}
