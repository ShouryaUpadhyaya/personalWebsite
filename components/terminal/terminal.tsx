"use client";

import { useState, useEffect } from "react";
import { ReactTerminal, TerminalContextProvider } from "react-terminal";

const logsData = [
  { text: "OpenPumTa: 300+ users | WS timer sync <50ms", color: "text-green-400" },
  { text: "Moss X: Redis HIT /api/products (1.5s -> 150ms)", color: "text-blue-400" },
  { text: "VoiceShield: 48kHz PCM16 chunk OK | Whisper 1.1s", color: "text-purple-400" },
  { text: "CRMS: PG16 BRIN index scan 1M rows in 0.2ms", color: "text-yellow-400" },
  { text: "Razorpay HMAC webhook verified (idempotent)", color: "text-emerald-400" },
  { text: "Prometheus /metrics scraped | 0 errors", color: "text-neutral-300" },
];

function TerminalLogs() {
  const [logs, setLogs] = useState<{text: string, color: string}[]>([logsData[0]]);

  useEffect(() => {
    let currentIndex = 1;
    const interval = setInterval(() => {
      if (currentIndex < logsData.length) {
        setLogs(prev => [...prev, logsData[currentIndex]]);
        currentIndex++;
      } else {
        // Reset or just keep appending to loop
        setLogs([logsData[0]]);
        currentIndex = 1;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1 font-mono text-sm">
      {logs.filter(Boolean).map((log, i) => (
        <div key={i} className={log.color}>
          <span className="text-neutral-500 mr-2">{`>`}</span>
          {log.text}
        </div>
      ))}
      <div className="text-neutral-300 animate-pulse">
        <span className="text-neutral-500 mr-2">{`>`}</span>
        _
      </div>
    </div>
  );
}

export function AnimatedTerminal() {
  return (
    <div className="h-[350px] w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#212121]">
      <TerminalContextProvider>
        <ReactTerminal
          welcomeMessage={<TerminalLogs />}
          theme="dark"
          prompt=""
          errorMessage=""
          showControlBar={true}
          showControlButtons={true}
        />
      </TerminalContextProvider>
    </div>
  );
}
