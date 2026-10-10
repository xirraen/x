import Image from "next/image";
import WalletAddressButton from "./components/wallet-address-button";

const walletAddress = "0x229d4c9b9bad660008e1210d3be7182b75c27e28";

const networks = [
  { name: "Ethereum", mark: "ETH", href: `https://eth.blockscout.com/address/${walletAddress}` },
  { name: "Optimism", mark: "OP", href: `https://optimism.blockscout.com/address/${walletAddress}` },
  { name: "Arbitrum", mark: "ARB", href: `https://arbitrum.blockscout.com/address/${walletAddress}` },
  { name: "Base", mark: "BASE", href: `https://base.blockscout.com/address/${walletAddress}` },
  { name: "Gnosis", mark: "GNO", href: `https://gnosis.blockscout.com/address/${walletAddress}` },
  { name: "Polygon", mark: "POL", href: `https://polygon.blockscout.com/address/${walletAddress}` },
  { name: "Avalanche C-Chain", mark: "AVAX" },
];

const links = [
  {
    eyebrow: "OPEN SOURCE · GITHUB",
    title: "Repositori",
    description: "Eksperimen dan proyek yang sedang dibangun.",
    href: "https://github.com/xirraen/x",
    mark: "GH",
    tone: "blue",
  },
  {
    eyebrow: "PROYEK · WEB3",
    title: "Dropchoice",
    description: "Ruang eksplorasi untuk produk dan ekosistem Web3.",
    href: "https://github.com/xirraen/x/tree/main/projects/dropchoice",
    mark: "D",
    tone: "violet",
  },
  {
    eyebrow: "CATATAN · RISET",
    title: "Dokumentasi",
    description: "Catatan teknis, konteks, dan keputusan yang terbuka.",
    href: "https://github.com/xirraen/x/tree/main/docs",
    mark: "↗",
    tone: "sage",
  },
];

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-svg">
      <path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.72.78 1.14 1.78 1.14 3.01 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function TelegramMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-svg">
      <path fill="currentColor" d="M21.5 3.2 18.2 20c-.25 1.19-.91 1.48-1.85.92l-5.1-3.76-2.46 2.37c-.27.27-.5.5-1.03.5l.37-5.2 9.48-8.56c.41-.37-.09-.57-.64-.2L5.25 13.2.2 11.62c-1.1-.35-1.12-1.1.23-1.63L20.2 2.36c.91-.33 1.7.22 1.3.84Z" transform="translate(1 0) scale(.92)" />
    </svg>
  );
}

function ChartMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="chart-mark">
      <path d="M4 18.5h16M5.5 15l4-4 3.1 2.3 5.8-6.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18.4" cy="7.2" r="1.4" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="page-shell" id="top">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <div className="page-content">
        <section className="profile-card" aria-labelledby="profile-name">
          <div className="profile-cover" aria-hidden="true">
            <span className="cover-orbit cover-orbit-one" />
            <span className="cover-orbit cover-orbit-two" />
            <span className="cover-glint" />
          </div>
          <div className="profile-avatar-wrap">
            <Image
              className="profile-avatar"
              src="/xirraen-avatar.webp"
              alt="Avatar abstrak Web3 xirraen"
              width={112}
              height={112}
              priority
            />
          </div>
          <div className="profile-copy">
            <h1 id="profile-name">xirraen<span className="period">.</span></h1>
            <p className="handle">@xirraen <span aria-hidden="true">—</span> exploring web3 ecosystems</p>
            <p className="bio">Menjelajahi protokol on-chain, budaya aset digital, dan komunitas yang membentuk internet terbuka.</p>
          </div>
        </section>

        <nav className="social-links" aria-label="Profil sosial xirraen">
          <a className="social-button x-social" href="https://x.com/xirraen" target="_blank" rel="noreferrer" aria-label="Profil X xirraen">𝕏</a>
          <a className="social-button" href="https://github.com/xirraen" target="_blank" rel="noreferrer" aria-label="GitHub xirraen"><GitHubMark /></a>
          <a className="social-button" href="https://t.me/xirraen" target="_blank" rel="noreferrer" aria-label="Telegram xirraen"><TelegramMark /></a>
        </nav>

        <section className="wallet-section" id="wallet" aria-labelledby="wallet-heading">
          <div className="section-heading wallet-heading">
            <div>
              <span className="section-kicker">01 / ON-CHAIN IDENTITY</span>
              <h2 id="wallet-heading">Wallet</h2>
            </div>
            <span className="chain-count">7 jaringan diperiksa</span>
          </div>

          <WalletAddressButton address={walletAddress} />

          <div className="portfolio-card" aria-labelledby="portfolio-heading">
            <div className="portfolio-header">
              <div className="portfolio-title-wrap">
                <span className="portfolio-icon"><ChartMark /></span>
                <div>
                  <span className="portfolio-kicker">PORTFOLIO SNAPSHOT</span>
                  <h3 id="portfolio-heading">Aset &amp; pergerakan</h3>
                </div>
              </div>
              <span className="timeframe-pill">24 JAM</span>
            </div>

            <div className="portfolio-stats" aria-label="Ringkasan wallet pada jaringan yang diperiksa">
              <div><span>Token terdeteksi</span><strong>0</strong></div>
              <div><span>Saldo native</span><strong>0</strong></div>
              <div><span>Perubahan 24 jam</span><strong className="unavailable-value">—%</strong></div>
            </div>

            <div className="empty-assets">
              <div className="empty-chart" aria-hidden="true">
                <span className="chart-grid-line chart-grid-one" />
                <span className="chart-grid-line chart-grid-two" />
                <span className="chart-grid-line chart-grid-three" />
                <span className="chart-empty-badge">NO ASSET DATA</span>
              </div>
              <div className="empty-copy">
                <span className="empty-dot" aria-hidden="true" />
                <div>
                  <strong>Belum ada aset untuk digrafikkan</strong>
                  <p>Explorer publik menunjukkan saldo native dan token bernilai 0 pada jaringan yang diperiksa. Persentase 24 jam tidak ditampilkan tanpa aset.</p>
                </div>
              </div>
            </div>

            <div className="network-coverage">
              <span className="coverage-label">JARINGAN DIPERIKSA</span>
              <div className="network-list">
                {networks.map((network) => (
                  network.href ? (
                    <a className="network-chip" href={network.href} target="_blank" rel="noreferrer" key={network.name}>
                      <span>{network.mark}</span>{network.name}<span className="network-zero">0</span>
                    </a>
                  ) : (
                    <span className="network-chip" key={network.name}>
                      <span>{network.mark}</span>{network.name}<span className="network-zero">0</span>
                    </span>
                  )
                ))}
              </div>
            </div>

            <p className="snapshot-note">
              Diperiksa 10 Okt 2026, 15:39 WIB · Sumber: Blockscout (6 jaringan) dan RouteScan (Avalanche C-Chain). Cakupan ini terbatas pada jaringan yang tercantum.
            </p>
          </div>
        </section>

        <section className="links-section" id="links" aria-labelledby="links-heading">
          <div className="section-heading links-heading">
            <div>
              <span className="section-kicker">02 / EKOSISTEM</span>
              <h2 id="links-heading">Temukan proyek &amp; catatan</h2>
            </div>
            <span className="section-index" aria-hidden="true">↘</span>
          </div>

          <div className="link-list">
            {links.map((link) => (
              <a className="link-card" href={link.href} target="_blank" rel="noreferrer" key={link.title}>
                <span className={`link-mark ${link.tone}`} aria-hidden="true">{link.mark}</span>
                <span className="link-copy">
                  <span className="link-eyebrow">{link.eyebrow}</span>
                  <strong>{link.title}</strong>
                  <span className="link-description">{link.description}</span>
                </span>
                <span className="link-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <footer className="footer">
          <span>© 2026 <strong>xirraen</strong></span>
          <span className="footer-separator" aria-hidden="true">·</span>
          <span>exploring web3 ecosystems</span>
        </footer>
      </div>
    </main>
  );
}
