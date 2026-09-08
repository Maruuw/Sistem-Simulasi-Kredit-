import { useState } from 'react';
import { Calculator, ArrowRight, Activity, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="page-enter">
      <div className="pageHeader">
        <h2>Dashboard</h2>
        <p>Ringkasan sistem manajemen angsuran IMS Finance.</p>
      </div>

      <div className="grid-4">
        {/* Quick Stats */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Total Kontrak</h3>
            <Users size={20} className="text-muted" />
          </div>
          <div className="stat-value">124</div>
          <div className="stat-label">Bulan Ini</div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Performa Angsuran</h3>
            <Activity size={20} className="text-success" />
          </div>
          <div className="stat-value success">94%</div>
          <div className="stat-label">Lancar</div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Potensi Denda</h3>
            <Calculator size={20} className="text-warning" />
          </div>
          <div className="stat-value danger">24</div>
          <div className="stat-label">Kontrak Overdue</div>
        </div>
      </div>

      <h2 className="section-title">Aksi Cepat</h2>
      <div className="grid-2 mt-4">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Simulasi Kredit (Soal 1)</h3>
          </div>
          <p className="text-secondary mb-4">
            Kalkulator angsuran kendaraan dengan metode flat rate. Menghasilkan jadwal pembayaran lengkap.
          </p>
          <Link to="/simulasi" className="btn btn-primary">
            Mulai Simulasi <ArrowRight size={16} />
          </Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Cek Jatuh Tempo (Soal 2)</h3>
          </div>
          <p className="text-secondary mb-4">
            Lihat total angsuran yang sudah jatuh tempo berdasarkan tanggal referensi.
          </p>
          <Link to="/angsuran" className="btn btn-secondary">
            Cek Angsuran <ArrowRight size={16} />
          </Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Kalkulasi Denda (Soal 3)</h3>
          </div>
          <p className="text-secondary mb-4">
            Hitung total denda keterlambatan pembayaran dengan persentase denda harian.
          </p>
          <Link to="/denda" className="btn btn-secondary">
            Hitung Denda <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
