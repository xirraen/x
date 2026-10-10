import Image from "next/image";
import { GlobalChat } from "@/components/GlobalChat";
import { ActivityCard, OnchainCard, OnchainDataProvider } from "./components/onchain-live";
import { walletAddress } from "@/lib/wallet";

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
        <OnchainDataProvider>
        <div className="bento-grid">
          <section className="profile-card" aria-labelledby="profile-name">
            <div className="profile-main">
              <Image
                className="profile-avatar"
                src="/xirraen-x-avatar.jpg"
                alt="Foto profil X @xirraen"
                width={86}
                height={86}
                priority
              />
              <div className="profile-copy">
                <div className="profile-title-row">
                  <h1 id="profile-name">XIRRAEN</h1>
                </div>
                <p className="profile-tagline">LIVING <span className="tagline-highlight">ON-CHAIN</span></p>
                <a className="profile-telegram" href="https://t.me/xirraen" target="_blank" rel="noreferrer" aria-label="Telegram xirraen">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 6.7 16.5 18c-.18.8-.66 1-1.33.62l-3.67-2.7-1.77 1.7c-.2.2-.36.36-.74.36l.26-3.73 6.8-6.15c.3-.26-.07-.4-.46-.15L7.2 13.3l-3.62-1.13c-.79-.25-.8-.79.17-1.16l14.16-5.46c.66-.24 1.24.16 1.03 1.15Z" fill="currentColor"/></svg>
                </a>
              </div>
            </div>
          </section>

          <OnchainCard address={walletAddress} />

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
          </div>

          <div className="left-project-stack">
            <a className="project-card feature-dropchoice-card" href="https://dropchoice-web.vercel.app" target="_blank" rel="noreferrer" aria-label="Web3 Tracker: Dropchoice">
              <Image className="dropchoice-logo" src="/dropchoice-mark.jpg" alt="" width={30} height={30} />
              <span className="project-copy">
                <span className="project-eyebrow">WEB3 TRACKER</span>
                <strong>DROPCHOICE</strong>
              </span>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </a>

            <div className="coming-soon-card" role="note" aria-label="Coming soon">
              <span>COMING SOON</span>
            </div>
            <div className="coming-soon-card" role="note" aria-label="Coming soon project 2">
              <span>COMING SOON</span>
            </div>
          </div>

          <section className="open-layout-panel" aria-label="Global Chat">
            <GlobalChat />
          </section>

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

          <ActivityCard />

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
        </OnchainDataProvider>

        <footer className="footer">
          <span>© 2026 <strong>xirraen</strong></span>
          <span className="footer-separator" aria-hidden="true">·</span>
          <span>exploring web3 ecosystems</span>
        </footer>
      </div>
    </main>
  );
}
