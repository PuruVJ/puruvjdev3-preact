import styles from './Home.module.css';
import { useState } from 'preact/hooks';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section class={styles.home}>
        <h2>Home</h2>
        <img src="~/1.jpg" />
        <p>This is the home page.</p>
        <span>
          <button style={{ width: 30 }} onClick={() => setCount(count - 1)}>
            -
          </button>
          <output style={{ padding: 10 }}>Count: {count}</output>
          <button style={{ width: 30 }} onClick={() => setCount(count + 1)}>
            +
          </button>
        </span>
      </section>
    </>
  );
}
