import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, Link, } from 'react-router-dom'
import { Maximize2, ExternalLink, X, Layout, Box, Camera, Globe, Activity, Terminal, Ghost, Sparkles, Code, Play } from 'lucide-react'
import './App.css'

const ENCLAVE_NODES = [
  { id: 'buzz', title: 'PARADA.BUZZ', url: 'https://parada.buzz/', icon: <Activity size={18} />, color: '#00ff00', desc: 'The Root Signal' },
  { id: 'pics', title: 'PARADA.PICS', url: 'https://parada.pics/', icon: <Camera size={18} />, color: '#00ff00', desc: 'The Archive' },
  { id: 'quest', title: 'PARADA.QUEST', url: 'https://parada.quest/', icon: <Box size={18} />, color: '#ff00ff', desc: 'The Emulation' },
  { id: 'lat', title: 'PARADA.LAT', url: 'https://parada.lat/', icon: <Globe size={18} />, color: '#e91e63', desc: 'The Mural' },
  { id: 'one', title: 'PARADA.ONE', url: 'https://parada.one/', icon: <Layout size={18} />, color: '#00ff00', desc: 'The Heartbeat' },
  { id: 'info', title: 'PARADA.INFO', url: 'https://parada.info/', icon: <Terminal size={18} />, color: '#00ff00', desc: 'The Kernel' },
  { id: 'lol', title: 'PARADA.LOL', url: 'https://parada.lol/', icon: <Ghost size={18} />, color: '#ff00ff', desc: 'The Glitch' }
]

function PixelsPortal() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredId] = useState<string | null>(null)
  const node = ENCLAVE_NODES.find(n => n.id === activeNode)

  return (
    <div className="portal-container">
      <header className="portal-header">
        <Link to="/" className="back-link">← EXIT_TEMPLATE</Link>
        <div className="portal-title">
          <h1 className="glitch-text" data-text="PIXELS PORTAL">PIXELS<span> PORTAL</span></h1>
          <p>TEMPLATE_01 // ARCHITECTURAL_SYNC_V2</p>
        </div>
        <div className="portal-meta">STATUS: LIVE_PREVIEW</div>
      </header>

      <main className="node-grid">
        {ENCLAVE_NODES.map((n) => (
          <motion.div key={n.id} className={`node-card ${hoveredNode === n.id ? 'is-hovered' : ''}`} onMouseEnter={() => setHoveredId(n.id)} onMouseLeave={() => setHoveredId(null)}>
            <div className="card-header" style={{ borderBottomColor: n.color }}>
               <div className="card-label">{n.icon} <span>{n.title}</span></div>
               <div className="card-actions">
                  <button onClick={() => setActiveNode(n.id)}><Maximize2 size={14} /></button>
                  <a href={n.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={14} /></a>
               </div>
            </div>
            <div className="preview-container">
               <iframe src={n.url} title={n.title} loading="lazy" style={{ pointerEvents: hoveredNode === n.id ? 'auto' : 'none' }} />
               <div className={`iframe-overlay ${hoveredNode === n.id ? 'hidden' : ''}`}></div>
            </div>
            <div className="card-footer"><p>{n.desc} // SCROLL_ACTIVE</p></div>
          </motion.div>
        ))}
      </main>

      <AnimatePresence>
        {activeNode && node && (
          <motion.div className="fullscreen-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="modal-bar">
               <div className="modal-title">{node.icon} <span>{node.title} // LIVE</span></div>
               <button className="close-btn" onClick={() => setActiveNode(null)}><X size={24} /></button>
            </div>
            <div className="modal-content"><iframe src={node.url} title={node.title} /></div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="crt-overlay"></div>
    </div>
  )
}

function Home() {
  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="brand">2PP<span>.CLICK</span></div>
        <div className="nav-links">
           <Link to="/pp" className="nav-btn-highlight">VIEW_TEMPLATES</Link>
        </div>
      </nav>

      <main className="hero-section">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="hero-content">
          <div className="hero-tag">THE_LINKTREE_ALTERNATIVE</div>
          <h1>BEYOND THE LINK. <span>OWN THE SIGNAL.</span></h1>
          <p>The ultimate link shortener and portfolio staging ground for modern coders, videographers, and photographers.</p>
          <div className="hero-actions">
             <Link to="/pp" className="primary-btn">LAUNCH_PIXELS_PORTAL_V1</Link>
             <button className="secondary-btn">JOIN_BETA</button>
          </div>
        </motion.div>
      </main>

      <section className="collab-section">
         <div className="collab-card">
            <div className="collab-header">
               <Sparkles color="var(--pixels-pink)" /> <span>FUTURE_RELEASE</span>
            </div>
            <h2>2PP.CLICK + MYPP</h2>
            <p>We are building the future of sovereign creative identity. <strong>mypp</strong> is the automated portfolio creator designed for high-density visual storytelling. Seamless integration with 2pp.click routing.</p>
            <div className="spec-grid">
               <div className="spec"><Code size={16} /> FOR_CODERS</div>
               <div className="spec"><Play size={16} /> FOR_VIDEOGRAPHERS</div>
               <div className="spec"><Camera size={16} /> FOR_PHOTOGRAPHERS</div>
            </div>
         </div>
      </section>

      <section className="templates-section">
         <div className="section-label">AVAILABLE_TEMPLATES</div>
         <div className="template-grid">
            <Link to="/pp" className="template-preview">
               <div className="t-preview-box">
                  <div className="t-status">V1_ACTIVE</div>
               </div>
               <h3>PIXELS_PORTAL_01</h3>
               <p>High-contrast, architectural multi-site dashboard. Optimized for Enclave deployment.</p>
            </Link>
            <div className="template-preview locked">
               <div className="t-preview-box">
                  <div className="t-status">COMING_SOON</div>
               </div>
               <h3>BARRAGAN_MINIMAL</h3>
               <p>Spiritual block-based layout for liberated libraries.</p>
            </div>
         </div>
      </section>

      <footer className="landing-footer">
        <p>© 2026 PIXELS AGENCY // ARCHITECT: NICO_B</p>
        <p>RECLAIM THE COMMONS. OWN THE KERNEL.</p>
      </footer>
      <div className="crt-overlay"></div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pp" element={<PixelsPortal />} />
      </Routes>
    </Router>
  )
}

export default App
