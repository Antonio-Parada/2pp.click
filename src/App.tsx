import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { 
  Maximize2, ExternalLink, X, Camera, 
  Cpu, Layers, 
} from 'lucide-react'
import './App.css'

// MARKETPLACE TEMPLATE NODES
const DEMO_NODES = [
  { id: '1', title: 'Client Gallery', url: 'https://example.com', icon: <Camera size={18} />, color: '#00ff00', desc: 'Photography focus.' },
  { id: '2', title: 'Project Blueprint', url: 'https://example.com', icon: <Cpu size={18} />, color: '#00ff00', desc: 'Dev/SysAdmin focus.' },
  { id: '3', title: 'Design System', url: 'https://example.com', icon: <Layers size={18} />, color: '#ff00ff', desc: 'Designer focus.' }
]

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
          <p>DEMO_MODE // STYLE: {theme === 'noir' ? 'Classic Dark' : 'Gallery Light'}</p>
        </div>
        <div className="theme-toggle">
            <button onClick={() => setTheme('noir')} className={theme === 'noir' ? 'active' : ''}>Classic Dark</button>
            <button onClick={() => setTheme('minimal')} className={theme === 'minimal' ? 'active' : ''}>Gallery Light</button>
        </div>
      </header>

      <main className="node-grid">
        {DEMO_NODES.map((n) => (
          <motion.div 
            key={n.id} 
            className={`node-card ${hoveredNode === n.id ? 'is-hovered' : ''}`} 
            onMouseEnter={() => setHoveredId(n.id)} 
            onMouseLeave={() => setHoveredId(null)}
            transition={{ duration: 0.5 }} // Luxury smoothing
          >
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
          <motion.div 
            className="fullscreen-modal" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
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
           <Link to="/demo">Explore Templates</Link>
           <button className="btn-small">Login</button>
        </div>
      </nav>

      <header className="hero">
        <motion.div 
           initial={{ opacity: 0, y: 15 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ duration: 0.8 }}
        >
          <div className="badge">THE LINK SHORTENER EVOLUTION</div>
          <h1>YOUR WORK, ELEVATED.</h1>
          <h1 className="gradient-text">PURE PERFORMANCE.</h1>
          <p>A high-performance home for your creative legacy. Simple to set up, impossible to ignore.</p>
          <div className="hero-cta">
             <a href="mailto:architect@pixels.agency?subject=Creative%20Architect%20Early%20Access" className="btn-primary">Claim your site name</a>
             <Link to="/demo" className="btn-secondary">View Demo</Link>
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
