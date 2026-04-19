import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { 
  Maximize2, ExternalLink, X, Camera, 
  Globe, Activity, Ghost, Sparkles, 
  Code, Play, MousePointer2, ShieldCheck, Zap
} from 'lucide-react'
import './App.css'

const DEMO_NODES = [
  { id: '1', title: 'CREATIVE_ARCHIVE', url: 'https://example.com', icon: <Camera size={18} />, color: '#00ff00', desc: 'Visual storytelling node.' },
  { id: '2', title: 'SYSTEM_DASHBOARD', url: 'https://example.com', icon: <Activity size={18} />, color: '#00ff00', desc: 'Real-time telemetry.' },
  { id: '3', title: 'GLITCH_LAB', url: 'https://example.com', icon: <Ghost size={18} />, color: '#ff00ff', desc: 'Experimental noise.' },
  { id: '4', title: 'KNOWLEDGE_BASE', url: 'https://example.com', icon: <Globe size={18} />, color: '#e91e63', desc: 'Liberated libraries.' }
]

function PixelsPortalTemplate({ isDemo = true }) {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredId] = useState<string | null>(null)
  const nodes = isDemo ? DEMO_NODES : [];

  return (
    <div className="portal-template-container">
      <header className="portal-header">
        <Link to="/" className="exit-btn">BACK_TO_PLATFORM</Link>
        <div className="portal-title">
          <h1>PIXELS<span>PORTAL</span></h1>
          <p>{isDemo ? 'PREVIEW_MODE' : 'LIVE_INSTANCE'} // V1.0</p>
        </div>
      </header>

      <main className="node-grid">
        {nodes.map((n) => (
          <motion.div key={n.id} className={`node-card ${hoveredNode === n.id ? 'is-hovered' : ''}`} onMouseEnter={() => setHoveredId(n.id)} onMouseLeave={() => setHoveredId(null)}>
            <div className="card-header" style={{ borderBottomColor: n.color }}>
               <div className="card-label">{n.icon} <span>{n.title}</span></div>
               <div className="card-actions">
                  <button onClick={() => setActiveNode(n.id)}><Maximize2 size={14} /></button>
                  <a href={n.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={14} /></a>
               </div>
            </div>
            <div className="preview-container">
               <iframe src={n.url} title={n.title} style={{ pointerEvents: hoveredNode === n.id ? 'auto' : 'none' }} />
               <div className={`iframe-overlay ${hoveredNode === n.id ? 'hidden' : ''}`}></div>
            </div>
          </motion.div>
        ))}
      </main>

      <AnimatePresence>
        {activeNode && (
          <motion.div className="fullscreen-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <button className="close-btn" onClick={() => setActiveNode(null)}><X size={32} /></button>
             <iframe src={nodes.find(n => n.id === activeNode)?.url} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="crt-overlay"></div>
    </div>
  )
}

function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="platform-nav">
        <div className="logo">2PP<span>.CLICK</span></div>
        <div className="nav-links">
           <Link to="/demo">EXPLORE_TEMPLATES</Link>
           <button className="btn-small">LOGIN</button>
        </div>
      </nav>

      <header className="hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="badge">THE_LINK_SHORTENER_EVOLUTION</div>
          <h1>BEYOND THE LINK.</h1>
          <h1 className="gradient-text">OWN THE SIGNAL.</h1>
          <p>The sovereign alternative to Linktree. Built for the next generation of coders, photographers, and architects.</p>
          <div className="hero-cta">
             <button className="btn-primary">GET_YOUR_PP_LINK</button>
             <Link to="/demo" className="btn-secondary">VIEW_DEMO</Link>
          </div>
        </motion.div>
      </header>

      <section className="features">
         <div className="feature-card">
            <Zap className="icon" />
            <h3>INSTANT_DEPLOY</h3>
            <p>One command deployment of high-fidelity portfolio templates.</p>
         </div>
         <div className="feature-card">
            <ShieldCheck className="icon" />
            <h3>SOVEREIGN_ROUTING</h3>
            <p>You own the data. You own the signal. No platform trackers.</p>
         </div>
         <div className="feature-card">
            <MousePointer2 className="icon" />
            <h3>LIVE_PREVIEW</h3>
            <p>Interactive, scrollable multi-site layouts for maximum engagement.</p>
         </div>
      </section>

      <section className="upcoming">
         <div className="upcoming-content">
            <Sparkles className="sparkle-icon" />
            <h2>2PP.CLICK + MYPP</h2>
            <p>The partnership of the decade. <strong>mypp</strong> is our upcoming automated portfolio engine. Design your destiny, route it through 2pp.click.</p>
            <div className="role-tags">
               <div className="tag"><Code size={12} /> #DEVS</div>
               <div className="tag"><Play size={12} /> #VIDEOGRAPHERS</div>
               <div className="tag"><Camera size={12} /> #PHOTOGRAPHERS</div>
            </div>
         </div>
      </section>

      <footer className="landing-footer">
         <div className="footer-line">© 2026 PIXELS AGENCY // KERNEL_ID: NICO_B</div>
         <div className="footer-line">RECLAIMING THE DIGITAL COMMONS.</div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<PixelsPortalTemplate isDemo={true} />} />
        <Route path="/pp" element={<PixelsPortalTemplate isDemo={false} />} />
      </Routes>
    </Router>
  )
}

export default App
