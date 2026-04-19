import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { 
  Maximize2, ExternalLink, X, Camera, 
  Activity, 
  
} from 'lucide-react'
import './App.css'

const DEMO_NODES = [
  { id: '1', title: 'CLIENT_GALLERY', url: 'https://example.com', icon: <Camera size={18} />, color: '#00ff00', desc: 'Photography focus.' },
  { id: '2', title: 'SYSTEM_ARCHITECTURE', url: 'https://example.com', icon: <Activity size={18} />, color: '#00ff00', desc: 'Dev/SysAdmin focus.' },
  { id: '3', title: 'UI_UX_STREAMS', url: 'https://example.com', icon: <Layers size={18} />, color: '#ff00ff', desc: 'Designer focus.' }
]

function Layers({ size }: { size: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg> }

function PixelsPortalTemplate() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredId] = useState<string | null>(null)
  const [theme, setTheme] = useState<'noir' | 'minimal'>('noir')

  return (
    <div className={`portal-template-container theme-${theme}`}>
      <header className="portal-header">
        <Link to="/" className="exit-btn">BACK_TO_PLATFORM</Link>
        <div className="portal-title">
          <h1>PIXELS<span>PORTAL</span></h1>
          <p>DEMO_MODE // THEME: {theme.toUpperCase()}</p>
        </div>
        <div className="theme-toggle">
            <button onClick={() => setTheme('noir')} className={theme === 'noir' ? 'active' : ''}>TERMINAL_NOIR</button>
            <button onClick={() => setTheme('minimal')} className={theme === 'minimal' ? 'active' : ''}>HD_MINIMALIST</button>
        </div>
      </header>

      <main className="node-grid">
        {DEMO_NODES.map((n) => (
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
            <div className="card-footer"><p>{n.desc} // LIVE_RENDER</p></div>
          </motion.div>
        ))}
      </main>

      <AnimatePresence>
        {activeNode && (
          <motion.div className="fullscreen-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <button className="close-btn" onClick={() => setActiveNode(null)}><X size={32} /></button>
             <iframe src={DEMO_NODES.find(n => n.id === activeNode)?.url} />
          </motion.div>
        )}
      </AnimatePresence>
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
          <p>The sovereign alternative to Linktree. Built for the next generation of creative architects.</p>
          <div className="hero-cta">
             <a href="mailto:architect@pixels.agency?subject=Creative%20Architect%20Early%20Access" className="btn-primary">GET_YOUR_PP_LINK</a>
             <Link to="/demo" className="btn-secondary">VIEW_DEMO</Link>
          </div>
        </motion.div>
      </header>

      <footer className="landing-footer">
         <div className="footer-line">© 2026 PIXELS AGENCY // ARCHITECTED FOR THE SOVEREIGN INDIVIDUAL</div>
         <div className="footer-line">ESTABLISHING THE QUIET.</div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<PixelsPortalTemplate />} />
      </Routes>
    </Router>
  )
}

export default App
