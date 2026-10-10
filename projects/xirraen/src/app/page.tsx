import Image from "next/image";
import WalletAddressButton from "./components/wallet-address-button";

const walletAddress = "0x229d4c9b9bad660008e1210d3be7182b75c27e28";

const networks = [
  { name: "Ethereum", mark: "ETH", tone: "ethereum" },
  { name: "Optimism", mark: "OP", tone: "optimism" },
  { name: "Arbitrum", mark: "ARB", tone: "arbitrum" },
  { name: "Base", mark: "BASE", tone: "base" },
  { name: "Gnosis", mark: "GNO", tone: "gnosis" },
  { name: "Polygon", mark: "POL", tone: "polygon" },
  { name: "Avalanche C-Chain", mark: "AVAX", tone: "avalanche" },
];

const profileLinks = [
  { name: "X", href: "https://x.com/xirraen", kind: "x", tone: "x" },
  { name: "GitHub", href: "https://github.com/xirraen", kind: "github", tone: "github" },
  { name: "Telegram", href: "https://t.me/xirraen", kind: "telegram", tone: "telegram" },
  { name: "Blockscout Explorer", href: `https://eth.blockscout.com/address/${walletAddress}`, kind: "explorer", tone: "explorer" },
];

const projects = [
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
    description: "Catatan teknis dan keputusan yang terbuka.",
    href: "https://github.com/xirraen/x/tree/main/docs",
    mark: "↗",
    tone: "sage",
  },
];

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="folder-svg">
      <path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.72.78 1.14 1.78 1.14 3.01 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function TelegramMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="folder-svg">
      <path fill="currentColor" d="M21.5 3.2 18.2 20c-.25 1.19-.91 1.48-1.85.92l-5.1-3.76-2.46 2.37c-.27.27-.5.5-1.03.5l.37-5.2 9.48-8.56c.41-.37-.09-.57-.64-.2L5.25 13.2.2 11.62c-1.1-.35-1.12-1.1.23-1.63L20.2 2.36c.91-.33 1.7.22 1.3.84Z" transform="translate(1 0) scale(.92)" />
    </svg>
  );
}

function ExplorerMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="folder-svg">
      <path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ProfileLinkMark({ kind }: { kind: string }) {
  if (kind === "github") return <GitHubMark />;
  if (kind === "telegram") return <TelegramMark />;
  if (kind === "explorer") return <ExplorerMark />;
  return <span className="x-mark" aria-hidden="true">𝕏</span>;
}

export default function Home() {
  return (
    <main className="page-shell" id="top">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <div className="page-content">
        <div className="bento-grid">
          <section className="profile-card" aria-labelledby="profile-name">
            <div className="profile-cover" aria-hidden="true">
              <span className="cover-orbit cover-orbit-one" />
              <span className="cover-orbit cover-orbit-two" />
              <span className="cover-glint" />
            </div>
            <div className="profile-main">
              <Image
                className="profile-avatar"
                src="/xirraen-avatar.webp"
                alt="Avatar abstrak Web3 xirraen"
                width={86}
                height={86}
                priority
              />
              <div className="profile-copy">
                <h1 id="profile-name">xirraen<span className="period">.</span></h1>
                <p className="handle">@xirraen <span aria-hidden="true">·</span> exploring web3 ecosystems</p>
                <p className="bio">Menjelajahi protokol on-chain, budaya aset digital, dan komunitas yang membentuk internet terbuka.</p>
                <div className="profile-tags" aria-label="Topik profil"><span>WEB3</span><span>ON-CHAIN</span></div>
              </div>
            </div>
          </section>

          <section className="onchain-card" aria-labelledby="onchain-title">
            <div className="onchain-head">
              <WalletAddressButton address={walletAddress} />
              <span className="snapshot-pill">7 CHAIN</span>
            </div>
            <h2 className="sr-only" id="onchain-title">Ringkasan on-chain wallet</h2>

            <div className="balance-row">
              <div>
                <span className="balance-caption">ESTIMASI NILAI · USD</span>
                <strong className="balance-value">$0.000</strong>
              </div>
              <span className="balance-token" aria-hidden="true">◎</span>
            </div>

            <div className="allocation-wrap" aria-label="Belum ada data alokasi aset atau perubahan 24 jam">
              <div className="allocation-track"><span /></div>
              <div className="allocation-label"><span>ALOKASI ASET</span><strong>24J —%</strong></div>
            </div>

            <dl className="onchain-metrics">
              <div><dt>TOTAL TX</dt><dd>—</dd></div>
              <div><dt>UMUR</dt><dd>—</dd></div>
              <div><dt>GAS</dt><dd>—</dd></div>
              <div><dt>PROTOKOL</dt><dd>—</dd></div>
            </dl>

            <div className="chain-icons" aria-label="Tujuh jaringan yang diperiksa">
              {networks.map((network) => (
                <span className={`chain-icon chain-${network.tone}`} title={network.name} aria-label={network.name} key={network.name}>
                  {network.mark}
                </span>
              ))}
            </div>
            <p className="snapshot-note">Saldo snapshot: 10 Okt 2026, 15:39 WIB. Metrik aktivitas belum diindeks.</p>
          </section>

          <nav className="links-folder" aria-label="Folder tautan sosial dan Web3">
            <div className="folder-heading"><span>FOLDER LINKS</span><span>04</span></div>
            <div className="folder-grid">
              {profileLinks.map((link) => (
                <a className={`folder-link folder-${link.tone}`} href={link.href} target="_blank" rel="noreferrer" aria-label={link.name} title={link.name} key={link.name}>
                  <ProfileLinkMark kind={link.kind} />
                </a>
              ))}
            </div>
          </nav>

          <section className="empty-tile ecosystem-tile" aria-labelledby="ecosystem-heading">
            <div className="tile-heading">
              <div><span className="tile-kicker">02 / EXPLORATION</span><h2 id="ecosystem-heading">Ekosistem</h2></div>
              <span className="tile-index">01</span>
            </div>
            <div className="empty-state">
              <span className="empty-symbol" aria-hidden="true">⌁</span>
              <div><strong>Belum ada daftar publik</strong><p>Proyek yang ingin ditampilkan bisa ditambahkan setelah dipilih.</p></div>
            </div>
          </section>

          <section className="empty-tile activity-tile" aria-labelledby="activity-heading">
            <div className="tile-heading">
              <div><span className="tile-kicker">03 / ACTIVITY</span><h2 id="activity-heading">Aktivitas terbaru</h2></div>
              <span className="live-pill"><i aria-hidden="true" /> OFFLINE</span>
            </div>
            <div className="activity-empty">
              <span className="activity-line" aria-hidden="true" />
              <p>Feed aktivitas belum terhubung. Tidak ada transaksi atau pembaruan yang dikarang.</p>
            </div>
          </section>

          <section className="projects-section" aria-labelledby="projects-heading">
            <div className="projects-heading">
              <div><span className="tile-kicker">04 / BUILD IN PUBLIC</span><h2 id="projects-heading">Proyek &amp; catatan</h2></div>
              <span className="tile-index" aria-hidden="true">↘</span>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <a className={`project-card project-${project.tone}`} href={project.href} target="_blank" rel="noreferrer" key={project.title}>
                  <span className="project-mark" aria-hidden="true">{project.mark}</span>
                  <span className="project-copy"><span className="project-eyebrow">{project.eyebrow}</span><strong>{project.title}</strong><span className="project-description">{project.description}</span></span>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </section>
        </div>

        <footer className="footer">
          <span>© 2026 <strong>xirraen</strong></span>
          <span className="footer-separator" aria-hidden="true">·</span>
          <span>exploring web3 ecosystems</span>
        </footer>
      </div>
    </main>
  );
}
