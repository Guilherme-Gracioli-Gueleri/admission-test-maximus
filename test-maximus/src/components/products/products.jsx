import { useState } from 'react';
import styles from './style.module.css';

export function Products() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
  });

  const [products, setProducts] = useState([
    {
      name: 'Notebook Lenovo',
      price: '3500.00',
      stock: '10',
      category: 'Informática',
    },
    {
      name: 'Cadeira Gamer',
      price: '1200.00',
      stock: '5',
      category: 'Móveis',
    },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);

  function handleDelete(indexToRemove) {
    setProducts((prevProducts) =>
      prevProducts.filter((_, index) => index !== indexToRemove)
    );
    if (editingIndex === indexToRemove) {
      setEditingIndex(null);
      setProduct({ name: '', price: '', stock: '', category: '' });
    }
  }

  return (
    <div className={styles.products}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();

          if (editingIndex !== null) {
            setProducts((prevProducts) =>
              prevProducts.map((p, i) => (i === editingIndex ? product : p))
            );
            setEditingIndex(null);
          } else {
            setProducts((prevProducts) => [...prevProducts, product]);
          }

          setProduct({ name: '', price: '', stock: '', category: '' });
        }}
      >
        <input
          type="text"
          placeholder="Nome do Produto"
          value={product.name}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Preço"
          value={product.price}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, price: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Estoque"
          value={product.stock}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, stock: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Categoria"
          value={product.category}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, category: e.target.value }))
          }
        />

        <button type="submit">
          {editingIndex !== null ? 'Salvar Edição' : 'Adicionar Produto'}
        </button>

        {editingIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingIndex(null);
              setProduct({ name: '', price: '', stock: '', category: '' });
            }}
          >
            Cancelar Edição
          </button>
        )}
      </form>

      <div className={styles.list}>
        <div className={styles.head}>
          <p>Nome</p>
          <p>Preço</p>
          <p>Estoque</p>
          <p>Categoria</p>
          <p>Ações</p>
        </div>
        {products.length >= 1 && (
          <div className={styles.liting}>
            {products.map((product, i) => (
              <div
                key={i}
                className={`${styles.product} ${
                  i === editingIndex ? styles.editing : ''
                }`}
              >
                <p>{product.name}</p>
                <p>R$ {parseFloat(product.price).toFixed(2)}</p>
                <p>{product.stock}</p>
                <p>{product.category}</p>
                <div className={styles.action}>
                  <button
                    onClick={() => {
                      setProduct(product);
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
