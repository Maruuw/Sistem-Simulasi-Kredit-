import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Calculator, FileText,
  Calendar, AlertTriangle, Banknote,
} from 'lucide-react';
import styles from './Layout.module.css';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/simulasi', icon: Calculator, label: 'Simulasi Kredit' },
  { to: '/kontrak', icon: FileText, label: 'Daftar Kontrak' },
  { to: '/angsuran', icon: Calendar, label: 'Angsuran Jatuh Tempo' },
  { to: '/denda', icon: AlertTriangle, label: 'Denda Keterlambatan' },
];

function Layout() {
  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <Banknote size={22} color="#fff" />
          </div>
          <div className={styles.brandText}>
            <h1>IMS Finance</h1>
            <span>Installment System</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navLabel}>Menu Utama</div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              <item.icon className={styles.navIcon} size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <p className={styles.footerInfo}>
            PT. Inovasi Mitra Sejati<br />
            © 2024 IMS Finance
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
