import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  Compass,
  Database,
  LayoutDashboard,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Wallet,
  X,
} from "lucide-react";
import { filterOpportunities, opportunities, type Evaluation, type Opportunity } from "./domain";

type Section = "Overview" | "Opportunities" | "Action Preview" | "Events" | "My Activity" | "Safety & Alerts";
const sections: { label: Section; icon: typeof Compass }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Opportunities", icon: Search },
  { label: "Action Preview", icon: SlidersHorizontal },
  { label: "Events", icon: CalendarDays },
  { label: "My Activity", icon: Activity },
  { label: "Safety & Alerts", icon: ShieldCheck },
];
const evaluations: Array<Evaluation | "All"> = ["All", "Worth researching", "Proceed with caution", "Avoid"];
const tasksSeed = ["Inspect an official project source", "Record unknown costs and requirements", "Check contract and domain provenance"];

export default function App() {
  const [section, setSection] = useState<Section>("Overview");
  const [query, setQuery] = useState("");
  const [evaluation, setEvaluation] = useState<Evaluation | "All">("All");
  const [tasks, setTasks] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [toast, setToast] = useState("");
  const filtered = useMemo(() => filterOpportunities(opportunities, query, evaluation), [query, evaluation]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }
  function navigate(next: Section) {
    setSection(next);
    setMobileOpen(false);
  }
  function toggleSaved(id: string) {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    notify(saved.includes(id) ? "Removed from saved research" : "Research saved locally");
  }

  return (
    <div className="shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <button className="brand" onClick={() => navigate("Overview")} aria-label="Open Dropchoice overview">
          <img className="brand-logo" src="/dropchoice-logo.jpg" alt="Dropchoice logo" />
          <span><strong>drop<span>choice</span></strong><small>WEB3 INTELLIGENCE</small></span>
        </button>
        <div className="nav-label">WORKSPACE</div>
        <nav aria-label="Main navigation">
          {sections.map(({ label, icon: Icon }) => <button key={label} className={section === label ? "nav-item active" : "nav-item"} onClick={() => navigate(label)}><Icon size={17} />{label}</button>)}
        </nav>
        <div className="sidebar-foot"><span className="status-dot" /> INDEXERS ONLINE <span className="version">v1.0 demo</span></div>
      </aside>
      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>{mobileOpen ? <X size={18} /> : <Menu size={18} />}</button>
          <div className="crumb"><span className="eyebrow">XIRRAEN / PROJECTS</span><b>Dropchoice / {section}</b></div>
          <div className="top-actions">
            <label className="search-box top-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, chains..." aria-label="Search projects and chains" /></label>
            <button className="icon-button" onClick={() => notify("No new alerts in this demo")} aria-label="Notifications"><Sparkles size={16} /></button>
            <button className={walletConnected ? "wallet-button connected" : "wallet-button"} onClick={() => { setWalletConnected(!walletConnected); notify(walletConnected ? "Demo wallet disconnected" : "Demo wallet connected — read-only mode"); }}><Wallet size={15} />{walletConnected ? "0x71C...39a" : "Connect wallet"}</button>
          </div>
        </header>
        <div className="content">
          <div className="safety-banner"><ShieldCheck size={18} /><div><strong>Research prototype — demo data only</strong><p>No signature is requested and no transaction can be executed. Verify official sources yourself before acting.</p></div></div>
          {section === "Overview" && <Overview navigate={navigate} filtered={filtered.slice(0, 3)} saved={saved} toggleSaved={toggleSaved} tasks={tasks} />}
          {section === "Opportunities" && <><PageHeading eyebrow="SIGNALS / RESEARCH RECORDS" title="Find the signal before the noise." text="A transparent queue of opportunities with evidence, uncertainty, and effort visible." /><div className="filters"><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records..." aria-label="Search opportunities" /></label><label className="select-wrap"><span className="sr-only">Filter by evaluation</span><select value={evaluation} onChange={(event) => setEvaluation(event.target.value as Evaluation | "All")}>{evaluations.map((item) => <option key={item}>{item}</option>)}</select></label></div><OpportunityList items={filtered} saved={saved} toggleSaved={toggleSaved} /></>}
          {section === "Action Preview" && <><PageHeading eyebrow="ROUTE TRADE-OFFS" title="Preview before you participate." text="Compare assumptions, effort, and unknowns. This surface is deliberately read-only." /><div className="preview-grid"><Preview title="Route A · Research first" effort="Medium" cost="Unknown" detail="Review official docs, eligibility rules, source provenance, and contract context before considering participation." /><Preview title="Route B · Participate later" effort="High" cost="Network fees may apply" detail="Defer participation until evidence is complete and the safety review has no open blockers." /></div><Notice text="This is not a transaction builder, quote engine, wallet connector, or execution interface. No route can be submitted." /></>}
          {section === "Events" && <><PageHeading eyebrow="CALENDAR CONTEXT" title="Events with provenance." text="Dates are useful only when they have a clear source, freshness, and confidence level." /><div className="empty-state"><CalendarDays size={24} /><strong>No verified events yet</strong><p>There is no live event feed in this prototype. Do not infer deadlines or eligibility from sample records.</p></div></>}
          {section === "My Activity" && <><PageHeading eyebrow="PERSONAL RESEARCH" title="Turn research into a plan." text="Checklist state is kept in this page session and is not persisted." /><div className="task-list">{tasksSeed.map((task) => <label className="task-row" key={task}><input type="checkbox" checked={tasks.includes(task)} onChange={() => setTasks((current) => current.includes(task) ? current.filter((item) => item !== task) : [...current, task])} /><span><strong>{task}</strong><small>Research checklist · local state only</small></span>{tasks.includes(task) && <CheckCircle2 size={18} />}</label>)}</div></>}
          {section === "Safety & Alerts" && <><PageHeading eyebrow="RISK CONTEXT" title="Safety is part of the product." text="Clear boundaries are visible throughout Dropchoice, not hidden in a footnote." /><div className="preview-grid"><Safety title="No wallet access" text="The prototype does not connect to wallets or request signatures." /><Safety title="No live web scan" text="No URLs are fetched and scan behavior is not connected to the network." /><Safety title="Evidence is incomplete" text="Sample records are not verified recommendations. Inspect official sources independently." /></div></>}
        </div>
      </main>
      <div className={toast ? "toast show" : "toast"} role="status">{toast}</div>
    </div>
  );
}

function Overview({ navigate, filtered, saved, toggleSaved, tasks }: { navigate: (section: Section) => void; filtered: Opportunity[]; saved: string[]; toggleSaved: (id: string) => void; tasks: string[] }) {
  return <><div className="hero"><div><span className="eyebrow accent">WEB3 INTELLIGENCE WORKSPACE</span><h1>Research with signal.<br /><span>Participate with clarity.</span></h1><p>One calm workspace for finding opportunities, understanding on-chain context, and choosing the next responsible step.</p></div><div className="date-pill">Friday, 10 October 2026</div></div><div className="stats-grid"><Stat icon={Database} label="Active opportunities" value="248" note="+18 this week" /><Stat icon={Compass} label="Networks indexed" value="36" note="All systems operational" /><Stat icon={Wallet} label="Wallets monitored" value="1,284" note="Read-only signals" /><Stat icon={CheckCircle2} label="Research confidence" value="92%" note="Based on source quality" /></div><div className="grid"><section className="section-block"><div className="section-title"><div><span className="eyebrow">RESEARCH QUEUE</span><h2>Opportunity signals</h2></div><button className="text-button" onClick={() => navigate("Opportunities")}>View all <ArrowUpRight size={15} /></button></div><OpportunityList items={filtered} saved={saved} toggleSaved={toggleSaved} /></section><section className="section-block side-panel"><div className="section-title"><div><span className="eyebrow">NETWORK WATCHLIST</span><h2>Data layer</h2></div><button className="text-button" onClick={() => navigate("Events")}>Manage</button></div><Watchlist /><div className="activity-mini"><span className="eyebrow">LATEST ACTIVITY</span><p><strong>New source added</strong> for Monad campaign · 12m</p><p><strong>Wallet scan completed</strong> across 8 networks · 48m</p><p><strong>Campaign status changed</strong> · 2h</p></div></section></div><section className="route-card"><div><span className="eyebrow">READ-ONLY COMPARISON</span><h2>Preview trade-offs before taking action.</h2><p>Compare effort, unknowns, and safety constraints before a decision enters your own workflow.</p></div><button className="primary-button" onClick={() => navigate("Action Preview")}>Open Action Preview <ArrowUpRight size={16} /></button></section><div className="section-block compact-note"><CircleHelp size={17} /><span><strong>{tasks.length} of {tasksSeed.length} research tasks complete.</strong> Keep evidence and uncertainty visible.</span></div></>;
}
function PageHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) { return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>; }
function Stat({ icon: Icon, label, value, note }: { icon: typeof Database; label: string; value: string; note: string }) { return <article className="stat-card"><Icon size={17} /><span>{label}</span><strong>{value}</strong><small>{note}</small></article>; }
function OpportunityList({ items, saved, toggleSaved }: { items: Opportunity[]; saved: string[]; toggleSaved: (id: string) => void }) { return items.length ? <div className="opportunity-list">{items.map((item) => <article className="opportunity-card" key={item.id}><div className="opportunity-icon"><Compass size={19} /></div><div className="opportunity-body"><div className="opportunity-meta">{item.ecosystem} · {item.category}</div><h3>{item.name}</h3><p>{item.summary}</p><div className="evidence-line"><ShieldCheck size={13} />{item.evidence[0]}</div>{item.risk && <div className="risk-line"><AlertTriangle size={14} />{item.risk}</div>}</div><div className="opportunity-side"><span className={`evaluation ${item.evaluation === "Avoid" ? "avoid" : item.evaluation === "Proceed with caution" ? "caution" : "research"}`}>{item.evaluation}</span><span className="confidence">{item.confidence}<small>demo confidence</small></span><span className="effort">{item.effort} effort</span><button className={saved.includes(item.id) ? "star saved" : "star"} onClick={() => toggleSaved(item.id)} aria-label={`Save ${item.name}`}><Star size={16} fill={saved.includes(item.id) ? "currentColor" : "none"} /></button></div></article>)}</div> : <div className="empty-state"><CircleHelp size={22} /><strong>No matching records</strong><p>Try a different query or evaluation filter.</p></div>; }
function Watchlist() { return <div className="watchlist">{[["Ξ", "Ethereum", "42.8M tx", "+4.2%"], ["◇", "Base", "18.4M tx", "+8.7%"], ["A", "Arbitrum", "11.2M tx", "-1.8%"], ["S", "Solana", "65.1M tx", "+12.1%"]].map(([symbol, name, value, change]) => <div className="watch-item" key={name}><span className="watch-icon">{symbol}</span><span className="watch-copy"><strong>{name}</strong><small>{value}</small></span><em className={change.startsWith("-") ? "down" : ""}>{change}</em></div>)}</div>; }
function Preview({ title, effort, cost, detail }: { title: string; effort: string; cost: string; detail: string }) { return <article className="preview-card"><span className="eyebrow">HYPOTHETICAL ROUTE</span><h2>{title}</h2><p>{detail}</p><div className="preview-metrics"><div><small>Estimated effort</small><strong>{effort}</strong></div><div><small>Estimated cost</small><strong>{cost}</strong></div></div><span className="readonly"><ShieldCheck size={14} /> Read-only · no execution</span></article>; }
function Safety({ title, text }: { title: string; text: string }) { return <article className="preview-card"><ShieldCheck size={20} /><h2>{title}</h2><p>{text}</p></article>; }
function Notice({ text }: { text: string }) { return <div className="notice"><CircleHelp size={18} /><p>{text}</p></div>; }
