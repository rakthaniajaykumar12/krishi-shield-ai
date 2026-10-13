import { useEffect, useRef, useState } from "react";
import {
  Activity, AlertTriangle, ArrowRight, Bell, CalendarDays,
  CheckCircle2, ChevronDown, CloudSun, Download, FileText,
  FlaskConical, Globe2, History, Home, ImagePlus, Leaf,
  Menu, Microscope, Search, ShieldCheck, Sprout, Thermometer,
  Upload, Users, X, Droplets, Wind, LoaderCircle, FilePlus2
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis
} from "recharts";

const API = "http://localhost:8000";

const riskData = [
  { day: "Oct 1", risk: 22, rain: 14 },
  { day: "Oct 4", risk: 28, rain: 30 },
  { day: "Oct 7", risk: 24, rain: 18 },
  { day: "Oct 10", risk: 43, rain: 60 },
  { day: "Oct 13", risk: 38, rain: 28 },
  { day: "Oct 16", risk: 55, rain: 72 },
  { day: "Oct 19", risk: 47, rain: 35 },
  { day: "Oct 22", risk: 68, rain: 85 },
  { day: "Oct 25", risk: 61, rain: 40 },
  { day: "Oct 28", risk: 74, rain: 68 }
];

const causes = [
  { name: "Nitrogen deficiency", value: 42, color: "#eab308" },
  { name: "Late blight (fungal disease)", value: 28, color: "#f97316" },
  { name: "Water stress", value: 18, color: "#0ea5e9" },
  { name: "Herbicide injury", value: 7, color: "#8b5cf6" },
  { name: "Other possible causes", value: 5, color: "#94a3b8" }
];

const initialReports = [
  { crop: "Paddy (Rice)", problem: "Leaf yellowing", date: "Oct 12", risk: "Medium" },
  { crop: "Tomato", problem: "Leaf spot monitoring", date: "Oct 09", risk: "Low" },
  { crop: "Chilli", problem: "Crop health check", date: "Oct 05", risk: "Low" }
];

function Brand() {
  return (
    <div className="brand">
      <div className="brand-mark"><Sprout size={33} strokeWidth={1.8} /></div>
      <div>
        <div className="brand-name">Krishi<span>Shield</span></div>
        <div className="brand-tagline">Detect the risk. Protect the harvest.</div>
      </div>
    </div>
  );
}

function Header({ onMenu }) {
  return (
    <header className="topbar">
      <button className="mobile-menu icon-button" onClick={onMenu} aria-label="Open navigation">
        <Menu size={22} />
      </button>
      <Brand />
      <div className="topbar-center">
        <span className="live-dot" />
        AI-Powered Crop Crisis Investigation
      </div>
      <div className="topbar-actions">
        <button className="icon-button notification-button" aria-label="Notifications">
          <Bell size={19} /><span className="notification-dot" />
        </button>
        <div className="avatar">RK</div>
        <div className="profile-copy"><b>Farmer account</b><span>India</span></div>
        <ChevronDown size={15} />
      </div>
    </header>
  );
}

const navItems = [
  { name: "Dashboard", icon: Home },
  { name: "New Investigation", icon: FilePlus2 },
  { name: "My Reports", icon: FileText },
  { name: "Crop Calendar", icon: CalendarDays },
  { name: "Weather", icon: CloudSun },
  { name: "Knowledge Centre", icon: Sprout }
];

function Sidebar({ active, setActive, open, close }) {
  return (
    <>
      {open && <button className="sidebar-backdrop" onClick={close} aria-label="Close navigation" />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-label">WORKSPACE</div>
        <nav>
          {navItems.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${active === name ? "nav-active" : ""}`}
              onClick={() => { setActive(name); close(); }}
            >
              <Icon size={18} />
              <span>{name}</span>
              {name === "My Reports" && <span className="nav-count">3</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-label tools-label">FIELD TOOLS</div>
        <button className="nav-item" onClick={() => { setActive("Weather"); close(); }}>
          <Thermometer size={18} /><span>Field conditions</span>
        </button>
        <button className="nav-item" onClick={() => { setActive("Knowledge Centre"); close(); }}>
          <Microscope size={18} /><span>Crop health guide</span>
        </button>
        <div className="sidebar-bottom">
          <div className="sidebar-help-icon"><ShieldCheck size={21} /></div>
          <b>Grow with confidence</b>
          <p>Make informed crop-care decisions with evidence-based guidance.</p>
          <span className="online-status"><span /> System ready</span>
        </div>
        <div className="sidebar-footer"><Globe2 size={15} /> Sustainable farming <span>v1.0</span></div>
      </aside>
    </>
  );
}

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, detail, type = "green" }) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${type}`}><Icon size={21} /></div>
      <div className="metric-info">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
    </article>
  );
}

function RiskChart() {
  return (
    <div className="chart-wrap">
      <div className="chart-legend">
        <span><i className="legend-dot risk-dot" /> Crop risk index</span>
        <span><i className="legend-dot rain-dot" /> Rainfall indicator</span>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={riskData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#15966b" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#15966b" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="rainFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.14} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e8efeb" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "#71877c", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "#71877c", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #dce9e1", fontSize: 12 }} />
            <Area type="monotone" dataKey="rain" name="Rainfall indicator" stroke="#60a5fa" fill="url(#rainFill)" strokeWidth={2} />
            <Area type="monotone" dataKey="risk" name="Crop risk index" stroke="#15966b" fill="url(#riskFill)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="timeline-note">
        <div className="timeline-note-icon"><AlertTriangle size={17} /></div>
        <div><b>Monitor changing field conditions</b><p>This chart uses illustrative sample data. Connect verified field and weather data for real risk tracking.</p></div>
      </div>
    </div>
  );
}

function InvestigationPanel({ result, loading, onAnalyze }) {
  return (
    <section className="panel investigation-panel">
      <SectionHeading
        eyebrow="INTELLIGENCE ENGINE"
        title="AI investigation"
        description="Review potential causes and supporting evidence."
        action={<span className={`status-pill ${loading ? "status-working" : "status-ready"}`}><span />{loading ? "Analyzing" : "Ready"}</span>}
      />
      <div className="investigation-progress">
        <div className={`progress-step ${result ? "step-done" : ""}`}><span>{result ? "✓" : "1"}</span><small>Collect data</small></div>
        <i />
        <div className={`progress-step ${result ? "step-done" : ""}`}><span>{result ? "✓" : "2"}</span><small>Analyze</small></div>
        <i />
        <div className={`progress-step ${result ? "step-done" : ""}`}><span>{result ? "✓" : "3"}</span><small>Review</small></div>
      </div>
      <div className="evidence-list">
        <div className="evidence-row"><div className="evidence-icon weather-icon"><CloudSun size={17} /></div><div><b>Weather conditions</b><small>Awaiting location-specific data</small></div><span className="evidence-tag">Not connected</span></div>
        <div className="evidence-row"><div className="evidence-icon soil-icon"><Droplets size={17} /></div><div><b>Soil information</b><small>Soil pH and nutrients</small></div><span className="evidence-tag">Not provided</span></div>
        <div className="evidence-row"><div className="evidence-icon history-icon"><History size={17} /></div><div><b>Crop history</b><small>Previous crops and treatments</small></div><span className="evidence-tag">Optional</span></div>
        <div className="evidence-row"><div className="evidence-icon image-icon"><ImagePlus size={17} /></div><div><b>Crop image</b><small>Visual symptoms and patterns</small></div><span className="evidence-tag">{result ? "Received" : "Optional"}</span></div>
      </div>
      {result && (
        <div className="api-result">
          <CheckCircle2 size={17} />
          <div><b>Backend response received</b><p>{result.message || "The API responded successfully."}</p><small>This confirms the backend connection, not a completed crop diagnosis.</small></div>
        </div>
      )}
      <button className="primary-button full-button" onClick={onAnalyze} disabled={loading}>
        {loading ? <LoaderCircle className="spin" size={17} /> : <Activity size={17} />}
        {loading ? "Connecting to backend..." : "Start investigation"}
        {!loading && <ArrowRight size={17} />}
      </button>
      <p className="disclaimer">The current backend is a starter API. Evidence collection and AI diagnosis will be implemented in later stages.</p>
    </section>
  );
}

function CausePanel() {
  return (
    <section className="panel causes-panel">
      <SectionHeading eyebrow="EVIDENCE REVIEW" title="Possible causes" description="Example categories to investigate; not a diagnosis." />
      <div className="cause-list">
        {causes.map((cause) => (
          <div className="cause-row" key={cause.name}>
            <div className="cause-title"><span className="cause-bullet" style={{ background: cause.color }} />{cause.name}<b>{cause.value}%</b></div>
            <div className="cause-track"><div style={{ width: `${cause.value}%`, background: cause.color }} /></div>
          </div>
        ))}
      </div>
      <div className="evidence-box">
        <h4><CheckCircle2 size={16} /> Evidence to collect</h4>
        <ul>
          <li>Photographs of affected and healthy leaves.</li>
          <li>Recent rainfall and irrigation history.</li>
          <li>Fertilizer and pesticide application records.</li>
        </ul>
      </div>
      <div className="missing-box"><AlertTriangle size={17} /><div><b>More information needed</b><p>Symptoms, field conditions and laboratory tests may be required to distinguish causes.</p></div></div>
    </section>
  );
}

function ActionPanel() {
  const actions = [
    { icon: Search, title: "Inspect affected plants", text: "Compare symptoms across several plants and field areas." },
    { icon: FlaskConical, title: "Check soil nutrients", text: "Consider a soil test before changing fertilizer application." },
    { icon: Droplets, title: "Review irrigation", text: "Check soil moisture, drainage and recent water conditions." },
    { icon: ShieldCheck, title: "Seek local advice", text: "Consult an agricultural extension officer if symptoms spread." }
  ];
  return (
    <section className="panel actions-panel">
      <SectionHeading eyebrow="FIELD GUIDANCE" title="Recommended next steps" description="Practical checks before choosing a treatment." />
      <div className="action-list">
        {actions.map(({ icon: Icon, title, text }, index) => (
          <div className="action-item" key={title}>
            <div className="action-number">{String(index + 1).padStart(2, "0")}</div>
            <div className="action-symbol"><Icon size={18} /></div>
            <div className="action-copy"><b>{title}</b><p>{text}</p></div>
            <CheckCircle2 className="action-check" size={17} />
          </div>
        ))}
      </div>
      <div className="safety-note"><ShieldCheck size={18} /><p><b>Safety first.</b> Do not apply pesticides or fertilizers based solely on an unverified online result. Follow local guidance and product labels.</p></div>
    </section>
  );
}

function ReportPanel({ onReport, image, setImage }) {
  const inputRef = useRef(null);
  const [crop, setCrop] = useState("Paddy (Rice)");
  const [stage, setStage] = useState("Tillering");
  const [symptoms, setSymptoms] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  function chooseImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Please select an image smaller than 8 MB.");
      return;
    }
    setError("");
    setImage({ file, url: URL.createObjectURL(file) });
  }

  function submit(event) {
    event.preventDefault();
    setError("");
    if (!symptoms.trim()) {
      setError("Please describe the crop symptoms before continuing.");
      return;
    }
    onReport({ crop, stage, symptoms, location, image: image?.file || null });
  }

  return (
    <section className="panel report-panel">
      <SectionHeading eyebrow="FIELD ASSESSMENT" title="Report a crop problem" description="Describe what you see in your field." />
      <form onSubmit={submit}>
        <button type="button" className={`upload-zone ${image ? "has-image" : ""}`} onClick={() => inputRef.current?.click()}>
          {image ? <img className="crop-preview" src={image.url} alt="Selected crop" /> : <div className="upload-illustration"><Upload size={24} /></div>}
          <span className="upload-copy"><b>{image ? image.file.name : "Upload crop photo"}</b><small>{image ? "Click to change image" : "JPG, PNG or WEBP · Up to 8 MB"}</small></span>
          <span className="choose-file">{image ? "Change" : "Browse"}</span>
        </button>
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={chooseImage} />
        <div className="form-grid">
          <label>Crop type
            <select value={crop} onChange={(e) => setCrop(e.target.value)}>
              <option>Paddy (Rice)</option><option>Wheat</option><option>Maize</option>
              <option>Tomato</option><option>Chilli</option><option>Cotton</option>
              <option>Soybean</option><option>Groundnut</option><option>Other</option>
            </select>
          </label>
          <label>Growth stage
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              <option>Germination</option><option>Seedling</option><option>Tillering</option>
              <option>Vegetative</option><option>Flowering</option><option>Fruiting</option><option>Maturity</option>
            </select>
          </label>
        </div>
        <label>Farm location <span className="optional-label">Optional</span>
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Village, district, state" />
        </label>
        <label>Describe the symptoms
          <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Example: Older leaves are turning yellow, and some plants appear weak..." rows={4} />
        </label>
        {error && <p className="form-error"><AlertTriangle size={15} />{error}</p>}
        <button className="primary-button full-button" type="submit"><Microscope size={17} /> Submit crop report <ArrowRight size={17} /></button>
        <p className="form-privacy"><ShieldCheck size={14} /> Your report stays in this session until connected to persistent storage.</p>
      </form>
    </section>
  );
}

function ReportsPanel({ reports, setActive }) {
  return (
    <section className="panel reports-panel">
      <SectionHeading
        eyebrow="FIELD RECORDS"
        title="Recent crop reports"
        description="Example records and reports submitted during this session."
        action={<button className="text-button" onClick={() => setActive("New Investigation")}>New report <ArrowRight size={15} /></button>}
      />
      <div className="report-table">
        <div className="report-table-head"><span>Crop / issue</span><span>Date</span><span>Status</span></div>
        {reports.map((report, index) => (
          <div className="report-table-row" key={`${report.crop}-${index}`}>
            <div className="report-crop-icon"><Leaf size={17} /><div><b>{report.crop}</b><small>{report.problem}</small></div></div>
            <span className="report-date">{report.date}</span>
            <span className={`risk-badge risk-${report.risk.toLowerCase()}`}>{report.risk}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Dashboard({ setActive, reports }) {
  return (
    <>
      <div className="welcome-banner">
        <div className="welcome-copy">
          <div className="welcome-kicker"><Sprout size={15} /> YOUR FARM, YOUR FUTURE</div>
          <h1>Good day, Farmer <span>🌱</span></h1>
          <p>Every observation is a step toward a healthier harvest.</p>
          <button className="welcome-button" onClick={() => setActive("New Investigation")}>Start a crop investigation <ArrowRight size={16} /></button>
        </div>
        <div className="welcome-art"><div className="sun" /><div className="hill hill-back" /><div className="hill hill-front" /><div className="plant plant-one"><Sprout size={70} /></div><div className="plant plant-two"><Sprout size={47} /></div><div className="art-caption"><ShieldCheck size={16} /> Better decisions. Healthier crops.</div></div>
      </div>
      <div className="metrics-grid">
        <MetricCard icon={Sprout} label="Tracked crops" value="03" detail="Across your farm" />
        <MetricCard icon={Activity} label="Crop health" value="Good" detail="Sample dashboard status" type="blue" />
        <MetricCard icon={ShieldCheck} label="Reports created" value={String(reports.length).padStart(2, "0")} detail="In this session" type="purple" />
        <MetricCard icon={AlertTriangle} label="Field alerts" value="01" detail="Example alert · review" type="amber" />
      </div>
      <div className="dashboard-grid">
        <section className="panel timeline-panel">
          <SectionHeading eyebrow="FIELD MONITORING" title="Crop risk timeline" description="Illustrative crop-risk and rainfall indicators." action={<span className="period-chip"><CalendarDays size={14} /> Sample period</span>} />
          <RiskChart />
        </section>
        <section className="panel weather-panel">
          <SectionHeading eyebrow="FIELD CONDITIONS" title="Weather overview" description="Weather integration is not connected yet." />
          <div className="weather-main"><div><CloudSun size={37} /><span>Awaiting live data</span></div><div className="weather-temp">--<sup>°C</sup></div></div>
          <div className="weather-details">
            <div><Droplets size={17} /><span>Humidity</span><b>--</b></div>
            <div><Wind size={17} /><span>Wind</span><b>--</b></div>
            <div><CloudSun size={17} /><span>Rainfall</span><b>--</b></div>
          </div>
          <div className="weather-footer"><span className="weather-status" /> Connect a weather provider for live conditions.</div>
        </section>
      </div>
      <ReportsPanel reports={reports} setActive={setActive} />
      <div className="benefits-strip">
        <div><Sprout size={21} /><span><b>Healthier crops</b><small>Spot symptoms early</small></span></div>
        <div><Droplets size={21} /><span><b>Resource awareness</b><small>Use inputs thoughtfully</small></span></div>
        <div><Users size={21} /><span><b>Farmer focused</b><small>Practical field guidance</small></span></div>
        <div><Globe2 size={21} /><span><b>Sustainable future</b><small>Protect our planet</small></span></div>
      </div>
    </>
  );
}

function InvestigationPage({ onReport, image, setImage, result, loading, onAnalyze }) {
  return (
    <>
      <SectionHeading eyebrow="NEW FIELD CASE" title="Crop investigation" description="Record the symptoms and prepare the evidence for review." />
      <div className="investigation-page-grid">
        <ReportPanel onReport={onReport} image={image} setImage={setImage} />
        <InvestigationPanel result={result} loading={loading} onAnalyze={onAnalyze} />
      </div>
      <CausePanel />
      <ActionPanel />
    </>
  );
}

function SimplePage({ active, setActive, reports }) {
  const details = {
    "My Reports": { icon: FileText, title: "My crop reports", description: "Review the crop reports saved during this session." },
    "Crop Calendar": { icon: CalendarDays, title: "Crop calendar", description: "Plan observations and important crop-care activities." },
    Weather: { icon: CloudSun, title: "Weather centre", description: "Live weather requires a configured weather provider." },
    "Knowledge Centre": { icon: Microscope, title: "Crop health knowledge centre", description: "Use verified local agricultural guidance to investigate symptoms." }
  };
  const info = details[active] || details["My Reports"];
  const Icon = info.icon;
  return (
    <section className="panel simple-page">
      <div className="simple-icon"><Icon size={29} /></div>
      <h2>{info.title}</h2>
      <p>{info.description}</p>
      {active === "My Reports" && <div className="simple-report-list">{reports.map((r, i) => <div key={i}><Leaf size={17} /><span><b>{r.crop}</b><small>{r.problem} · {r.date}</small></span><span className={`risk-badge risk-${r.risk.toLowerCase()}`}>{r.risk}</span></div>)}</div>}
      <button className="primary-button" onClick={() => setActive("New Investigation")}><FilePlus2 size={17} /> Start a new investigation</button>
    </section>
  );
}

function App() {
  const [active, setActive] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [reports, setReports] = useState(initialReports);
  const [image, setImage] = useState(null);
  const [caseData, setCaseData] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("checking");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetch(`${API}/health`)
      .then((response) => {
        if (!response.ok) throw new Error("Backend unavailable");
        return response.json();
      })
      .then(() => setApiStatus("online"))
      .catch(() => setApiStatus("offline"));
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  function handleReport(data) {
    setCaseData(data);
    setResult(null);
    setReports((previous) => [
      { crop: data.crop, problem: data.symptoms, date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short" }), risk: "Review" },
      ...previous
    ]);
    setNotice("Crop report added to this session.");
    setActive("New Investigation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function analyze() {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch(`${API}/api/v1`);
      if (!response.ok) throw new Error("Backend returned an error");
      const data = await response.json();
      setResult(data);
      setApiStatus("online");
      setNotice("Backend connection verified.");
    } catch {
      setApiStatus("offline");
      setNotice("Cannot reach the backend. Check that Docker is still running on port 8000.");
    } finally {
      setLoading(false);
    }
  }

  function downloadReport() {
    const text = [
      "KRISHI-SHIELD AI — CROP REPORT",
      "================================",
      `Date: ${new Date().toLocaleString()}`,
      `Crop: ${caseData?.crop || "Not specified"}`,
      `Growth stage: ${caseData?.stage || "Not specified"}`,
      `Location: ${caseData?.location || "Not provided"}`,
      `Symptoms: ${caseData?.symptoms || "Not provided"}`,
      `Image attached: ${caseData?.image ? caseData.image.name : "No"}`,
      "",
      "IMPORTANT: This is a farmer-submitted observation, not an AI diagnosis.",
      "Seek local agricultural advice before applying treatments."
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "krishi-shield-crop-report.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="app-shell">
      <Header onMenu={() => setMenuOpen(true)} />
      <div className="app-body">
        <Sidebar active={active} setActive={setActive} open={menuOpen} close={() => setMenuOpen(false)} />
        <main className="main-content">
          <div className="page-topline">
            <div className="breadcrumb">Workspace <span>/</span> <b>{active}</b></div>
            <div className="connection-status"><span className={`connection-dot ${apiStatus}`} /> API {apiStatus === "online" ? "Connected" : apiStatus === "offline" ? "Offline" : "Checking"} <span className="environment-label">DEMO MODE</span></div>
          </div>
          {active === "Dashboard" ? (
            <Dashboard setActive={setActive} reports={reports} />
          ) : active === "New Investigation" ? (
            <InvestigationPage onReport={handleReport} image={image} setImage={setImage} result={result} loading={loading} onAnalyze={analyze} />
          ) : (
            <SimplePage active={active} setActive={setActive} reports={reports} />
          )}
          <footer className="app-footer"><div><Sprout size={17} /> <b>KrishiShield AI</b> <span>Crop care, powered by evidence.</span></div><span>Prototype · Verify recommendations locally</span></footer>
        </main>
      </div>
      {notice && <div className="toast"><CheckCircle2 size={18} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><X size={15} /></button></div>}
      {active === "New Investigation" && caseData && <button className="floating-report-button" onClick={downloadReport}><Download size={17} /> Export report</button>}
    </div>
  );
}

export default App;
