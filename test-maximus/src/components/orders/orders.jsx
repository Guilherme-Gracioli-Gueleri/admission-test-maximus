import { useState } from 'react';
import styles from './style.module.css';

export function Orders() {
  const [order, setOrder] = useState({
    customer: '',
    date: '',
    value: '',
    status: '',
  });

  const [orders, setOrders] = useState([
    {
      customer: 'João da Silva',
      date: '2025-06-27',
      value: '299.99',
      status: 'Pendente',
    },
    {
      customer: 'Maria Oliveira',
      date: '2025-06-26',
      value: '849.90',
      status: 'Concluído',
    },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);

  function handleDelete(indexToRemove) {
    setOrders((prevOrders) =>
      prevOrders.filter((_, index) => index !== indexToRemove)
    );
    if (editingIndex === indexToRemove) {
      setEditingIndex(null);
      setOrder({ customer: '', date: '', value: '', status: '' });
    }
  }

  return (
    <div className={styles.orders}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();

          if (editingIndex !== null) {
            setOrders((prevOrders) =>
              prevOrders.map((o, i) => (i === editingIndex ? order : o))
            );
            setEditingIndex(null);
          } else {
            setOrders((prevOrders) => [...prevOrders, order]);
          }

          setOrder({ customer: '', date: '', value: '', status: '' });
        }}
      >
        <input
          type="text"
          placeholder="Cliente"
          value={order.customer}
          onChange={(e) =>
            setOrder((prev) => ({ ...prev, customer: e.target.value }))
          }
        />
        <input
          type="date"
          value={order.date}
          onChange={(e) =>
            setOrder((prev) => ({ ...prev, date: e.target.value }))
          }
        />
        <input
          type="number"
          step="0.01"
          placeholder="Valor"
          value={order.value}
          onChange={(e) =>
            setOrder((prev) => ({ ...prev, value: e.target.value }))
          }
        />
        <select
          value={order.status}
          onChange={(e) =>
            setOrder((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value="">Selecione o status</option>
          <option value="Pendente">Pendente</option>
          <option value="Processando">Processando</option>
          <option value="Concluído">Concluído</option>
          <option value="Cancelado">Cancelado</option>
        </select>

        <button type="submit">
          {editingIndex !== null ? 'Salvar Edição' : 'Adicionar Pedido'}
        </button>

        {editingIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingIndex(null);
              setOrder({ customer: '', date: '', value: '', status: '' });
            }}
          >
            Cancelar Edição
          </button>
        )}
      </form>

      <div className={styles.list}>
        <div className={styles.head}>
          <p>Cliente</p>
          <p>Data</p>
          <p>Valor</p>
          <p>Status</p>
          <p>Ações</p>
        </div>
        {orders.length >= 1 && (
          <div className={styles.liting}>
            {orders.map((order, i) => (
              <div
                key={i}
                className={`${styles.order} ${
                  i === editingIndex ? styles.editing : ''
                }`}
              >
                <p>{order.customer}</p>
                <p>{order.date}</p>
                <p>R$ {parseFloat(order.value).toFixed(2)}</p>
                <p>{order.status}</p>
                <div className={styles.action}>
                  <button
                    onClick={() => {
                      setOrder(order);
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
