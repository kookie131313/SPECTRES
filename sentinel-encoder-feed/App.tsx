import React, { useEffect, useMemo, useRef, useState } from "react";

// Sentinel Encoder Feed: continuous matrix-style display, identity-masked, nine channels.
const CODE_NAME = "SENTINEL";

// Brief data streams. Edit these entries as new briefs arrive.
const FEEDS = [
  {
    channel: "MOTOR / SPEECH",
    color: "#34d399",
    entries: [
      "FINE MOTOR: finger-tap sequence, 3 sets of 10 per hand",
      "ARTICULATION: paced vowel glide drills, 90 seconds",
      "SPEECH PRODUCTION: read aloud one paragraph at slow tempo",
      "BREATH SUPPORT: diaphragmatic hold, 4-count in, 6-count out",
    ],
  },
  {
    channel: "READING / WRITING",
    color: "#60a5fa",
    entries: [
      "READING: one focused passage, annotate one insight per page",
      "WRITING: 150-word freewrite, no editing until complete",
      "SPEECH DRAFT: outline one three-point talk in ten minutes",
      "FLUENCY: re-read yesterday's passage, measure pace improvement",
    ],
  },
  {
    channel: "LITERATURE / STYLE",
    color: "#c084fc",
    entries: [
      "STYLE: compression pass, cut 20 percent of a draft",
      "TREND: literary minimalism and fragmented narration hold momentum",
      "CONTEXT: ground every claim in one concrete image",
      "VOICE: read a favored author aloud, mirror sentence rhythm",
    ],
  },
  {
    channel: "SECURITY / CONTINUITY",
    color: "#fbbf24",
    entries: [
      "DATA: encrypt personal documents at rest, verify key backup",
      "CONTINUITY: confirm offline copy of all brief archives",
      "HYGIENE: rotate one reused credential today",
      "PRACTICE: no personal identifiers in logs or generated files",
    ],
  },
  {
    channel: "WEALTH / LOGIC",
    color: "#38bdf8",
    entries: [
      "WEALTH: one insight on saving, compounding, or cash-flow discipline",
      "MONEY ACTION: log one expense today, review one recurring cost",
      "LOGIC DRILL: solve one deduction or estimation problem",
      "CAPITAL: general education only, never specific investment advice",
    ],
  },
  {
    channel: "HEALTH / WELL-BEING",
    color: "#4ade80",
    entries: [
      "BODY: gentle movement break, posture reset, hydrate this hour",
      "MIND: one reflection question, note the answer in the chain",
      "FEELINGS: rate the day 1 to 10, track the trend over time",
      "WELLNESS: general prompts only, consult a professional for concerns",
    ],
  },
  {
    channel: "CHARISMA / MAGNETISM",
    color: "#f472b6",
    entries: [
      "CONFIDENCE: one posture and eye-contact practice in a real interaction",
      "PRESENCE: full attention on one speaker, no interruptions",
      "MAGNETISM: recall one genuine compliment to give today",
      "SPEAKING: one story told with deliberate pace and pause",
    ],
  },
  {
    channel: "HARM REDUCTION",
    color: "#22d3ee",
    entries: [
      "CHECK-IN: notice one habit pattern without judgment today",
      "SUBSTITUTION: swap one taxing activity for a lighter alternative",
      "BOUNDARIES: set one clear limit and hold it kindly",
      "SAFETY: keep supports and professional resources within reach",
      "POSTURE: reduce risk, respect autonomy, never shame or punish",
    ],
  },
  {
    channel: "THREAT SCAN / INJECTION WATCH",
    color: "#f87171",
    entries: [
      "CODE SCAN: no embedded scripts or hidden instructions in brief",
      "PROMPT SCAN: no injection payloads or encoded strings detected",
      "CONTENT SCAN: exercises verified physically safe and non-coercive",
      "DATA SCAN: zero personal identifiers in feed or output files",
      "POSTURE: all channels clean, monitor and report on next cycle",
    ],
  },
];

const GLYPHS = "01ABCDEFXYZ#$%&*+=<>/\\|{}[]";

function useMatrixRain() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let cols;
    let drops;
    const fontSize = 14;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(0).map(() => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.fillStyle = "rgba(2, 6, 12, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < cols; i++) {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const bright = Math.random() > 0.975;
        ctx.fillStyle = bright ? "#a7f3d0" : "rgba(16, 185, 129, 0.35)";
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return ref;
}

function Ticker({ channel, color, entries }) {
  const row = [...entries, ...entries];
  return (
    <div className="border-b border-emerald-900/40 py-3 overflow-hidden whitespace-nowrap">
      <div className="text-[10px] tracking-[0.35em] mb-1 px-4" style={{ color }}>
        {channel} // CONTINUOUS
      </div>
      <div className="flex ticker-loop" style={{ animationDuration: `${entries.length * 22}s` }}>
        {row.map((entry, i) => (
          <span key={i} className="mx-6 text-sm text-emerald-100/90 font-mono">
            <span style={{ color }}>{">"}</span> {entry}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const canvasRef = useMatrixRain();
  const [clock, setClock] = useState("");
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setClock(new Date().toLocaleTimeString("en-CA", { hour12: false }));
      setFrame((f) => f + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const rotated = useMemo(() => {
    return FEEDS.map((feed) => ({
      ...feed,
      entries: feed.entries.map((_, i) => feed.entries[(i + frame) % feed.entries.length]),
    }));
  }, [frame]);

  return (
    <div className="relative min-h-screen bg-[#02060c] text-emerald-200 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="border-b border-emerald-800/50 px-6 py-4 flex items-center justify-between bg-[#02060c]/80">
          <div>
            <div className="font-mono text-xl tracking-[0.5em] text-emerald-400">
              {CODE_NAME} :: ENCODER FEED
            </div>
            <div className="text-[10px] tracking-[0.3em] text-emerald-700 font-mono">
              LOOP ACTIVE // CYCLE {String(frame).padStart(6, "0")} // IDENTITY MASKED
            </div>
          </div>
          <div className="font-mono text-emerald-500 text-lg tabular-nums">{clock}</div>
        </header>

        <main className="flex-1 flex flex-col justify-center bg-[#02060c]/70">
          {rotated.map((feed) => (
            <Ticker key={feed.channel} channel={feed.channel} color={feed.color} entries={feed.entries} />
          ))}
        </main>

        <footer className="border-t border-emerald-800/50 px-6 py-3 bg-[#02060c]/80 text-[10px] font-mono tracking-[0.3em] text-emerald-800">
          CHANNELS: MOTOR/SPEECH // READING/WRITING // LITERATURE/STYLE // WEALTH/LOGIC // HEALTH/WELL-BEING // CHARISMA/MAGNETISM // HARM REDUCTION // SECURITY // THREAT SCAN
          <span className="mx-2 text-emerald-500">|</span>
          ROLLING REPORT CHAIN ACTIVE
          <span className="mx-2 text-emerald-500">|</span>
          MALICIOUS INJECTION WATCH ACTIVE
          <span className="mx-2 text-emerald-500">|</span>
          NO PERSONAL IDENTIFIERS IN FEED OR LOGS
          <span className="mx-2 text-emerald-500">|</span>
          FEED LOOPS CONTINUOUSLY
        </footer>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-loop {
          animation-name: ticker-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
