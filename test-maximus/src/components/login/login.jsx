import styles from './style.module.css';
import maximuslogo from '../../assets/maximus-logo.png';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UserPermission = {
  email: 'gggueleri@gmail.com',
  password: '123456',
};

export function LoginForm() {
  const [noAccess, setNoAccess] = useState(false);
  const navigate = useNavigate();

  function onSubmit(data) {
    if (
      UserPermission.email !== data?.email ||
      UserPermission.password !== data?.password
    ) {
      setNoAccess(true);
      return;
    }

    navigate('/clients');
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className={styles.container}>
      <figure>
        <img
          src={maximuslogo}
          width={maximuslogo.width}
          height={maximuslogo.height}
          alt=""
        />
      </figure>
      {!noAccess ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">
            <input
              type="text"
              placeholder="E-mail"
              id="email"
              {...register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
            {errors.email && <span>Digite um e-mail válido</span>}
          </label>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="Password"
              id="password"
              {...register('password')}
            />
          </label>
          <button type="submit">Entrar</button>
        </form>
      ) : (
        <div className={styles.retry}>
          <h3>
            Usuário não autorizado ou dados incorretos. Por favor, tente
            novamente.
          </h3>
          <button onClick={() => setNoAccess(false)}>Tentar novamente</button>
        </div>
      )}
    </div>
  );
}
