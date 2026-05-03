// Portfolio (logo wall + blurbs) + Stats + Testimonials + Process + CTA

// SVG mock-UI screenshots per project
const ProjectMockup = ({ id }) => {
  const d = 'oklch(0.22 0.03 260)';   // dark card bg
  const d2 = 'oklch(0.28 0.04 260)';  // slightly lighter
  const acc = 'oklch(0.78 0.15 70)';  // gold/saffron accent
  const g = 'oklch(0.62 0.16 150)';   // green
  const b = 'oklch(0.62 0.12 250)';   // blue
  const muted = 'oklch(0.45 0.03 260)';
  const line = 'oklch(0.32 0.04 260)';

  if (id === 'windward') return (
    <svg viewBox="0 0 360 270" width="100%" height="100%" style={{ display:'block' }}>
      <rect width="360" height="270" fill={d}/>
      {/* dark ocean bg gradient */}
      <rect x="0" y="0" width="360" height="270" fill="url(#wdg)"/>
      <defs>
        <linearGradient id="wdg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.16 0.06 250)"/>
          <stop offset="100%" stopColor="oklch(0.20 0.04 260)"/>
        </linearGradient>
      </defs>
      {/* topbar */}
      <rect x="0" y="0" width="360" height="36" fill="oklch(0.18 0.06 250)"/>
      <rect x="12" y="11" width="80" height="14" rx="3" fill={b} opacity=".9"/>
      <rect x="220" y="11" width="60" height="14" rx="7" fill={d2}/>
      <rect x="288" y="11" width="60" height="14" rx="7" fill={b}/>
      {/* map area */}
      <rect x="0" y="36" width="220" height="140" fill="oklch(0.17 0.05 235)"/>
      {/* ocean grid lines */}
      {[0,1,2,3].map(i => <line key={i} x1="0" y1={60 + i*30} x2="220" y2={60 + i*30} stroke="oklch(0.28 0.05 240)" strokeWidth="0.5"/>)}
      {[0,1,2,3,4].map(i => <line key={i} x1={i*50} y1="36" x2={i*50} y2="176" stroke="oklch(0.28 0.05 240)" strokeWidth="0.5"/>)}
      {/* vessel dots */}
      {[[60,80],[110,100],[80,130],[150,90],[180,120],[40,110]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill={i===0?acc:i===1?g:b} opacity=".9"/>
          <circle cx={x} cy={y} r="10" fill={i===0?acc:i===1?g:b} opacity=".15"/>
        </g>
      ))}
      {/* chat panel */}
      <rect x="220" y="36" width="140" height="140" fill={d2}/>
      <rect x="230" y="48" width="110" height="28" rx="8" fill="oklch(0.26 0.06 260)"/>
      <rect x="238" y="56" width="80" height="6" rx="2" fill="oklch(0.75 0.04 260)" opacity=".8"/>
      <rect x="238" y="66" width="60" height="6" rx="2" fill={muted} opacity=".7"/>
      <rect x="230" y="84" width="100" height="24" rx="8" fill={d}/>
      <rect x="238" y="92" width="75" height="6" rx="2" fill={b} opacity=".9"/>
      <rect x="238" y="102" width="55" height="4" rx="2" fill={muted} opacity=".6"/>
      <rect x="230" y="116" width="110" height="20" rx="5" fill="oklch(0.26 0.06 260)"/>
      <rect x="238" y="123" width="60" height="6" rx="2" fill="oklch(0.75 0.04 260)" opacity=".7"/>
      <rect x="230" y="144" width="110" height="24" rx="6" fill={d} stroke={b} strokeWidth="0.8"/>
      <rect x="238" y="152" width="70" height="6" rx="2" fill={muted} opacity=".5"/>
      <rect x="314" y="148" width="20" height="12" rx="6" fill={b}/>
      {/* metrics row */}
      {[['Vessels','12,840',b],['Risk Alerts','3',acc],['Uptime','99.9%',g]].map(([l,v,c],i) => (
        <g key={l}>
          <rect x={12 + i*118} y="186" width="108" height="52" rx="8" fill={d2} stroke={line} strokeWidth="1"/>
          <text x={66 + i*118} y="204" fontSize="7" fill={muted} textAnchor="middle" fontFamily="monospace">{l}</text>
          <text x={66 + i*118} y="224" fontSize="14" fill={c} textAnchor="middle" fontFamily="monospace" fontWeight="bold">{v}</text>
        </g>
      ))}
      {/* agent tag */}
      <rect x="12" y="248" width="120" height="16" rx="8" fill={b} opacity=".15" stroke={b} strokeWidth="0.8"/>
      <text x="72" y="259" fontSize="8" fill={b} textAnchor="middle" fontFamily="monospace">LangGraph · Multi-Agent · AWS</text>
    </svg>
  );

  if (id === 'pocketaces') return (
    <svg viewBox="0 0 360 270" width="100%" height="100%" style={{ display:'block' }}>
      <rect width="360" height="270" fill={d}/>
      {/* gradient bg */}
      <rect width="360" height="270" fill="url(#pag)"/>
      <defs>
        <linearGradient id="pag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.18 0.06 300)"/>
          <stop offset="100%" stopColor="oklch(0.20 0.04 260)"/>
        </linearGradient>
      </defs>
      {/* topbar */}
      <rect x="0" y="0" width="360" height="36" fill="oklch(0.16 0.06 300)"/>
      <rect x="12" y="10" width="72" height="16" rx="4" fill="oklch(0.7 0.16 300)" opacity=".9"/>
      <rect x="300" y="10" width="48" height="16" rx="8" fill="oklch(0.7 0.16 300)"/>
      {/* live banner */}
      <rect x="0" y="36" width="360" height="100" fill="oklch(0.16 0.05 290)"/>
      <rect x="16" y="16" width="6" height="6" rx="3" fill="oklch(0.62 0.2 30)"/>
      <text x="26" y="21" fontSize="7" fill="oklch(0.62 0.2 30)" fontFamily="monospace">LIVE</text>
      {/* video thumbnails */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={12 + i*118} y="48" width="108" height="68" rx="8" fill="oklch(0.22 0.04 290)"/>
          <rect x={12 + i*118} y="48" width="108" height="68" rx="8" fill={['oklch(0.22 0.06 30)','oklch(0.20 0.06 150)','oklch(0.20 0.06 220)'][i]} opacity=".5"/>
          <circle cx={66 + i*118} cy={82} r="14" fill="oklch(0.1 0 0)" opacity=".6"/>
          <polygon points={`${60 + i*118},76 ${60 + i*118},88 ${74 + i*118},82`} fill="white" opacity=".9"/>
          <rect x={12 + i*118} y="108" width="108" height="8" rx="2" fill="oklch(0.7 0.12 300)" opacity={0.4 + i*0.1}/>
        </g>
      ))}
      {/* personalised feed */}
      <rect x="12" y="144" width="336" height="22" rx="6" fill={d2}/>
      <text x="180" y="158" fontSize="9" fill="oklch(0.7 0.12 300)" textAnchor="middle" fontFamily="monospace">Personalised Feed — 30M users · sub-100ms</text>
      {/* content cards */}
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={12 + i*86} y="174" width="78" height="56" rx="8" fill={d2} stroke={line} strokeWidth="1"/>
          <rect x={12 + i*86} y="174" width="78" height="34" rx="8" fill="oklch(0.24 0.05 300)"/>
          <rect x={18 + i*86} y="214" width="50" height="6" rx="2" fill="oklch(0.75 0.04 300)" opacity=".8"/>
          <rect x={18 + i*86} y="224" width="36" height="5" rx="2" fill={muted} opacity=".7"/>
        </g>
      ))}
      {/* cache label */}
      <rect x="12" y="240" width="200" height="16" rx="8" fill="oklch(0.7 0.12 300)" opacity=".12" stroke="oklch(0.7 0.12 300)" strokeWidth="0.8"/>
      <text x="112" y="251" fontSize="7.5" fill="oklch(0.7 0.12 300)" textAnchor="middle" fontFamily="monospace">Node.js · DynamoDB · Redis · Server-Driven UI</text>
    </svg>
  );

  if (id === 'roadzen') return (
    <svg viewBox="0 0 360 270" width="100%" height="100%" style={{ display:'block' }}>
      <rect width="360" height="270" fill={d}/>
      {/* topbar */}
      <rect x="0" y="0" width="360" height="36" fill={d2}/>
      <rect x="12" y="10" width="88" height="16" rx="4" fill="oklch(0.65 0.16 30)" opacity=".9"/>
      <rect x="300" y="10" width="48" height="16" rx="8" fill="oklch(0.65 0.16 30)"/>
      {/* risk score gauge */}
      <rect x="12" y="48" width="160" height="120" rx="10" fill={d2} stroke={line} strokeWidth="1"/>
      <text x="92" y="68" fontSize="8" fill={muted} textAnchor="middle" fontFamily="monospace">Risk Score</text>
      <circle cx="92" cy="120" r="40" fill="none" stroke={line} strokeWidth="8" strokeDasharray="188" strokeDashoffset="0"/>
      <circle cx="92" cy="120" r="40" fill="none" stroke="oklch(0.65 0.16 30)" strokeWidth="8" strokeDasharray="112 188" strokeDashoffset="47" strokeLinecap="round"/>
      <text x="92" y="125" fontSize="18" fill="oklch(0.65 0.16 30)" textAnchor="middle" fontWeight="bold">72</text>
      <text x="92" y="138" fontSize="7" fill={muted} textAnchor="middle">MEDIUM</text>
      {/* claims table */}
      <rect x="184" y="48" width="164" height="120" rx="10" fill={d2} stroke={line} strokeWidth="1"/>
      <text x="266" y="65" fontSize="8" fill={muted} textAnchor="middle" fontFamily="monospace">Claims Pipeline</text>
      {['Auto-Review','AI Verified','Manual Hold','Settled'].map((s,i) => (
        <g key={s}>
          <rect x="194" y={72 + i*22} width="10" height="10" rx="2" fill={[g,b,acc,'oklch(0.62 0.18 30)'][i]}/>
          <text x="210" y={81 + i*22} fontSize="8" fill="oklch(0.75 0.04 260)">{s}</text>
          <rect x="298" y={72 + i*22} width="40" height="10" rx="4" fill={[g,b,acc,'oklch(0.62 0.18 30)'][i]} opacity=".25"/>
          <text x="318" y={81 + i*22} fontSize="7.5" fill={[g,b,acc,'oklch(0.62 0.18 30)'][i]} textAnchor="middle">{['4.2k','8.1k','312','12k'][i]}</text>
        </g>
      ))}
      {/* telematics */}
      <rect x="12" y="180" width="336" height="72" rx="10" fill={d2} stroke={line} strokeWidth="1"/>
      <text x="30" y="196" fontSize="8" fill={muted} fontFamily="monospace">Telematics Stream</text>
      {/* line chart */}
      <polyline points="30,230 70,215 110,222 150,205 190,210 230,195 270,200 310,185 340,192" fill="none" stroke="oklch(0.65 0.16 30)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="30,230 70,215 110,222 150,205 190,210 230,195 270,200 310,185 340,192" fill="none" stroke="oklch(0.65 0.16 30)" strokeWidth="0" opacity=".1"/>
      {[70,150,230,310].map(x => <circle key={x} cx={x} cy={[215,205,195,185][[70,150,230,310].indexOf(x)]} r="3" fill="oklch(0.65 0.16 30)"/>)}
      <text x="180" y="248" fontSize="7.5" fill={muted} textAnchor="middle" fontFamily="monospace">Python · ML Risk Models · AWS · Real-time</text>
    </svg>
  );

  if (id === 'ayodhyadham') return (
    <svg viewBox="0 0 360 270" width="100%" height="100%" style={{ display:'block' }}>
      <rect width="360" height="270" fill={d}/>
      {/* nav bar */}
      <rect x="0" y="0" width="360" height="36" fill={d2}/>
      <rect x="12" y="12" width="60" height="12" rx="3" fill={acc} opacity=".9"/>
      <rect x="260" y="12" width="40" height="12" rx="3" fill={muted}/>
      <rect x="308" y="12" width="40" height="12" rx="6" fill={acc}/>
      {/* hero banner */}
      <rect x="0" y="36" width="360" height="90" fill="oklch(0.24 0.04 50)"/>
      <rect x="24" y="54" width="140" height="18" rx="4" fill={acc} opacity=".85"/>
      <rect x="24" y="78" width="180" height="10" rx="3" fill="oklch(0.85 0.04 70)" opacity=".6"/>
      <rect x="24" y="96" width="80" height="20" rx="10" fill={acc}/>
      {/* booking cards row */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={24 + i*114} y="142" width="104" height="72" rx="8" fill={d2} stroke={line} strokeWidth="1"/>
          <rect x={34 + i*114} y="154" width="60" height="8" rx="3" fill={acc} opacity=".7"/>
          <rect x={34 + i*114} y="168" width="80" height="6" rx="2" fill={muted}/>
          <rect x={34 + i*114} y="178" width="50" height="6" rx="2" fill={muted} opacity=".6"/>
          <rect x={34 + i*114} y="196" width="48" height="12" rx="6" fill={acc} opacity=".85"/>
        </g>
      ))}
      {/* stat bar */}
      <rect x="24" y="226" width="312" height="32" rx="8" fill={d2}/>
      {['12× Traffic','38% Less Calls','#1 Google'].map((s,i) => (
        <text key={s} x={60 + i*112} y="246" fontSize="9" fill={acc} textAnchor="middle" fontFamily="monospace">{s}</text>
      ))}
    </svg>
  );

  if (id === 'freeup') return (
    <svg viewBox="0 0 360 270" width="100%" height="100%" style={{ display:'block' }}>
      <rect width="360" height="270" fill={d}/>
      <rect x="0" y="0" width="360" height="36" fill={d2}/>
      <rect x="12" y="12" width="52" height="12" rx="3" fill={g} opacity=".9"/>
      <rect x="220" y="10" width="80" height="16" rx="8" fill={d} stroke={line} strokeWidth="1"/>
      <rect x="308" y="10" width="40" height="16" rx="8" fill={g}/>
      {/* search bar */}
      <rect x="24" y="48" width="240" height="28" rx="8" fill={d2} stroke={line} strokeWidth="1"/>
      <rect x="36" y="58" width="120" height="8" rx="3" fill={muted}/>
      <rect x="272" y="48" width="64" height="28" rx="8" fill={g}/>
      {/* listing grid */}
      {[0,1,2,3,4,5].map(i => {
        const col = i % 3, row = Math.floor(i/3);
        return (
          <g key={i}>
            <rect x={24 + col*114} y={92 + row*82} width="104" height="72" rx="8" fill={d2} stroke={line} strokeWidth="1"/>
            <rect x={24 + col*114} y={92 + row*82} width="104" height="40" rx="8" fill="oklch(0.26 0.05 150)" opacity=".6"/>
            <rect x={34 + col*114} y={140 + row*82} width="70" height="7" rx="2" fill="oklch(0.85 0.04 150)" opacity=".8"/>
            <rect x={34 + col*114} y={152 + row*82} width="40" height="6" rx="2" fill={muted}/>
          </g>
        );
      })}
    </svg>
  );

  if (id === 'adventureamore') return (
    <svg viewBox="0 0 360 270" width="100%" height="100%" style={{ display:'block' }}>
      <rect width="360" height="270" fill={d}/>
      {/* hero image area */}
      <rect x="0" y="0" width="360" height="140" fill="oklch(0.22 0.04 230)"/>
      <rect x="0" y="0" width="360" height="140" fill="url(#adg)"/>
      <defs>
        <linearGradient id="adg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.28 0.06 230)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor={d} stopOpacity="1"/>
        </linearGradient>
      </defs>
      {/* mountain silhouette */}
      <path d="M0 110 L60 60 L120 90 L180 40 L240 80 L300 50 L360 80 L360 140 L0 140Z" fill="oklch(0.18 0.04 230)" opacity=".7"/>
      {/* nav */}
      <rect x="0" y="0" width="360" height="30" fill="transparent"/>
      <rect x="12" y="8" width="70" height="14" rx="3" fill="white" opacity=".9"/>
      <rect x="296" y="8" width="52" height="14" rx="7" fill={b}/>
      {/* title overlay */}
      <rect x="24" y="60" width="200" height="20" rx="4" fill="white" opacity=".9"/>
      <rect x="24" y="86" width="140" height="10" rx="3" fill="white" opacity=".6"/>
      <rect x="24" y="104" width="90" height="22" rx="11" fill={b}/>
      {/* itinerary cards */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={24 + i*114} y="155" width="104" height="56" rx="8" fill={d2} stroke={line} strokeWidth="1"/>
          <rect x={34 + i*114} y="165" width="50" height="7" rx="2" fill={b} opacity=".8"/>
          <rect x={34 + i*114} y="177" width="80" height="6" rx="2" fill={muted}/>
          <rect x={34 + i*114} y="188" width="60" height="6" rx="2" fill={muted} opacity=".6"/>
          <rect x={34 + i*114} y="199" width="36" height="8" rx="4" fill={b} opacity=".7"/>
        </g>
      ))}
      {/* metric */}
      <rect x="24" y="222" width="312" height="36" rx="8" fill={d2}/>
      {['4× Leads','2.6× Mobile Conv.','₹0.45/Lead'].map((s,i) => (
        <text key={s} x={60 + i*112} y="244" fontSize="9" fill={b} textAnchor="middle" fontFamily="monospace">{s}</text>
      ))}
    </svg>
  );

  if (id === 'kashitech') return (
    <svg viewBox="0 0 360 270" width="100%" height="100%" style={{ display:'block' }}>
      <rect width="360" height="270" fill={d}/>
      {/* sidebar */}
      <rect x="0" y="0" width="64" height="270" fill={d2}/>
      {[0,1,2,3,4].map(i => <rect key={i} x="16" y={20 + i*36} width="32" height="24" rx="6" fill={i===0?acc:muted} opacity={i===0?1:0.5}/>)}
      {/* topbar */}
      <rect x="64" y="0" width="296" height="36" fill={d2}/>
      <rect x="80" y="12" width="100" height="12" rx="3" fill="oklch(0.8 0.04 70)" opacity=".8"/>
      <rect x="308" y="10" width="40" height="16" rx="8" fill={acc}/>
      {/* metric cards */}
      {[['Fleet','24 Active',g],['ETA Accuracy','94.2%',acc],['Dispatches','187',b]].map(([l,v,c],i) => (
        <g key={l}>
          <rect x={80 + i*98} y="48" width="88" height="56" rx="8" fill={d2} stroke={line} strokeWidth="1"/>
          <text x={124 + i*98} y="70" fontSize="8" fill={muted} textAnchor="middle" fontFamily="monospace">{l}</text>
          <text x={124 + i*98} y="88" fontSize="16" fill={c} textAnchor="middle" fontFamily="monospace" fontWeight="bold">{v}</text>
        </g>
      ))}
      {/* bar chart */}
      <rect x="80" y="116" width="186" height="120" rx="8" fill={d2} stroke={line} strokeWidth="1"/>
      {[40,65,30,80,55,70,45].map((h,i) => (
        <rect key={i} x={96 + i*24} y={216 - h} width="16" height={h} rx="3" fill={acc} opacity={0.5 + i*0.07}/>
      ))}
      <text x="173" y="130" fontSize="8" fill={muted} textAnchor="middle" fontFamily="monospace">Weekly Dispatches</text>
      {/* table */}
      <rect x="274" y="116" width="102" height="120" rx="8" fill={d2} stroke={line} strokeWidth="1"/>
      {['TRK-01','TRK-02','TRK-03','TRK-04'].map((r,i) => (
        <g key={r}>
          <text x="284" y={135 + i*26} fontSize="8" fill="oklch(0.75 0.04 70)" fontFamily="monospace">{r}</text>
          <rect x="338" y={126 + i*26} width="28" height="12" rx="4" fill={i%2===0?g:acc} opacity=".8"/>
        </g>
      ))}
    </svg>
  );

  if (id === 'sarayulabs') return (
    <svg viewBox="0 0 360 270" width="100%" height="100%" style={{ display:'block' }}>
      <rect width="360" height="270" fill={d}/>
      {/* chat interface */}
      <rect x="0" y="0" width="360" height="36" fill={d2}/>
      <rect x="12" y="10" width="80" height="16" rx="4" fill={acc} opacity=".15" stroke={acc} strokeWidth="1"/>
      <text x="52" y="21" fontSize="9" fill={acc} textAnchor="middle" fontFamily="monospace">SarayuLabs AI</text>
      <rect x="316" y="8" width="32" height="20" rx="6" fill={acc} opacity=".85"/>
      {/* doc list sidebar */}
      <rect x="0" y="36" width="120" height="234" fill={d2}/>
      <rect x="10" y="48" width="100" height="16" rx="4" fill={d} stroke={line} strokeWidth="1"/>
      <text x="60" y="59" fontSize="8" fill={muted} textAnchor="middle" fontFamily="monospace">30k+ papers</text>
      {['Neural Networks','Ayodhya History','Sanskrit NLP','RAG Systems','Vector Search'].map((doc,i) => (
        <g key={doc}>
          <rect x="10" y={72 + i*32} width="100" height="26" rx="5" fill={i===0?'oklch(0.28 0.06 260)':d} stroke={i===0?acc:line} strokeWidth={i===0?1:0.5}/>
          <rect x="16" y={79 + i*32} width="8" height="8" rx="2" fill={i===0?acc:muted} opacity=".8"/>
          <rect x="30" y={80 + i*32} width="72" height="5" rx="2" fill={i===0?'oklch(0.8 0.04 70)':muted} opacity=".8"/>
          <rect x="30" y={89 + i*32} width="50" height="4" rx="2" fill={muted} opacity=".5"/>
        </g>
      ))}
      {/* chat messages */}
      <rect x="130" y="48" width="220" height="48" rx="10" fill="oklch(0.26 0.06 260)"/>
      <rect x="140" y="58" width="180" height="7" rx="2" fill="oklch(0.8 0.04 260)" opacity=".8"/>
      <rect x="140" y="70" width="140" height="7" rx="2" fill="oklch(0.8 0.04 260)" opacity=".6"/>
      <rect x="130" y="108" width="200" height="56" rx="10" fill={d2} stroke={line} strokeWidth="1"/>
      <rect x="140" y="118" width="170" height="7" rx="2" fill="oklch(0.8 0.04 70)" opacity=".8"/>
      <rect x="140" y="130" width="180" height="7" rx="2" fill={muted} opacity=".8"/>
      <rect x="140" y="142" width="120" height="7" rx="2" fill={muted} opacity=".6"/>
      <rect x="130" y="176" width="210" height="40" rx="10" fill="oklch(0.26 0.06 260)"/>
      <rect x="140" y="186" width="160" height="7" rx="2" fill="oklch(0.8 0.04 260)" opacity=".8"/>
      <rect x="140" y="198" width="100" height="7" rx="2" fill="oklch(0.8 0.04 260)" opacity=".6"/>
      {/* input */}
      <rect x="130" y="230" width="220" height="30" rx="15" fill={d2} stroke={acc} strokeWidth="1"/>
      <rect x="144" y="240" width="100" height="10" rx="3" fill={muted} opacity=".5"/>
      <rect x="326" y="234" width="18" height="22" rx="9" fill={acc}/>
    </svg>
  );

  // TempleTrust
  return (
    <svg viewBox="0 0 360 270" width="100%" height="100%" style={{ display:'block' }}>
      <rect width="360" height="270" fill={d}/>
      <rect x="0" y="0" width="360" height="36" fill={d2}/>
      <rect x="12" y="10" width="110" height="16" rx="4" fill={acc} opacity=".9"/>
      <rect x="300" y="10" width="48" height="16" rx="8" fill={acc}/>
      {/* stat row */}
      {[['Total Donors','12,480',g],['This Month','₹24L',acc],['Darshan Passes','3,200',b]].map(([l,v,c],i) => (
        <g key={l}>
          <rect x={12 + i*118} y="48" width="108" height="56" rx="8" fill={d2} stroke={line} strokeWidth="1"/>
          <text x={66 + i*118} y="68" fontSize="8" fill={muted} textAnchor="middle" fontFamily="monospace">{l}</text>
          <text x={66 + i*118} y="88" fontSize="15" fill={c} textAnchor="middle" fontFamily="monospace" fontWeight="bold">{v}</text>
        </g>
      ))}
      {/* donor table */}
      <rect x="12" y="116" width="210" height="140" rx="8" fill={d2} stroke={line} strokeWidth="1"/>
      <rect x="12" y="116" width="210" height="24" rx="8" fill={d}/>
      <text x="117" y="131" fontSize="8" fill={muted} textAnchor="middle" fontFamily="monospace">Recent Donors</text>
      {['Ramesh Sharma','Priya Singh','Temple Trust','Hari Om Das','Sita Devi'].map((name,i) => (
        <g key={name}>
          <rect x="22" y={146 + i*22} width="26" height="16" rx="8" fill={acc} opacity=".2"/>
          <text x="35" y={157 + i*22} fontSize="7" fill={acc} textAnchor="middle">{name[0]}</text>
          <text x="60" y={157 + i*22} fontSize="8" fill="oklch(0.8 0.04 70)">{name}</text>
          <rect x="170" y={146 + i*22} width="40" height="14" rx="4" fill={i%3===0?g:i%3===1?acc:b} opacity=".25"/>
          <text x="190" y={157 + i*22} fontSize="7" fill={i%3===0?g:i%3===1?acc:b} textAnchor="middle">₹{(i+1)*5}k</text>
        </g>
      ))}
      {/* donut chart */}
      <rect x="230" y="116" width="118" height="140" rx="8" fill={d2} stroke={line} strokeWidth="1"/>
      <circle cx="289" cy="175" r="38" fill="none" stroke={line} strokeWidth="10"/>
      <circle cx="289" cy="175" r="38" fill="none" stroke={acc} strokeWidth="10" strokeDasharray="96 143" strokeDashoffset="0"/>
      <circle cx="289" cy="175" r="38" fill="none" stroke={g} strokeWidth="10" strokeDasharray="57 143" strokeDashoffset="-96"/>
      <circle cx="289" cy="175" r="38" fill="none" stroke={b} strokeWidth="10" strokeDasharray="47 143" strokeDashoffset="-153"/>
      <text x="289" y="179" fontSize="11" fill="oklch(0.85 0.04 70)" textAnchor="middle" fontWeight="bold">67%</text>
      <text x="289" y="127" fontSize="7" fill={muted} textAnchor="middle" fontFamily="monospace">Donor Split</text>
    </svg>
  );
};

const PROJECTS = [
  { id: 'windward', name: 'Windward AI', url: 'windward.ai', tag: 'AI · Maritime', blurb: 'Maritime intelligence chat — natural language queries over vessel data using multi-agent LangGraph orchestration.', href: 'https://windward.ai' },
  { id: 'freeup', name: 'FreeUp', url: 'freeup.net', tag: 'Marketplace · USA', blurb: 'Freelance marketplace scaled to global high-volume transactions — 4.5 years, microservices, 99.95% uptime.', href: 'https://freeup.net' },
  { id: 'pocketaces', name: 'Pocket Aces / Loco', url: 'loco.gg', tag: 'Game Streaming', blurb: 'Personalised homefeed API serving 30M+ users with sub-100ms response times via multi-level caching.', href: 'https://loco.gg' },
  { id: 'ayodhyadham', name: 'AyodhyaDham', url: 'ayodhyadham.info', tag: 'Tourism · Govt', blurb: 'Pilgrimage portal for Ayodhya — darshan bookings, live updates, multilingual. Handles peak Ram Navami traffic.', href: 'https://ayodhyadham.info' },
  { id: 'roadzen', name: 'Roadzen', url: 'roadzen.io', tag: 'InsurTech · AI', blurb: 'AI-powered InsurTech — telematics, claims automation, and risk scoring at scale.', href: 'https://roadzen.io' },
  { id: 'adventureamore', name: 'Adventure Amore', url: 'adventureamore.com', tag: 'Travel · DTC', blurb: 'Premium travel brand rebuilt around conversion — 4× qualified leads in 90 days.', href: 'https://adventureamore.com' },
];

const Portfolio = ({ setActivePage }) => {
  const { t } = useT();
  return (
    <section id="work-home" style={{ padding: '120px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 56, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 640 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t('port_eyebrow')}</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: 0 }}>
              {t('port_title_a')} <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{t('port_title_em')}</em> {t('port_title_b')}
            </h2>
          </div>
          <button onClick={() => setActivePage('work')} className="btn btn-ghost">{t('port_view_all')} <Icon.Arrow /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="portfolio-grid">
          {PROJECTS.map((p) => (
            <a key={p.name}
              href={p.href || '#'}
              target={p.href ? '_blank' : undefined}
              rel={p.href ? 'noreferrer' : undefined}
              onClick={p.href ? undefined : (e) => { e.preventDefault(); setActivePage('work'); }}
              className="card" style={{
              padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              background: 'var(--bg-2)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 48px oklch(0 0 0 / 0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{
                aspectRatio: '4/3', position: 'relative',
                borderBottom: '1px solid var(--line)',
                overflow: 'hidden', background: 'oklch(0.18 0.04 260)',
              }}>
                <ProjectMockup id={p.id} />
              </div>
              <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="display" style={{ fontSize: 18, margin: 0, fontWeight: 600 }}>{p.name}</h3>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{p.url}</span>
                </div>
                <div className="chip" style={{ alignSelf: 'flex-start' }}><span className="dot"/>{p.tag}</div>
                <p className="muted" style={{ fontSize: 13, margin: 0, flex: 1 }}>{p.blurb}</p>
                <span style={{ fontSize: 13, color: 'var(--accent-ink)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {p.href ? 'Visit site' : 'View case study'} <Icon.Arrow size={12}/>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => (
  <section style={{ padding: '80px 0' }}>
    <div className="container">
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
        background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }} className="stats-grid">
        {[
          { n: '11+', l: 'Years of experience', s: 'Founder-led since 2014' },
          { n: '50+', l: 'Projects shipped', s: 'From MVPs to enterprise' },
          { n: '8', l: 'Countries served', s: 'India, US, UK, UAE, SG, AU, CA, DE' },
          { n: '24h', l: 'Avg. first response', s: 'Real humans, not bots' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'var(--bg)', padding: '40px 28px' }}>
            <div className="display" style={{ fontSize: 56, lineHeight: 1, margin: '0 0 8px', fontWeight: 500, color: i === 0 ? 'var(--accent)' : 'var(--ink)' }}>{s.n}</div>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{s.l}</div>
            <div className="muted" style={{ fontSize: 12 }}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TESTIMONIALS = [
  { quote: 'Vishnu and his team delivered our marketplace in 14 weeks — and stayed on for two years of iteration. They feel like our in-house team.', author: 'Founder', company: 'FreeUp · USA', initials: 'FU' },
  { quote: 'They understood our temple-trust workflow without us having to over-explain it. The donor portal handles peak Ram Navami traffic without a hiccup.', author: 'Operations head', company: 'Temple Trust · Ayodhya', initials: 'TT' },
  { quote: 'We came for a website. We left with a chatbot, paid-ads funnel and 4× more qualified leads in three months.', author: 'Marketing director', company: 'Adventure Amore · India', initials: 'AA' },
];

const Testimonials = () => {
  const { t } = useT();
  return (
  <section style={{ padding: '120px 0', position: 'relative' }}>
    <div className="container">
      <div className="eyebrow" style={{ marginBottom: 16 }}>{t('test_eyebrow')}</div>
      <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '0 0 56px', maxWidth: 800 }}>
        {t('test_title_a')} <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{t('test_title_em')}</em> {t('test_title_b')}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <figure key={i} className="card" style={{ padding: 28, margin: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" style={{ color: 'var(--accent)' }}>
              <path d="M0 24V14C0 6 4 1 12 0v4c-4 1-6 4-6 8h6v12H0Zm20 0V14c0-8 4-13 12-14v4c-4 1-6 4-6 8h6v12H20Z" fill="currentColor"/>
            </svg>
            <blockquote style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: 'var(--ink)' }}>{t.quote}</blockquote>
            <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--accent-soft)', color: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 600,
              }}>{t.initials}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{t.author}</div>
                <div className="muted" style={{ fontSize: 12 }}>{t.company}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
  );
};

const Process = () => {
  const { t } = useT();
  const steps = [
    { n: '01', t: 'Discover', d: 'A 60-minute conversation. We learn your business, users and constraints. No cost, no commitment.' },
    { n: '02', t: 'Define', d: 'A short Sankalp document — scope, milestones, budget, and the success metric we are chasing.' },
    { n: '03', t: 'Design', d: 'Hi-fidelity prototypes you can click. Two rounds of feedback. We do not move on until you love it.' },
    { n: '04', t: 'Develop', d: 'Weekly demos. Production-quality code from day one. CI, tests, observability built in.' },
    { n: '05', t: 'Deploy', d: 'We launch with you, not at you. Analytics, SEO and ad infrastructure live before traffic arrives.' },
    { n: '06', t: 'Dharohar', d: 'The legacy step. We stay on for iteration, marketing and growth — most clients do.' },
  ];
  return (
    <section style={{ padding: '120px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 16 }}>{t('proc_eyebrow')}</div>
        <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '0 0 56px', maxWidth: 760 }}>
          {t('proc_title_a')} <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{t('proc_title_em')}</em> {t('proc_title_b')}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }} className="process-grid">
          {steps.map(s => (
            <div key={s.n} style={{ background: 'var(--bg)', padding: 32 }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: 12 }}>{s.n}</div>
              <h3 className="display" style={{ fontSize: 24, margin: '0 0 10px', fontWeight: 600 }}>{s.t}</h3>
              <p className="muted" style={{ fontSize: 14, margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ setActivePage, onChatOpen }) => {
  const { t } = useT();
  return (
  <section style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
    <div className="sun-rays" style={{ background: 'radial-gradient(ellipse at 50% 100%, oklch(0.66 0.17 50 / 0.18), transparent 60%)' }}/>
    <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 880 }}>
      <div className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex', marginBottom: 24 }}>
        <span>{t('cta_eyebrow')}</span>
      </div>
      <h2 className="display" style={{ fontSize: 'clamp(44px, 6vw, 88px)', margin: '0 0 24px' }}>
        {t('cta_title_a')}<br/>
        <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{t('cta_title_em')}</em>
      </h2>
      <p className="muted" style={{ fontSize: 18, margin: '0 auto 36px', maxWidth: 580 }}>
        {t('cta_lede')}
      </p>
      <div className="final-cta-btns" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => setActivePage('contact')} className="btn btn-primary">{t('hero_cta_primary')} <Icon.Arrow /></button>
        <a href="https://wa.me/917011650803" target="_blank" rel="noreferrer" className="btn btn-accent"><Icon.WhatsApp /> {t('cta_wa')}</a>
        <button onClick={onChatOpen} className="btn btn-ghost"><Icon.Spark /> {t('cta_ask_ai')}</button>
      </div>
    </div>
  </section>
  );
};

Object.assign(window, { PROJECTS, Portfolio, Stats, Testimonials, Process, FinalCTA, TESTIMONIALS });
