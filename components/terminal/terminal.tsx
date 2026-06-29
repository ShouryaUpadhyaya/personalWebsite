"use client";

import { useState, useEffect } from "react";
import { ReactTerminal, TerminalContextProvider } from "react-terminal";

const logsData = [
  { text: "Server ready in 2.4s", color: "text-green-400" },
  { text: "GET /dashboard 200 12ms", color: "text-neutral-300" },
  { text: "POST /api/login 200 45ms", color: "text-neutral-300" },
  { text: "Redis HIT session_data", color: "text-blue-400" },
  { text: "Kafka EVENT user.login", color: "text-yellow-400" },
  { text: "Webhook OK delivery_success", color: "text-purple-400" },
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
      {logs.map((log, i) => (
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
