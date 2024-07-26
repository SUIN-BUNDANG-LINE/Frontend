import { Header, Footer } from '@/components/layout/main';
import styles from './layout.module.css';

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
