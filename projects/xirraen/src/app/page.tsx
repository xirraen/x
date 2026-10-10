type LinkItem = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  mark: string;
  tone: string;
};

const links: LinkItem[] = [
  {
    eyebrow: "OPEN SOURCE · REPOSITORY",
    title: "Workspace & kode",
    description: "Eksperimen, praktik engineering, dan proyek yang sedang dibangun.",
    href: "https://github.com/xirraen/x",
    mark: "GH",
    tone: "blue",
  },
  {
    eyebrow: "PROYEK · PROTOTIPE",
    title: "Dropchoice",
    description: "Ruang riset Web3 yang mengutamakan bukti, konteks, dan keselamatan.",
    href: "https://github.com/xirraen/x/tree/main/projects/dropchoice",
    mark: "D",
    tone: "violet",
  },
  {
    eyebrow: "DOKUMENTASI · ENGINEERING",
    title: "Catatan & prinsip",
    description: "Arsitektur, keputusan teknis, keamanan, dan cara kerja yang transparan.",
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

export default function Home() {
  return (
    <main className="page-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <div className="page-content">
        <header className="topbar">
          <a className="wordmark" href="#top" aria-label="xirraen, beranda">
            <span className="wordmark-glyph" aria-hidden="true"><i /><i /><i /></span>
            <span>RUANG KERJA <b>/</b> PERSONAL</span>
          </a>
          <a className="contact-button" href="https://t.me/xirraen" target="_blank" rel="noreferrer">
            Terhubung <span aria-hidden="true">↗</span>
          </a>
        </header>

        <section className="profile-card" id="top" aria-labelledby="profile-name">
          <div className="profile-topline">
            <div className="avatar-mark" aria-hidden="true">
              <span className="avatar-orbit orbit-a" />
              <span className="avatar-orbit orbit-b" />
              <span className="avatar-core" />
            </div>
            <span className="profile-status"><span /> INDEPENDENT DEVELOPER</span>
          </div>
          <h1 id="profile-name">xirraen<span className="period">.</span></h1>
          <p className="handle">@xirraen <span>·</span> rekayasa perangkat lunak &amp; riset teknis</p>
          <p className="bio">Saya membangun produk digital yang praktis—dimulai dari riset cermat, batasan yang jelas, dan keputusan berbasis bukti.</p>
          <div className="profile-tags" aria-label="Fokus">
            <span>Software</span><span>Research</span><span>Digital products</span>
          </div>
        </section>

        <nav className="social-links" aria-label="Profil sosial">
          <a className="social-button x-social" href="https://x.com/xirraen" target="_blank" rel="noreferrer" aria-label="Profil X xirraen">𝕏</a>
          <a className="social-button" href="https://github.com/xirraen" target="_blank" rel="noreferrer" aria-label="GitHub xirraen"><GitHubMark /></a>
          <a className="social-button" href="https://t.me/xirraen" target="_blank" rel="noreferrer" aria-label="Telegram xirraen"><TelegramMark /></a>
        </nav>

        <section className="links-section" id="links" aria-labelledby="links-heading">
          <div className="section-heading">
            <div>
              <span className="section-kicker">01 / PROYEK &amp; CATATAN</span>
              <h2 id="links-heading">Jelajahi yang sedang saya bangun</h2>
            </div>
            <span className="section-index" aria-hidden="true">↘</span>
          </div>

          <div className="link-list">
            {links.map((link, index) => (
              <a className="link-card" href={link.href} target="_blank" rel="noreferrer" key={link.title}>
                <span className={`link-mark ${link.tone}`} aria-hidden="true">{link.mark}</span>
                <span className="link-copy">
                  <span className="link-eyebrow">{link.eyebrow}</span>
                  <strong>{link.title}</strong>
                  <span className="link-description">{link.description}</span>
                </span>
                <span className="link-arrow" aria-hidden="true">↗</span>
                <span className="sr-only">Buka {link.title} (tautan eksternal, nomor {index + 1})</span>
              </a>
            ))}
          </div>
        </section>

        <section className="principle-note" aria-label="Prinsip kerja">
          <span className="note-mark" aria-hidden="true">“</span>
          <p><strong>Bukti di atas asumsi.</strong> Jelas lebih penting daripada rumit.</p>
          <span className="note-caption">CARA SAYA BEKERJA</span>
        </section>

        <footer className="footer">
          <span>© 2026 <strong>xirraen</strong></span>
          <span className="footer-separator" aria-hidden="true">·</span>
          <span>Dibangun dengan sengaja, satu langkah pada satu waktu.</span>
        </footer>
      </div>
    </main>
  );
}
