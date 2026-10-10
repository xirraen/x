import Image from "next/image";
import WalletAddressButton from "./components/wallet-address-button";

const walletAddress = "0xCcA079160b4D308C5480BB40F066De58761a2e1D";

const networks = [
  { name: "Ethereum", asset: "ethereum.svg", tone: "ethereum" },
  { name: "Optimism", asset: "optimism.svg", tone: "optimism" },
  { name: "Arbitrum", asset: "arbitrum-one.svg", tone: "arbitrum" },
  { name: "Base", asset: "base.svg", tone: "base" },
  { name: "Gnosis", asset: "gnosis.svg", tone: "gnosis" },
  { name: "Polygon", asset: "polygon.svg", tone: "polygon" },
  { name: "Avalanche C-Chain", asset: "avalanche.svg", tone: "avalanche" },
];

type SocialApp = { name: string; asset: string; color: string; href: string; native?: boolean; darkTile?: boolean };

const socialApps: SocialApp[] = [
  { name: "Twitter", asset: "x.svg", color: "000000", href: "https://x.com/xirraen" },
  { name: "Bluesky", asset: "bluesky.svg", color: "1185FE", href: "https://bsky.app/profile/xirraen.bsky.social" },
  { name: "Farcaster", asset: "farcaster.svg", color: "855DCD", href: "https://farcaster.xyz/dropchoice" },
  { name: "Hey", asset: "hey.png", color: "FFFFFF", href: "https://hey.xyz/u/xirraen", native: true },
  { name: "UpScrolled", asset: "upscrolled.svg", color: "FFFFFF", href: "https://upscrolled.com/@xirraen", native: true, darkTile: true },
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
    eyebrow: "CATATAN · RISET",
    title: "Dokumentasi",
    description: "Catatan teknis dan keputusan yang terbuka.",
    href: "https://github.com/xirraen/x/tree/main/docs",
    mark: "↗",
    tone: "sage",
  },
];

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
            </div>
            <h2 className="sr-only" id="onchain-title">Ringkasan on-chain wallet</h2>

            <div className="balance-row">
              <strong className="balance-value">$0.000</strong>
              <span className="balance-token" role="img" aria-label="USDT Tether" title="USDT Tether">
                <Image src="/chain-icons/usdt-tether.png" alt="" width={18} height={18} />
              </span>
            </div>

            <dl className="onchain-metrics">
              <div><dt>TRANSAKSI</dt><dd>—</dd></div>
              <div><dt>UMUR</dt><dd>—</dd></div>
              <div><dt>GAS</dt><dd>—</dd></div>
              <div><dt>PROTOKOL</dt><dd>—</dd></div>
            </dl>

            <div className="chain-icons" aria-label="Tujuh jaringan yang diperiksa">
              {networks.map((network) => (
                <span className={`chain-icon chain-${network.tone}`} role="img" title={network.name} aria-label={network.name} key={network.name}>
                  <Image src={`/chain-icons/${network.asset}`} alt="" width={18} height={18} />
                </span>
              ))}
            </div>
          </section>

          <div className="top-links-stack">
            <nav className="links-folder" aria-label="Social media">
              <div className="social-grid">
                {socialApps.map((app) => {
                  const tileStyle = { backgroundColor: app.darkTile ? "#080808" : app.native ? "#fff" : `#${app.color}` };
                  return (
                    <a className={`social-tile is-linked${app.native ? " is-native" : ""}${app.darkTile ? " is-dark" : ""}`} href={app.href} target="_blank" rel="noreferrer" aria-label={app.name} title={app.name} style={tileStyle} key={app.name}>
                      <Image className={`social-brand-icon${app.native ? " is-native" : ""}${app.darkTile ? " is-compact" : ""}`} src={`/social-icons/${app.asset}`} alt="" width={20} height={20} />
                    </a>
                  );
                })}
              </div>
            </nav>

            <a className="project-card feature-dropchoice-card" href="https://dropchoice-web.vercel.app" target="_blank" rel="noreferrer" aria-label="Web3 Tracker: Dropchoice Beta">
              <Image className="dropchoice-logo" src="/dropchoice-logo.svg" alt="" width={30} height={30} />
              <span className="project-copy">
                <span className="project-eyebrow">WEB3 TRACKER</span>
                <strong>DROPCHOICE | BETA</strong>
              </span>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </a>

            <div className="coming-soon-card" role="note" aria-label="Coming soon">
              <span>COMING SOON</span>
            </div>
          </div>

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
