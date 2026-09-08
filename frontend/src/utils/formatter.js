/**
 * Currency & date formatting utilities for Indonesian Rupiah.
 */

/**
 * Format number to Indonesian currency string (without "Rp" prefix).
 * @param {number} amount
 * @returns {string} e.g. "12.907.000"
 */
export function formatCurrency(amount) {
  if (amount == null || isNaN(amount)) return '0';
  const rounded = Math.round(amount);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Format number to full Rupiah string.
 * @param {number} amount
 * @returns {string} e.g. "Rp 12.907.000"
 */
export function formatRupiah(amount) {
  return `Rp ${formatCurrency(amount)}`;
}

/**
 * Parse formatted currency string back to number.
 * @param {string} str e.g. "240.000.000"
 * @returns {number}
 */
export function parseCurrency(str) {
  if (!str) return 0;
  const cleaned = str.toString().replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
}

/**
 * Format date to Indonesian locale string.
 * @param {string|Date} date
 * @returns {string} e.g. "25 Januari 2024"
 */
export function formatDate(date) {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';
  
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Format date to short string.
 * @param {string|Date} date
 * @returns {string} e.g. "25 Jan 2024"
 */
export function formatDateShort(date) {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';
  
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'
  ];
  
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Format date to YYYY-MM-DD (for input[type=date]).
 * @param {Date} date
 * @returns {string}
 */
export function toDateInput(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
}

/**
 * Calculate difference in days between two dates.
 * @param {string|Date} from
 * @param {string|Date} to
 * @returns {number}
 */
export function diffDays(from, to) {
  const d1 = new Date(from);
  const d2 = new Date(to);
  const diffMs = d2.getTime() - d1.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Format number as percentage.
 * @param {number} value
 * @param {number} decimals
 * @returns {string} e.g. "20%"
 */
export function formatPercent(value, decimals = 0) {
  if (value == null || isNaN(value)) return '0%';
  return `${Number(value).toFixed(decimals)}%`;
}
