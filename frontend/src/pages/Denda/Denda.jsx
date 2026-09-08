import { useState } from 'react';
import { AlertTriangle, Search } from 'lucide-react';
import { formatRupiah } from '../../utils/formatter';
import { generateJadwal, hitungDenda } from '../../utils/calculator';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

function Denda() {
  const [formData, setFormData] = useState({
    kontrakNo: 'AGR00001',
    tanggal: '2024-08-14'
  });

  const [result, setResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const { showError, showSuccess } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setResult(null);

    try {
      const response = await api.get('/denda', {
        params: {
          kontrakNo: formData.kontrakNo,
          tanggal: formData.tanggal
        }
      });
      
      if (response.success) {
        setResult(response.data);
        showSuccess('Kalkulasi denda berhasil dimuat.');
      } else {
        throw new Error(response.message || 'Gagal memuat kalkulasi denda.');
      }
    } catch (err) {
      showError(err.message || 'Terjadi kesalahan saat mengkalkulasi denda.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="page-enter">
      <div className="pageHeader">
        <h2>Kalkulasi Denda Keterlambatan (Soal 3)</h2>
        <p>Hitung total denda keterlambatan pembayaran dengan persentase denda harian (0.1% per hari).</p>
      </div>

      <div className="card mb-6" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSearch} className="form-row" style={{ alignItems: 'flex-end' }}>
          <div className="form-group mb-0" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="kontrakNo">Nomor Kontrak</label>
            <input 
              id="kontrakNo"
              name="kontrakNo"
              type="text" 
              className="form-input mono" 
              value={formData.kontrakNo}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group mb-0" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="tanggal">Tanggal Referensi</label>
            <input 
              id="tanggal"
              name="tanggal"
              type="date" 
              className="form-input mono" 
              value={formData.tanggal}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSearching}>
            {isSearching ? <span className="spinner"></span> : <><Search size={18} /> Hitung Denda</>}
          </button>
        </form>
      </div>

      {result ? (
        <div className="animate-fade-in-up stagger-2">
          <div className="grid-2 mb-6" style={{ marginBottom: '2rem' }}>
            <div className="hero-value-card" style={{ margin: 0, background: 'var(--gradient-danger)' }}>
              <div className="hero-label">Total Denda</div>
              <div className="hero-amount">{formatRupiah(result.totalDendaKeseluruhan)}</div>
              <div className="hero-sub">Per tanggal {new Date(result.tanggalReferensi).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="summary-grid">
                <div className="summary-item">
                  <div className="summary-item-label">Nomor Kontrak</div>
                  <div className="summary-item-value">{result.kontrakNo}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-item-label">Nama Klien</div>
                  <div className="summary-item-value">{result.clientName}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-item-label">Denda Harian</div>
                  <div className="summary-item-value text-danger">{result.dendaPerHariPersen}%</div>
                </div>
                <div className="summary-item">
                  <div className="summary-item-label">Status</div>
                  <div className="summary-item-value">
                    <span className="badge badge-danger">OVERDUE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="section-title" style={{ fontSize: '1.25rem', margin: '1.5rem 0 1rem' }}>Rincian Keterlambatan</h3>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th width="10%">Angsuran Ke</th>
                  <th width="20%">Jatuh Tempo</th>
                  <th width="25%" className="cell-number">Nominal Angsuran</th>
                  <th width="20%" className="cell-center">Hari Terlambat</th>
                  <th width="25%" className="cell-number">Total Denda</th>
                </tr>
              </thead>
              <tbody>
                {result.detail.length > 0 ? (
                  result.detail.map((d) => (
                    <tr key={d.angsuranKe} className="row-overdue">
                      <td className="cell-center">
                        <span className="badge badge-info">{d.angsuranKe}</span>
                      </td>
                      <td>{new Date(d.tanggalJatuhTempo).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      <td className="cell-number">{formatRupiah(d.angsuranPerBulan)}</td>
                      <td className="cell-center">
                        <span className="badge badge-warning" style={{ fontSize: '0.875rem' }}>{d.hariKeterlambatan} Hari</span>
                      </td>
                      <td className="cell-number text-danger" style={{ fontWeight: 'bold' }}>
                        {formatRupiah(d.totalDenda)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="cell-center" style={{ padding: '2rem' }}>
                      Tidak ada angsuran yang overdue pada tanggal ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card card-static" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
          <div className="empty-state">
            <AlertTriangle size={48} />
            <h3>Hitung Denda</h3>
            <p>Masukkan nomor kontrak dan tanggal referensi untuk mengkalkulasi denda keterlambatan pembayaran.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Denda;
