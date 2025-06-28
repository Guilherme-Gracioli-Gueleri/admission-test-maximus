import { LoginForm } from '../../components/login/login';
import styles from './style.module.css';

export function LoginPage() {
  return (
    <section className={styles.login}>
      <LoginForm />
    </section>
  );
}
