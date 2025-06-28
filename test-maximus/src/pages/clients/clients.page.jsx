import styles from './style.module.css';
import { Clients } from '../../components/clients/clients';

export function ClientsPage() {
  return (
    <section className={styles.clients}>
      <Clients />
    </section>
  );
}
