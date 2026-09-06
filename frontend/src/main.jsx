import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, ArrowUpRight, ChevronDown, CircleHelp, Headphones, HeartPulse, Hexagon, Moon, Play, Plus, Radio, Shield, Sparkles, Sun, Volume2, Wind, X } from 'lucide-react';
import './styles.css';

const categories = [
  { id: 'all', label: 'All frequencies', icon: Hexagon },
  { id: 'healing', label: 'Healing rites', icon: HeartPulse },
  { id: 'release', label: 'Release & cleanse', icon: Wind },
  { id: 'sexual', label: 'Sexual wellness', icon: Sparkles },
];

const tracks = [
  { id: 1, category: 'healing', tag: 'RECOVERY', name: 'Temple of Restoration', hz: '528 Hz', duration: '22:22', detail: 'Soft harmonic wash for restorative stillness.', tone: 'violet', glyph: '✦' },
  { id: 2, category: 'release', tag: 'CLEARING', name: 'Ashes to Air', hz: '396 Hz', duration: '18:40', detail: 'A grounded pulse for letting go of the day.', tone: 'ember', glyph: '◈' },
  { id: 3, category: 'sexual', tag: 'VITALITY', name: 'Crimson Current', hz: '174 Hz', duration: '24:06', detail: 'Low-frequency grounding for body awareness and presence.', tone: 'red', glyph: '⌁' },
  { id: 4, category: 'healing', tag: 'HEARTWORK', name: 'Green Flame', hz: '639 Hz', duration: '16:16', detail: 'A warm, open soundscape for connection with self.', tone: 'green', glyph: '❋' },
  { id: 5, category: 'sexual', tag: 'DRIVE', name: 'The Root Gate', hz: '256 Hz', duration: '20:20', detail: 'Steady rhythmic ambience for embodied energy.', tone: 'amber', glyph: '✹' },
  { id: 6, category: 'release', tag: 'PROTECTION', name: 'Obsidian Veil', hz: '417 Hz', duration: '21:00', detail: 'A dark drone to mark a clean boundary around your practice.', tone: 'blue', glyph: '◉' },
];

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTrack, setActiveTrack] = useState(tracks[0]);
  const [playing, setPlaying] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [search, setSearch] = useState('');
  const visibleTracks = useMemo(() => tracks.filter((track) => (activeCategory === 'all' || track.category === activeCategory) && `${track.name} ${track.hz} ${track.tag}`.toLowerCase().includes(search.toLowerCase())), [activeCategory, search]);
  const currentCategory = categories.find((category) => category.id === activeCategory);

  const selectTrack = (track) => { setActiveTrack(track); setPlaying(true); };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><div className="brand-mark"><span></span><span></span><span></span></div><div><div className="brand-name">SPECTRES<span>/</span></div><div className="brand-sub">THE LOWER SANCTUM</div></div></div>
        <nav><button className="nav-link active">FREQUENCIES <span className="active-dot"></span></button><button className="nav-link" onClick={() => setShowAbout(true)}>RITUALS</button><button className="nav-link" onClick={() => setShowAbout(true)}>THE ARCHIVE</button></nav>
        <div className="top-actions"><button className="icon-button" aria-label="Help" onClick={() => setShowAbout(true)}><CircleHelp size={17}/></button><button className="profile-button"><span className="profile-orb">ϟ</span> OPERATOR <ChevronDown size={14}/></button></div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"></span> FREQUENCY CHAMBER 03</div><h1>Turn inward.<br /><em>Go deeper.</em></h1><p>A curated collection of sonic environments for exploring the shadow, restoring the body, and reclaiming your energy.</p><div className="hero-buttons"><button className="primary-button" onClick={() => selectTrack(tracks[0])}><Play size={14} fill="currentColor"/> ENTER THE CHAMBER</button><button className="text-button" onClick={() => setShowAbout(true)}>HOW IT WORKS <ArrowUpRight size={14}/></button></div></div>
          <div className="sigil-wrap"><div className="sigil-orbit orbit-one"></div><div className="sigil-orbit orbit-two"></div><div className="sigil"><div className="sigil-eye"></div><div className="sigil-line l1"></div><div className="sigil-line l2"></div><div className="sigil-line l3"></div><div className="sigil-line l4"></div><div className="sigil-line l5"></div><div className="sigil-line l6"></div></div><div className="sigil-caption">✦ &nbsp; SILENCE IS ALSO A FREQUENCY &nbsp; ✦</div></div>
        </section>

        <section className="library-head"><div><div className="eyebrow muted">THE FREQUENCY LIBRARY</div><h2>Choose your <em>intention.</em></h2></div><div className="library-tools"><div className="search-box"><span>/</span><input aria-label="Search frequencies" placeholder="Search the archive..." value={search} onChange={(e) => setSearch(e.target.value)} /></div><button className="filter-button" onClick={() => setActiveCategory('all')}>FILTER <ChevronDown size={14}/></button></div></section>
        <div className="category-row">{categories.map(({ id, label, icon: Icon }) => <button key={id} className={`category ${activeCategory === id ? 'selected' : ''}`} onClick={() => setActiveCategory(id)}><Icon size={15}/>{label}</button>)}</div>
        <section className="track-grid">{visibleTracks.map((track) => <article className={`track-card ${activeTrack.id === track.id ? 'selected-card' : ''}`} key={track.id} onClick={() => selectTrack(track)}><div className={`track-art ${track.tone}`}><div className="art-glyph">{track.glyph}</div><div className="art-ring"></div><button className="card-play" aria-label={`Play ${track.name}`}><Play size={14} fill="currentColor"/></button></div><div className="track-meta"><div className="track-tag">{track.tag}</div><h3>{track.name}</h3><p>{track.detail}</p><div className="track-footer"><span className="hz">{track.hz}</span><span>{track.duration}</span><span className="mini-wave">▂▃▅▃▂</span></div></div></article>)}</section>
        {visibleTracks.length === 0 && <div className="empty">No frequencies found in this chamber.</div>}

        <section className="notice"><Shield size={18}/><div><strong>A note from the sanctum</strong><p>These soundscapes are designed for meditation, reflection, and personal ritual. They are not medical treatment and cannot diagnose, prevent, or cure a condition. Listen at a comfortable volume and stop if you feel unwell.</p></div><button onClick={() => setShowAbout(true)}>LEARN MORE <ArrowUpRight size={14}/></button></section>
      </main>

      <footer className="player"><div className="now-playing"><div className={`player-art ${activeTrack.tone}`}>{activeTrack.glyph}</div><div><div className="playing-label">{playing ? 'NOW RESONATING' : 'READY TO RESONATE'}</div><strong>{activeTrack.name}</strong><span>{activeTrack.hz} · {activeTrack.duration}</span></div></div><div className="player-controls"><button className="skip">|◀</button><button className="main-play" onClick={() => setPlaying(!playing)}>{playing ? 'Ⅱ' : '▶'}</button><button className="skip">▶|</button></div><div className="player-volume"><Volume2 size={16}/><div className="volume-track"><div></div></div><span>64%</span></div></footer>
      {showAbout && <div className="modal-backdrop" onClick={() => setShowAbout(false)}><div className="modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setShowAbout(false)}><X size={16}/></button><div className="eyebrow">THE LOWER SANCTUM</div><h2>Sound as a <em>threshold.</em></h2><p>SPECTRES is a ritualized listening interface for quiet focus, body awareness, and intentional reflection. Pick a frequency, settle in, and let the room around you become less important.</p><p className="modal-note">For wellness and meditation only. The labels are artistic descriptors, not evidence-based medical claims.</p><button className="primary-button" onClick={() => setShowAbout(false)}>RETURN TO THE CHAMBER</button></div></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
