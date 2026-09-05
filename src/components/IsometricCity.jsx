import React, { useState } from 'react';
import { AlertTriangle, Trash2, Droplets, Lightbulb, CheckCircle2, ChevronRight } from 'lucide-react';

export default function IsometricCity({ onSelectPin }) {
  const [activePin, setActivePin] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const pins = [
    {
      id: 'pin-pothole',
      type: 'pothole',
      label: 'Deep Pothole',
      priority: 'High',
      color: '#EF4444',
      glow: 'rgba(239, 68, 68, 0.7)',
      x: 320,
      y: 280,
      location: 'Central Plaza Lane',
      eta: 'SLA: 24h'
    },
    {
      id: 'pin-garbage',
      type: 'garbage',
      label: 'Overflowing Bin',
      priority: 'Medium',
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.7)',
      x: 460,
      y: 210,
      location: 'Market St Crossing',
      eta: 'SLA: 12h'
    },
    {
      id: 'pin-water',
      type: 'water_leak',
      label: 'High-Pressure Leak',
      priority: 'High',
      color: '#22D3EE',
      glow: 'rgba(34, 211, 238, 0.7)',
      x: 210,
      y: 350,
      location: 'Sector 4 Hydrant',
      eta: 'SLA: 4h'
    },
    {
      id: 'pin-streetlight',
      type: 'streetlight',
      label: 'Flickering Lamp',
      priority: 'Medium',
      color: '#F97316',
      glow: 'rgba(249, 115, 22, 0.7)',
      x: 390,
      y: 410,
      location: 'Oakridge Walkway',
      eta: 'SLA: 36h'
    }
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative w-full max-w-[580px] aspect-[4/3.5] mx-auto rounded-card glass-panel p-4 overflow-hidden border border-navy-700/80 shadow-glow-blue/20 group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background ambient gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 via-accent-purple/10 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-blue/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-purple/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top micro HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none text-xs">
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-navy-950/70 border border-navy-700 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
          <span className="text-text-primary font-medium tracking-wide">SMART CITY LIVE TELEMETRY</span>
        </div>
        <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-navy-950/70 border border-navy-700 text-text-secondary">
          <span>Active Grid 08-A</span>
        </div>
      </div>

      {/* SVG Canvas with subtle parallax transform */}
      <div 
        className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`
        }}
      >
        <svg 
          viewBox="0 0 640 480" 
          className="w-full h-full filter drop-shadow-2xl select-none"
        >
          <defs>
            <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B2236" />
              <stop offset="100%" stopColor="#0F1524" />
            </linearGradient>
            <linearGradient id="bldgTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A354D" />
              <stop offset="100%" stopColor="#1E2638" />
            </linearGradient>
            <linearGradient id="bldgLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1B2438" />
              <stop offset="100%" stopColor="#0F1626" />
            </linearGradient>
            <linearGradient id="bldgRight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#131B2C" />
              <stop offset="100%" stopColor="#0A0E1A" />
            </linearGradient>
            <linearGradient id="cyberGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ground isometric grid plane */}
          <g opacity="0.8">
            <polygon points="320,60 600,220 320,440 40,220" fill="url(#bldgRight)" stroke="#22304A" strokeWidth="1.5" />
            
            {/* Grid coordinate lines */}
            <line x1="180" y1="140" x2="460" y2="300" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="250" y1="100" x2="530" y2="260" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="110" y1="180" x2="390" y2="340" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />

            <line x1="460" y1="140" x2="180" y2="300" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="530" y1="180" x2="250" y2="340" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="390" y1="100" x2="110" y2="260" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
          </g>

          {/* Isometric Roads */}
          <g>
            {/* Main NW to SE arterial road */}
            <polygon points="210,125 250,102 470,228 430,251" fill="url(#roadGrad)" stroke="#2A364F" strokeWidth="1" />
            <line x1="230" y1="113" x2="450" y2="239" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.6" />

            {/* SW to NE crossing road */}
            <polygon points="150,285 190,262 410,388 370,411" fill="url(#roadGrad)" stroke="#2A364F" strokeWidth="1" />
            <line x1="170" y1="273" x2="390" y2="399" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.6" />

            {/* Central intersection plaza */}
            <polygon points="280,210 360,165 400,188 320,233" fill="#172134" stroke="#3B82F6" strokeWidth="1" opacity="0.8" />
          </g>

          {/* Elevated transit / smart-rail line */}
          <g opacity="0.75">
            <path d="M 80,180 L 320,320 L 560,180" fill="none" stroke="#2A3244" strokeWidth="6" />
            <path d="M 80,180 L 320,320 L 560,180" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="14 10" />
            {/* Pylons */}
            <line x1="140" y1="215" x2="140" y2="255" stroke="#374151" strokeWidth="3" />
            <line x1="230" y1="268" x2="230" y2="305" stroke="#374151" strokeWidth="3" />
            <line x1="410" y1="268" x2="410" y2="305" stroke="#374151" strokeWidth="3" />
            <line x1="500" y1="215" x2="500" y2="255" stroke="#374151" strokeWidth="3" />
          </g>

          {/* Isometric Buildings */}
          {/* Building 1: Tower Left-Back */}
          <g>
            {/* Left face */}
            <polygon points="120,150 165,176 165,246 120,220" fill="url(#bldgLeft)" stroke="#28354A" strokeWidth="1" />
            {/* Right face */}
            <polygon points="165,176 210,150 210,220 165,246" fill="url(#bldgRight)" stroke="#28354A" strokeWidth="1" />
            {/* Roof */}
            <polygon points="120,150 165,124 210,150 165,176" fill="url(#bldgTop)" stroke="#3B82F6" strokeWidth="1" />
            {/* Windows Left */}
            <line x1="135" y1="165" x2="155" y2="177" stroke="#22D3EE" strokeWidth="1.5" opacity="0.7" />
            <line x1="135" y1="180" x2="155" y2="192" stroke="#22D3EE" strokeWidth="1.5" opacity="0.7" />
            <line x1="135" y1="195" x2="155" y2="207" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6" />
            {/* Roof Spire */}
            <line x1="165" y1="124" x2="165" y2="100" stroke="#22D3EE" strokeWidth="2" />
            <circle cx="165" cy="100" r="3" fill="#22D3EE" filter="url(#glowFilter)" />
          </g>

          {/* Building 2: Civic Headquarters Tower Center */}
          <g>
            {/* Left face */}
            <polygon points="270,140 320,169 320,250 270,221" fill="url(#bldgLeft)" stroke="#3B82F6" strokeWidth="1" />
            {/* Right face */}
            <polygon points="320,169 370,140 370,221 320,250" fill="url(#bldgRight)" stroke="#28354A" strokeWidth="1" />
            {/* Top */}
            <polygon points="270,140 320,111 370,140 320,169" fill="url(#cyberGlass)" stroke="#8B5CF6" strokeWidth="1" />
            {/* Lit Windows Matrix */}
            <circle cx="290" cy="165" r="2" fill="#3B82F6" opacity="0.8" />
            <circle cx="305" cy="173" r="2" fill="#22D3EE" opacity="0.9" />
            <circle cx="290" cy="180" r="2" fill="#8B5CF6" opacity="0.8" />
            <circle cx="305" cy="188" r="2" fill="#3B82F6" opacity="0.8" />
            <circle cx="290" cy="195" r="2" fill="#22D3EE" opacity="0.9" />
            <circle cx="305" cy="203" r="2" fill="#8B5CF6" opacity="0.8" />

            <circle cx="335" cy="173" r="2" fill="#3B82F6" opacity="0.8" />
            <circle cx="350" cy="165" r="2" fill="#22D3EE" opacity="0.9" />
            <circle cx="335" cy="188" r="2" fill="#8B5CF6" opacity="0.8" />
            <circle cx="350" cy="180" r="2" fill="#3B82F6" opacity="0.8" />
            <circle cx="335" cy="203" r="2" fill="#22D3EE" opacity="0.9" />
            <circle cx="350" cy="195" r="2" fill="#8B5CF6" opacity="0.8" />

            {/* Glowing Rooftop Beacon */}
            <ellipse cx="320" cy="140" rx="14" ry="7" fill="none" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="320" y1="135" x2="320" y2="88" stroke="#8B5CF6" strokeWidth="2.5" />
            <circle cx="320" cy="88" r="3.5" fill="#8B5CF6" filter="url(#glowFilter)" />
          </g>

          {/* Building 3: Right Commercial Complex */}
          <g>
            <polygon points="430,170 485,202 485,270 430,238" fill="url(#bldgLeft)" stroke="#28354A" strokeWidth="1" />
            <polygon points="485,202 540,170 540,238 485,270" fill="url(#bldgRight)" stroke="#28354A" strokeWidth="1" />
            <polygon points="430,170 485,138 540,170 485,202" fill="url(#bldgTop)" stroke="#22D3EE" strokeWidth="1" />
            {/* Windows */}
            <line x1="450" y1="190" x2="475" y2="204" stroke="#F59E0B" strokeWidth="1.5" opacity="0.6" />
            <line x1="450" y1="205" x2="475" y2="219" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6" />
            <line x1="450" y1="220" x2="475" y2="234" stroke="#22D3EE" strokeWidth="1.5" opacity="0.7" />
          </g>

          {/* Building 4: Foreground Tech Hub (Left) */}
          <g>
            <polygon points="120,290 170,319 170,380 120,351" fill="url(#bldgLeft)" stroke="#28354A" strokeWidth="1" />
            <polygon points="170,319 220,290 220,351 170,380" fill="url(#bldgRight)" stroke="#28354A" strokeWidth="1" />
            <polygon points="120,290 170,261 220,290 170,319" fill="url(#bldgTop)" stroke="#10B981" strokeWidth="1" />
            {/* Horizontal neon band */}
            <polygon points="120,320 170,349 220,320 170,318" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.7" />
          </g>

          {/* Building 5: Foreground District Center (Right) */}
          <g>
            <polygon points="440,290 490,319 490,375 440,346" fill="url(#bldgLeft)" stroke="#28354A" strokeWidth="1" />
            <polygon points="490,319 540,290 540,346 490,375" fill="url(#bldgRight)" stroke="#28354A" strokeWidth="1" />
            <polygon points="440,290 490,261 540,290 490,319" fill="url(#bldgTop)" stroke="#F59E0B" strokeWidth="1" />
            <circle cx="490" cy="290" r="6" fill="#131B2C" stroke="#F59E0B" strokeWidth="1.5" />
          </g>

          {/* Smart Streetlights with cone glow */}
          <g opacity="0.65">
            <line x1="280" y1="260" x2="280" y2="242" stroke="#60A5FA" strokeWidth="1.5" />
            <circle cx="280" cy="242" r="2" fill="#93C5FD" />
            <line x1="360" y1="295" x2="360" y2="277" stroke="#60A5FA" strokeWidth="1.5" />
            <circle cx="360" cy="277" r="2" fill="#93C5FD" />
            <line x1="220" y1="210" x2="220" y2="195" stroke="#60A5FA" strokeWidth="1.5" />
            <circle cx="220" cy="195" r="2" fill="#93C5FD" />
          </g>

          {/* Futuristic Autonomous Vehicles */}
          <g>
            <polygon points="295,225 310,217 325,225 310,233" fill="#3B82F6" stroke="#93C5FD" strokeWidth="1" />
            <circle cx="310" cy="225" r="1.5" fill="#FFFFFF" />

            <polygon points="400,320 415,312 430,320 415,328" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="1" />
            <circle cx="415" cy="320" r="1.5" fill="#FFFFFF" />
          </g>

          {/* 4 Glowing Incident Status Pins with ripple effects */}
          {pins.map((pin) => {
            const isHovered = activePin === pin.id;
            return (
              <g 
                key={pin.id} 
                className="cursor-pointer transition-transform duration-200"
                onClick={() => {
                  setActivePin(pin.id);
                  if (onSelectPin) onSelectPin(pin);
                }}
                onMouseEnter={() => setActivePin(pin.id)}
                onMouseLeave={() => setActivePin(null)}
              >
                {/* Outer ground pulse circle */}
                <ellipse 
                  cx={pin.x} 
                  cy={pin.y} 
                  rx={isHovered ? "20" : "14"} 
                  ry={isHovered ? "10" : "7"} 
                  fill="none" 
                  stroke={pin.color} 
                  strokeWidth="1.5"
                  opacity="0.8"
                  className="animate-pulse"
                />
                
                {/* Secondary expanding wave */}
                <ellipse 
                  cx={pin.x} 
                  cy={pin.y} 
                  rx="7" 
                  ry="3.5" 
                  fill={pin.color} 
                  opacity="0.3"
                />

                {/* Vertical beacon line */}
                <line 
                  x1={pin.x} 
                  y1={pin.y} 
                  x2={pin.x} 
                  y2={pin.y - 28} 
                  stroke={pin.color} 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />

                {/* Glowing Marker Pin Head */}
                <g transform={`translate(${pin.x}, ${pin.y - 32})`}>
                  <circle 
                    cx="0" 
                    cy="0" 
                    r={isHovered ? "13" : "10"} 
                    fill="#0F172A" 
                    stroke={pin.color} 
                    strokeWidth="2"
                    style={{ filter: `drop-shadow(0 0 8px ${pin.glow})` }}
                  />
                  <circle 
                    cx="0" 
                    cy="0" 
                    r="4" 
                    fill={pin.color} 
                  />
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Glass Tooltip when hovering/selecting a pin */}
      {activePin && (() => {
        const pin = pins.find(p => p.id === activePin);
        if (!pin) return null;
        return (
          <div 
            className="absolute bottom-4 left-4 right-4 glass-panel p-3.5 rounded-elem border border-navy-700 backdrop-blur-xl flex items-center justify-between animate-fade-in z-30 shadow-glass"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white shadow-md"
                style={{ backgroundColor: `${pin.color}22`, border: `1px solid ${pin.color}` }}
              >
                {pin.type === 'pothole' && <AlertTriangle className="w-4 h-4" style={{ color: pin.color }} />}
                {pin.type === 'garbage' && <Trash2 className="w-4 h-4" style={{ color: pin.color }} />}
                {pin.type === 'water_leak' && <Droplets className="w-4 h-4" style={{ color: pin.color }} />}
                {pin.type === 'streetlight' && <Lightbulb className="w-4 h-4" style={{ color: pin.color }} />}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-semibold text-text-primary">{pin.label}</h4>
                  <span 
                    className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: `${pin.color}25`, color: pin.color }}
                  >
                    {pin.priority}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{pin.location} · <span className="text-accent-cyan font-mono">{pin.eta}</span></p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-accent-blue font-medium cursor-pointer hover:underline">
              <span>View Report</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        );
      })()}

      {/* Subtle Legend overlay in bottom right */}
      {!activePin && (
        <div className="absolute bottom-3 right-3 flex items-center space-x-3 text-[11px] text-text-secondary bg-navy-950/80 px-3 py-1.5 rounded-full border border-navy-700/60 backdrop-blur-md pointer-events-none">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-priority-high" />
            <span>Pothole</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-priority-medium" />
            <span>Garbage</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-accent-cyan" />
            <span>Water Leak</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Streetlight</span>
          </span>
        </div>
      )}
    </div>
  );
}
