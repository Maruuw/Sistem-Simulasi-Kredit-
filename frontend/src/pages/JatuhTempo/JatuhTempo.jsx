import { useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import { formatRupiah } from '../../utils/formatter';
import { generateJadwal } from '../../utils/calculator';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

function JatuhTempo() {
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
      const response = await api.get('/angsuran/jatuh-tempo', {
        params: {
          kontrakNo: formData.kontrakNo,
          tanggal: formData.tanggal
        }
      });
      
      if (response.success) {
        setResult(response.data);
        showSuccess('Data angsuran berhasil dimuat.');
      } else {
        throw new Error(response.message || 'Gagal memuat data angsuran.');
      }
    } catch (err) {
      showError(err.message || 'Terjadi kesalahan saat memuat data.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="page-enter">
      <div className="pageHeader">
        <h2>Cek Angsuran Jatuh Tempo (Soal 2)</h2>
        <p>Lihat total angsuran yang sudah jatuh tempo berdasarkan tanggal tertentu.</p>
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
            {isSearching ? <span className="spinner"></span> : <><Search size={18} /> Cek Data</>}
          </button>
        </form>
      </div>

      {result ? (
        <div className="animate-fade-in-up stagger-2">
          <div className="grid-2 mb-6" style={{ marginBottom: '2rem' }}>
            <div className="hero-value-card" style={{ margin: 0 }}>
              <div className="hero-label">Total Jatuh Tempo</div>
              <div className="hero-amount">{formatRupiah(result.totalAngsuranJatuhTempo)}</div>
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
                <div className="summary-item" style={{ gridColumn: '1 / -1' }}>
                  <div className="summary-item-label">Jumlah Angsuran Jatuh Tempo</div>
                  <div className="summary-item-value">{result.jumlahAngsuranJatuhTempo} Bulan</div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="section-title" style={{ fontSize: '1.25rem', margin: '1.5rem 0 1rem' }}>Detail Jatuh Tempo</h3>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th width="10%">Angsuran Ke</th>
                  <th width="25%">Tanggal Jatuh Tempo</th>
                  <th width="25%" className="cell-number">Nominal Angsuran</th>
                  <th width="20%">Status Bayar</th>
                </tr>
              </thead>
              <tbody>
                {result.detail.map((j) => (
                  <tr 
                    key={j.angsuranKe} 
                    className={j.status === 'LUNAS' ? 'row-lunas' : 'row-overdue'}
                  >
                    <td className="cell-center">
                      <span className="badge badge-info">{j.angsuranKe}</span>
                    </td>
                    <td>{new Date(j.tanggalJatuhTempo).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    <td className="cell-number">{formatRupiah(j.angsuranPerBulan)}</td>
                    <td>
                      {j.status === 'LUNAS' ? (
                        <span className="badge badge-success">Sudah Dibayar</span>
                      ) : (
                        <span className="badge badge-danger">Belum Dibayar</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card card-static" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
          <div className="empty-state">
            <Calendar size={48} />
            <h3>Cari Data Angsuran</h3>
            <p>Masukkan nomor kontrak dan tanggal referensi untuk melihat total angsuran yang sudah jatuh tempo.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default JatuhTempo;
