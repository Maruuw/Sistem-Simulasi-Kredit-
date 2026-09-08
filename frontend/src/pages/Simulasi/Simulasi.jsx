import { useState } from 'react';
import { Calculator, Save, RefreshCw } from 'lucide-react';
import { hitungAngsuran, generateJadwal } from '../../utils/calculator';
import { formatRupiah, formatCurrency, parseCurrency } from '../../utils/formatter';
import { useToast } from '../../context/ToastContext';

function Simulasi() {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    clientName: 'SUGUS',
    kendaraan: 'Toyota Avanza',
    otr: '240000000',
    dpPercent: '20',
    tenor: '18',
    sukuBunga: '14',
    tanggalMulai: '2024-01-25'
  });

  const [result, setResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'otr') {
      // Format as currency while typing
      const numericVal = parseCurrency(value);
      setFormData(prev => ({ ...prev, [name]: numericVal ? formatCurrency(numericVal) : '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSimulasi = (e) => {
    e.preventDefault();
    setIsSimulating(true);
    
    try {
      const otrNumeric = parseCurrency(formData.otr);
      if (!otrNumeric || otrNumeric <= 0) {
        throw new Error('Harga OTR harus lebih dari 0');
      }

      // Simulate network delay
      setTimeout(() => {
        const calcResult = hitungAngsuran(
          otrNumeric,
          parseFloat(formData.dpPercent),
          parseInt(formData.tenor, 10),
          parseFloat(formData.sukuBunga)
        );

        const jadwal = generateJadwal(
          formData.tanggalMulai,
          calcResult.tenor,
          calcResult.angsuranPerBulan
        );

        setResult({
          ringkasan: calcResult,
          jadwal
        });
        
        showSuccess('Simulasi berhasil dihitung!');
        setIsSimulating(false);
      }, 600);
    } catch (err) {
      showError(err.message || 'Gagal menghitung simulasi');
      setIsSimulating(false);
    }
  };

  return (
    <div className="page-enter">
      <div className="pageHeader">
        <h2>Simulasi Kredit (Soal 1)</h2>
        <p>Kalkulator angsuran kendaraan menggunakan metode Flat Rate.</p>
      </div>

      <div className="grid-2">
        {/* Form Section */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Parameter Kredit</h3>
          </div>
          
          <form onSubmit={handleSimulasi}>
            <div className="form-group">
              <label className="form-label" htmlFor="clientName">Nama Klien</label>
              <input 
                id="clientName"
                name="clientName"
                type="text" 
                className="form-input" 
                value={formData.clientName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="kendaraan">Kendaraan</label>
              <input 
                id="kendaraan"
                name="kendaraan"
                type="text" 
                className="form-input" 
                value={formData.kendaraan}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="otr">Harga OTR (Rp)</label>
                <input 
                  id="otr"
                  name="otr"
                  type="text" 
                  className="form-input mono" 
                  value={formData.otr}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="dpPercent">Down Payment (%)</label>
                <input 
                  id="dpPercent"
                  name="dpPercent"
                  type="number" 
                  min="0"
                  max="100"
                  step="0.1"
                  className="form-input" 
                  value={formData.dpPercent}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="tenor">Tenor (Bulan)</label>
                <select 
                  id="tenor"
                  name="tenor"
                  className="form-input"
                  value={formData.tenor}
                  onChange={handleInputChange}
                  required
                >
                  <option value="6">6 Bulan</option>
                  <option value="12">12 Bulan</option>
                  <option value="18">18 Bulan</option>
                  <option value="24">24 Bulan</option>
                  <option value="36">36 Bulan</option>
                  <option value="48">48 Bulan</option>
                  <option value="60">60 Bulan</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="sukuBunga">Bunga Flat (%/thn)</label>
                <input 
                  id="sukuBunga"
                  name="sukuBunga"
                  type="number" 
                  min="0"
                  step="0.1"
                  className="form-input" 
                  value={formData.sukuBunga}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="tanggalMulai">Tanggal Mulai (Jatuh Tempo)</label>
              <input 
                id="tanggalMulai"
                name="tanggalMulai"
                type="date" 
                className="form-input mono" 
                value={formData.tanggalMulai}
                onChange={handleInputChange}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary" disabled={isSimulating} style={{ flex: 1 }}>
                {isSimulating ? (
                  <><span className="spinner"></span> Menghitung...</>
                ) : (
                  <><Calculator size={18} /> Hitung Simulasi</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Result Section */}
        {result ? (
          <div className="animate-fade-in-up stagger-2">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Ringkasan Hasil</h3>
              </div>
              
              <div className="hero-value-card">
                <div className="hero-label">Angsuran Per Bulan</div>
                <div className="hero-amount">{formatRupiah(result.ringkasan.angsuranPerBulan)}</div>
                <div className="hero-sub">Selama {result.ringkasan.tenor} bulan</div>
              </div>

              <div className="summary-grid">
                <div className="summary-item">
                  <div className="summary-item-label">Nilai DP</div>
                  <div className="summary-item-value">{formatRupiah(result.ringkasan.dpAmount)}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-item-label">Pokok Pinjaman</div>
                  <div className="summary-item-value">{formatRupiah(result.ringkasan.pokokPinjaman)}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-item-label">Total Bunga ({result.ringkasan.sukuBunga}%)</div>
                  <div className="summary-item-value">{formatRupiah(result.ringkasan.totalBunga)}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-item-label">Total Pinjaman</div>
                  <div className="summary-item-value">{formatRupiah(result.ringkasan.totalPinjaman)}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card card-static" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="empty-state">
              <Calculator size={48} />
              <h3>Belum Ada Hasil</h3>
              <p>Isi parameter di samping dan klik "Hitung Simulasi" untuk melihat kalkulasi dan jadwal angsuran.</p>
            </div>
          </div>
        )}
      </div>

      {/* Jadwal Angsuran Table */}
      {result && (
        <div className="animate-fade-in-up stagger-4" style={{ marginTop: '2rem' }}>
          <h2 className="section-title">Jadwal Angsuran</h2>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th width="10%">Angsuran Ke</th>
                  <th width="30%">Tanggal Jatuh Tempo</th>
                  <th width="30%" className="cell-number">Nominal Angsuran</th>
                  <th width="30%">Status Simulasi</th>
                </tr>
              </thead>
              <tbody>
                {result.jadwal.map((j) => (
                  <tr key={j.angsuranKe} className={`stagger-${(j.angsuranKe % 8) + 1}`}>
                    <td className="cell-center">
                      <span className="badge badge-info">{j.angsuranKe} / {result.ringkasan.tenor}</span>
                    </td>
                    <td>{new Date(j.tanggalJatuhTempo).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    <td className="cell-number">{formatRupiah(j.angsuranPerBulan)}</td>
                    <td>
                      <span className="badge badge-warning">Belum Lunas</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Simulasi;
