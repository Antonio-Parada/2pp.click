import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, ExternalLink, X, Layout, Box, Camera, Globe, Activity, Terminal, Ghost } from 'lucide-react'
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

function App() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredId] = useState<string | null>(null)

  const node = ENCLAVE_NODES.find(n => n.id === activeNode)

  return (
    <div className="portal-container">
      <header className="portal-header">
        <div className="portal-title">
          <h1 className="glitch-text" data-text="PARADA PACE">PARADA<span> PACE</span></h1>
          <p>MASTER_CONTROL // PIXELS_AGENCY_PORTAL_V2</p>
        </div>
        <div className="portal-meta">
           ENCLAVE_SYNC: 100% // PATH: /PP
        </div>
      </header>

      <main className="node-grid">
        {ENCLAVE_NODES.map((n) => (
          <motion.div 
            key={n.id} 
            className={`node-card ${hoveredNode === n.id ? 'is-hovered' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onMouseEnter={() => setHoveredId(n.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="card-header" style={{ borderBottomColor: n.color }}>
               <div className="card-label">
                 {n.icon} <span>{n.title}</span>
               </div>
               <div className="card-actions">
                  <button onClick={() => setActiveNode(n.id)} title="Full Preview"><Maximize2 size={14} /></button>
                  <a href={n.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={14} /></a>
               </div>
            </div>
            
            <div className="preview-container">
               <iframe 
                src={n.url} 
                title={n.title} 
                loading="lazy" 
                style={{ pointerEvents: hoveredNode === n.id ? 'auto' : 'none' }}
               />
               <div className={`iframe-overlay ${hoveredNode === n.id ? 'hidden' : ''}`}></div>
            </div>

            <div className="card-footer">
               <p>{n.desc} // SCROLL_ON_HOVER: ACTIVE</p>
            </div>
          </motion.div>
        ))}
      </main>

      <AnimatePresence>
        {activeNode && node && (
          <motion.div 
            className="fullscreen-modal"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <div className="modal-bar">
               <div className="modal-title">{node.icon} <span>{node.title} // DIRECT_KERNEL_LINK</span></div>
               <button className="close-btn" onClick={() => setActiveNode(null)}><X size={24} /></button>
            </div>
            <div className="modal-content">
               <iframe src={node.url} title={node.title} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="portal-footer">
        <div>© 2026 PIXELS AGENCY // ARCHITECT: NICO_B</div>
        <div>STRENGTH IN THE KERNEL. PEACE IN THE PACE.</div>
      </footer>

      <div className="crt-overlay"></div>
    </div>
  )
}

export default App
