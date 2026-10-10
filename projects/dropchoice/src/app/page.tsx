"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowDownRight, ArrowUpRight, Bell, Bookmark, CheckCircle2, ChevronDown, CircleHelp, Compass, ExternalLink, Filter, Flame, LayoutDashboard, Search, ShieldCheck, Sparkles, Wallet, Zap } from "lucide-react";

const opportunities = [
  { name: "Monad", category: "Layer 1", chain: "Monad", status: "Potential", score: 92, raised: "$244M", task: "Testnet & ecosystem activity", color: "violet", tags: ["Testnet", "EVM"] },
  { name: "MegaETH", category: "Layer 2", chain: "Ethereum", status: "Research", score: 87, raised: "$20M", task: "Testnet interaction", color: "orange", tags: ["Testnet", "Layer 2"] },
  { name: "Abstract", category: "Layer 2", chain: "Ethereum", status: "Ongoing", score: 81, raised: "$11M", task: "Explore ecosystem apps", color: "blue", tags: ["Ecosystem", "Layer 2"] },
  { name: "Hyperlane", category: "Infrastructure", chain: "Multichain", status: "Research", score: 76, raised: "$18.5M", task: "Cross-chain activity", color: "green", tags: ["Bridge", "Multichain"] },
];

const nav = [{ label: "Overview", icon: LayoutDashboard }, { label: "Explore", icon: Compass }, { label: "My Watchlist", icon: Bookmark }, { label: "On-chain Activity", icon: Activity }];

export default function Home() {
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [watchlistOnly, setWatchlistOnly] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("dropchoice:bookmarks");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setBookmarks(parsed.filter((id): id is string => typeof id === "string" && opportunities.some((item) => item.name === id)));
      }
    } catch { /* Storage can be unavailable in private browsing; keep this session usable. */ }
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem("dropchoice:bookmarks", JSON.stringify(bookmarks)); }
    catch { /* Do not break browsing if local storage is blocked or full. */ }
  }, [bookmarks]);

  const filteredOpportunities = useMemo(() => opportunities.filter((item) => {
    const term = query.trim().toLowerCase();
    const matches = !term || [item.name, item.category, item.chain, item.status, item.task, ...item.tags].some((value) => value.toLowerCase().includes(term));
    return matches && (!watchlistOnly || bookmarks.includes(item.name));
  }), [query, bookmarks, watchlistOnly]);

  function toggleBookmark(name: string) {
    setBookmarks((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  }

  return <main className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#top"><span className="brand-mark"><Sparkles size={19} /></span><span>dropchoice<span className="brand-dot">.</span><small>RESEARCH WORKSPACE</small></span></a>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{nav.map((item, i) => <a key={item.label} className={`nav-item ${i === 0 ? "active" : ""}`} href={i === 2 ? "#opportunities" : i === 3 ? "#activity" : i === 0 ? "#top" : "#opportunities"} onClick={i === 2 ? () => setWatchlistOnly(true) : undefined}><item.icon size={17}/>{item.label}{i === 1 && <span className="nav-count">24</span>}</a>)}</nav>
      <div className="sidebar-divider"/><div className="workspace-label">TOOLS</div>
      <a className="nav-item" href="#safety"><ShieldCheck size={17}/>Safety Center</a><a className="nav-item" href="#activity"><Bell size={17}/>Alerts <span className="status-dot"/></a>
      <div className="sidebar-bottom"><div className="upgrade-icon"><Zap size={17}/></div><b>Research smarter</b><p>Keep your opportunities organized in one place.</p><a href="#opportunities" className="sidebar-cta">Explore opportunities <ArrowUpRight size={14}/></a><div className="profile"><div className="avatar">X</div><div><b>Guest researcher</b><small>Local demo workspace</small></div><ChevronDown size={15}/></div></div>
    </aside>
    <section className="main-content" id="top">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <b>Overview</b></div><div className="top-actions"><span className="demo-pill"><span/> DEMO DATA</span><button className="icon-button" aria-label="Notifications"><Bell size={18}/></button><button className="wallet-button"><Wallet size={16}/> Connect wallet <ChevronDown size={14}/></button></div></header>
      <div className="page-content">
        <section className="welcome-row"><div><div className="eyebrow"><Sparkles size={13}/> YOUR WEB3 RESEARCH HUB</div><h1>Make every move <span>count.</span></h1><p className="subtitle">Discover opportunities. Track your research. Stay ahead of the airdrop curve.</p></div><button className="date-button"> <Activity size={15}/> Research overview <ChevronDown size={14}/></button></section>
        <section className="hero-card"><div className="hero-copy"><div className="hero-label"><span className="live-pulse"/> YOUR RESEARCH, IN ONE PLACE</div><h2>Find your next<br/>on-chain opportunity.</h2><p>Build a smarter routine with a curated view of emerging ecosystems, testnets, and Web3 campaigns.</p><a href="#opportunities" className="primary-button">Explore opportunities <ArrowUpRight size={16}/></a><div className="hero-foot"><ShieldCheck size={14}/> Research-first · Non-custodial · No seed phrase required</div></div><div className="hero-graphic" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="orb-core"><Sparkles size={32}/></div><div className="float-card float-one"><span className="float-icon purple"><Zap size={16}/></span><span><b>New opportunity</b><small>Added to research</small></span><CheckCircle2 size={16} className="float-check"/></div><div className="float-card float-two"><span className="float-icon cyan"><Activity size={16}/></span><span><b>Activity tracker</b><small>Ready to configure</small></span></div><div className="graphic-chip">WEB3 <span>×</span> RESEARCH</div></div></section>
        <section className="stats-grid"><article className="stat-card"><div className="stat-top"><span>Tracked opportunities</span><span className="stat-icon blue-bg"><Compass size={17}/></span></div><div className="stat-value">24 <small className="stat-change"><ArrowUpRight size={13}/> 4 new</small></div><div className="stat-foot">Across multiple ecosystems</div><div className="stat-bar"><span style={{width:"68%"}}/></div></article><article className="stat-card"><div className="stat-top"><span>Watchlist</span><span className="stat-icon purple-bg"><Bookmark size={17}/></span></div><div className="stat-value">08</div><div className="stat-foot">Saved for further research</div><div className="mini-avatars"><i>M</i><i>A</i><i>H</i><span>+5</span></div></article><article className="stat-card"><div className="stat-top"><span>Research checklist</span><span className="stat-icon green-bg"><CheckCircle2 size={17}/></span></div><div className="stat-value">12 <small className="muted-small">/ 18 done</small></div><div className="stat-foot">66% of your checklist completed</div><div className="stat-bar green-bar"><span style={{width:"66%"}}/></div></article><article className="stat-card"><div className="stat-top"><span>On-chain signals</span><span className="stat-icon orange-bg"><Flame size={17}/></span></div><div className="stat-value">— <small className="muted-small">Not connected</small></div><div className="stat-foot">Connect a data source to begin</div><div className="signal-status"><span/> Waiting for setup</div></article></section>
        <section className="section-block" id="opportunities"><div className="section-heading"><div><div className="eyebrow">DISCOVER & EVALUATE</div><h2>Opportunity watch</h2><p>Explore a sample of projects to research next.</p></div><a href="#opportunities" className="text-link">View all opportunities <ArrowUpRight size={15}/></a></div>
          <div className="filter-row"><label className="search-box"><Search size={17}/><input placeholder="Search projects, chains, categories..." aria-label="Search projects" value={query} onChange={(event) => setQuery(event.target.value)}/><kbd>⌘ K</kbd></label><button className="filter-button" onClick={() => setWatchlistOnly((value) => !value)} aria-pressed={watchlistOnly}><Filter size={15}/> {watchlistOnly ? "Watchlist only" : "All projects"} <span className="filter-number">{bookmarks.length}</span></button><button className="sort-button">Sort: Relevance <ChevronDown size={14}/></button></div>
          <div className="table-wrap"><table><thead><tr><th>PROJECT</th><th>RAISED</th><th>CATEGORY</th><th>STATUS</th><th>SCORE</th><th/></tr></thead><tbody>{filteredOpportunities.map((o) => <tr key={o.name}><td><div className="project-cell"><div className={`project-logo ${o.color}`}>{o.name[0]}</div><div><b>{o.name}</b><small>{o.chain}</small></div></div></td><td className="raised-cell">{o.raised}</td><td><span className="category-tag">{o.category}</span></td><td><span className={`op-status ${o.status.toLowerCase()}`}><span/>{o.status}</span></td><td><div className="score-cell"><span className="score-track"><i style={{width:`${o.score}%`}}/></span><b>{o.score}</b></div></td><td><button className="row-action" aria-label={`${bookmarks.includes(o.name) ? "Remove" : "Add"} ${o.name} ${bookmarks.includes(o.name) ? "from" : "to"} watchlist`} aria-pressed={bookmarks.includes(o.name)} onClick={() => toggleBookmark(o.name)} title={bookmarks.includes(o.name) ? "Remove bookmark" : "Save to watchlist"}>{bookmarks.includes(o.name) ? <CheckCircle2 size={15}/> : <Bookmark size={15}/>}</button></td></tr>)}</tbody></table></div>
          <div className="table-foot"><span>Showing {filteredOpportunities.length} sample opportunities <span className="demo-inline">· DEMO</span></span><button onClick={() => { setQuery(""); setWatchlistOnly(false); }}>Reset view <ArrowDownRight size={14}/></button></div>
        </section>
        <div className="bottom-grid"><section className="panel" id="activity"><div className="panel-heading"><div><h3>Research activity</h3><p>Your latest workspace updates</p></div><button className="icon-button" aria-label="More activity"><ChevronDown size={16}/></button></div><div className="activity-empty"><span><Activity size={20}/></span><b>Your research timeline starts here</b><p>Saved projects and completed checklist items will appear here once persistent storage is configured.</p></div></section><section className="panel" id="safety"><div className="panel-heading"><div><h3>Safety & signals</h3><p>Review before taking action</p></div><ShieldCheck size={19} className="safe-icon"/></div><div className="safety-row"><span className="safety-check"><CheckCircle2 size={16}/></span><div><b>Research-only mode</b><small>No transactions are executed by this demo.</small></div><span className="safe-badge">ACTIVE</span></div><div className="safety-row"><span className="safety-check"><CheckCircle2 size={16}/></span><div><b>Wallet connection</b><small>Not connected. No wallet permissions requested.</small></div><span className="neutral-badge">OFF</span></div><a href="#safety" className="text-link safety-link">Safety guidelines <CircleHelp size={14}/></a></section></div>
        <footer><span>© 2026 Dropchoice. Built for thoughtful Web3 research.</span><span><span className="footer-dot"/> Research workspace · <b>Never share your seed phrase.</b></span></footer>
      </div>
    </section>
  </main>;
}
