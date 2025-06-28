import { useState } from 'react';
import styles from './style.module.css';

export function Clients() {
  const [client, setClient] = useState({
    name: '',
    document: '',
    telephone: '',
    email: '',
  });

  const [clients, setClients] = useState([
    {
      name: 'João da Silva',
      document: '123.456.789-00',
      telephone: '(11) 91234-5678',
      email: 'joao.silva@example.com',
    },
    {
      name: 'Maria Oliveira',
      document: '987.654.321-00',
      telephone: '(21) 99876-5432',
      email: 'maria@example.com',
    },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);

  function handleDelete(indexToRemove) {
    setClients((prevClients) =>
      prevClients.filter((_, index) => index !== indexToRemove)
    );
    if (editingIndex === indexToRemove) {
      setEditingIndex(null);
      setClient({ name: '', document: '', telephone: '', email: '' });
    }
  }

  return (
    <div className={styles.clients}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();

          if (editingIndex !== null) {
            setClients((prevClients) =>
              prevClients.map((c, i) => (i === editingIndex ? client : c))
            );
            setEditingIndex(null);
          } else {
            setClients((prevClients) => [...prevClients, client]);
          }

          setClient({ name: '', document: '', telephone: '', email: '' });
        }}
      >
        <input
          type="text"
          id="name"
          placeholder="Nome"
          value={client.name}
          onChange={(e) =>
            setClient((prevClient) => ({
              ...prevClient,
              name: e.target.value,
            }))
          }
        />
        <input
          type="text"
          id="document"
          placeholder="Documento"
          value={client.document}
          onChange={(e) =>
            setClient((prevClient) => ({
              ...prevClient,
              document: e.target.value,
            }))
          }
        />
        <input
          type="tel"
          id="telephone"
          placeholder="Telefone"
          value={client.telephone}
          onChange={(e) =>
            setClient((prevClient) => ({
              ...prevClient,
              telephone: e.target.value,
            }))
          }
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={client.email}
          onChange={(e) =>
            setClient((prevClient) => ({
              ...prevClient,
              email: e.target.value,
            }))
          }
        />

        <button type="submit">
          {editingIndex !== null ? 'Salvar Edição' : 'Adicionar'}
        </button>

        {editingIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingIndex(null);
              setClient({ name: '', document: '', telephone: '', email: '' });
            }}
          >
            Cancelar Edição
          </button>
        )}
      </form>

      <div className={styles.list}>
        <div className={styles.head}>
          <p>Nome</p>
          <p>Documento</p>
          <p>Telefone</p>
          <p>Email</p>
          <p>Ações</p>
        </div>
        {clients.length >= 1 && (
          <div className={styles.liting}>
            {clients.map((client, i) => (
              <div
                key={i}
                className={`${styles.client} ${
                  i === editingIndex ? styles.editing : ''
                }`}
              >
                <p>{client.name}</p>
                <p>{client.document}</p>
                <p>{client.telephone}</p>
                <p>{client.email}</p>
                <div className={styles.action}>
                  <button
                    onClick={() => {
                      setClient(client);
                      setEditingIndex(i);
                    }}
                  >
                    Editar
                  </button>
                  <button onClick={() => handleDelete(i)}>Deletar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
