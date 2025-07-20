import React, { useState, useEffect } from 'react';
import { Monitor, Wifi, Shield, Terminal, Activity, Zap } from 'lucide-react';
import { SpeedTest } from './components/SpeedTest';
import { SystemMonitor } from './components/SystemMonitor';
import { NetworkScanner } from './components/NetworkScanner';
import { GeolocationTracker } from './components/GeolocationTracker';

interface IPData {
  ip: string;
  city: string;
  country_name: string;
  org: string;
}

interface ConsoleLine {
  id: number;
  text: string;
  type: 'normal' | 'success' | 'warning' | 'error';
  delay?: number;
}

interface SpeedTestResults {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
}

function App() {
  const [lines, setLines] = useState<ConsoleLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [ipData, setIpData] = useState<IPData | null>(null);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [speedTestResults, setSpeedTestResults] = useState<SpeedTestResults | null>(null);

  // Fetch IP data
  useEffect(() => {
    const fetchIPData = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setIpData(data);
      } catch (error) {
        console.error('Failed to fetch IP data:', error);
        // Fallback data
        setIpData({
          ip: '192.168.1.1',
          city: 'Unknown',
          country_name: 'Unknown',
          org: 'Unknown ISP'
        });
      }
    };

    fetchIPData();
  }, []);

  // Generate console lines
  useEffect(() => {
    if (!ipData) return;

    const userAgent = navigator.userAgent;
    const screenRes = `${window.screen.width}x${window.screen.height}`;
    const browserName = getBrowserName(userAgent);
    const osName = getOSName(userAgent);

    const consoleLines: ConsoleLine[] = [
      { id: 1, text: 'INITIALIZING QUANTUM BREACH PROTOCOL v3.2.1...', type: 'warning', delay: 300 },
      { id: 2, text: 'LOADING NEURAL NETWORK MODULES...', type: 'normal', delay: 200 },
      { id: 3, text: 'ESTABLISHING SECURE TUNNEL...', type: 'normal', delay: 200 },
      { id: 4, text: '[✓] QUANTUM ENCRYPTION ENABLED', type: 'success', delay: 150 },
      { id: 5, text: '[✓] STEALTH MODE ACTIVATED', type: 'success', delay: 150 },
      { id: 6, text: '', type: 'normal', delay: 100 },
      { id: 7, text: 'INITIATING DEEP RECONNAISSANCE...', type: 'warning', delay: 250 },
      { id: 8, text: 'SCANNING NETWORK TOPOLOGY...', type: 'normal', delay: 200 },
      { id: 9, text: 'ANALYZING SECURITY PERIMETER...', type: 'normal', delay: 180 },
      { id: 10, text: 'FINGERPRINTING TARGET SYSTEM...', type: 'normal', delay: 200 },
      { id: 11, text: 'ENUMERATING SERVICES...', type: 'normal', delay: 180 },
      { id: 12, text: '', type: 'normal', delay: 100 },
      { id: 13, text: '=== TARGET SYSTEM INTELLIGENCE ===', type: 'success', delay: 150 },
      { id: 14, text: `PUBLIC IP: ${ipData.ip}`, type: 'normal', delay: 120 },
      { id: 15, text: `GEOLOCATION: ${ipData.city}, ${ipData.country_name}`, type: 'normal', delay: 120 },
      { id: 16, text: `ISP/PROVIDER: ${ipData.org}`, type: 'normal', delay: 120 },
      { id: 17, text: '', type: 'normal', delay: 100 },
      { id: 18, text: '=== BROWSER FINGERPRINT ===', type: 'success', delay: 150 },
      { id: 19, text: `BROWSER: ${browserName}`, type: 'normal', delay: 120 },
      { id: 20, text: `OPERATING SYSTEM: ${osName}`, type: 'normal', delay: 120 },
      { id: 21, text: `SCREEN RESOLUTION: ${screenRes}`, type: 'normal', delay: 120 },
      { id: 22, text: `USER AGENT: ${userAgent.substring(0, 60)}...`, type: 'normal', delay: 120 },
      { id: 23, text: '', type: 'normal', delay: 100 },
      { id: 24, text: 'EXECUTING ADVANCED PENETRATION SEQUENCE...', type: 'warning', delay: 250 },
      { id: 25, text: 'SCANNING PORTS [21,22,23,25,53,80,110,143,443,993,995,3389]...', type: 'normal', delay: 300 },
      { id: 26, text: '[✓] PORT 80 OPEN - HTTP SERVICE DETECTED', type: 'success', delay: 150 },
      { id: 27, text: '[✓] PORT 443 OPEN - HTTPS SERVICE DETECTED', type: 'success', delay: 150 },
      { id: 28, text: '[!] PORT 22 FILTERED - SSH SERVICE PROTECTED', type: 'warning', delay: 150 },
      { id: 29, text: 'ANALYZING SSL/TLS CERTIFICATES...', type: 'normal', delay: 250 },
      { id: 30, text: 'BYPASSING WEB APPLICATION FIREWALL...', type: 'warning', delay: 400 },
      { id: 31, text: 'INJECTING POLYMORPHIC PAYLOAD...', type: 'warning', delay: 300 },
      { id: 32, text: 'ESCALATING PRIVILEGES...', type: 'normal', delay: 250 },
      { id: 33, text: 'ESTABLISHING PERSISTENT BACKDOOR...', type: 'warning', delay: 300 },
      { id: 34, text: 'EXFILTRATING SYSTEM INFORMATION...', type: 'normal', delay: 200 },
      { id: 35, text: '', type: 'normal', delay: 200 },
      { id: 36, text: '[✓] BREACH SUCCESSFUL - FULL SYSTEM COMPROMISE', type: 'success', delay: 150 },
      { id: 37, text: '[✓] ROOT ACCESS OBTAINED', type: 'success', delay: 150 },
      { id: 38, text: '[✓] STEALTH MODE MAINTAINED', type: 'success', delay: 150 },
    ];

    setLines(consoleLines);
    setCurrentLineIndex(0);
    setIsTyping(true);
  }, [ipData]);

  // Typing animation
  useEffect(() => {
    if (!isTyping || currentLineIndex >= lines.length) {
      if (currentLineIndex >= lines.length && lines.length > 0) {
        setIsTyping(false);
        setTimeout(() => {
          setShowAccessGranted(true);
          setTimeout(() => setShowTools(true), 2000);
        }, 1000);
      }
      return;
    }

    const currentLine = lines[currentLineIndex];
    const timer = setTimeout(() => {
      setCurrentLineIndex(prev => prev + 1);
    }, currentLine.delay || 150);

    return () => clearTimeout(timer);
  }, [currentLineIndex, lines, isTyping]);

  const getBrowserName = (userAgent: string): string => {
    if (userAgent.includes('Chrome')) return 'Google Chrome';
    if (userAgent.includes('Firefox')) return 'Mozilla Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Microsoft Edge';
    return 'Unknown Browser';
  };

  const getOSName = (userAgent: string): string => {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown OS';
  };

  const getLineClassName = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-green-300';
    }
  };

  const handleSpeedTestComplete = (results: SpeedTestResults) => {
    setSpeedTestResults(results);
  };

  return (
    <div className="min-h-screen bg-black text-green-300 font-mono overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50"></div>
      <div className="fixed inset-0 bg-green-500 opacity-[0.02]"></div>
      
      {/* Scanlines effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-[0.03] animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-green-500 bg-black bg-opacity-90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Terminal className="h-6 w-6 text-green-400" />
              <h1 className="text-lg font-bold text-green-400">QUANTUM BREACH v3.2.1</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span>SECURE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-green-400" />
                <span>CONNECTED</span>
              </div>
              <div className="flex items-center space-x-2">
                <Monitor className="h-4 w-4 text-green-400" />
                <span>ACTIVE</span>
              </div>
              {speedTestResults && (
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-green-400" />
                  <span>{speedTestResults.downloadSpeed} Mbps</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Terminal */}
          <div className="lg:col-span-2">
            <div className="bg-black bg-opacity-80 backdrop-blur-sm rounded-lg border border-green-500 shadow-2xl shadow-green-500/20">
              {/* Terminal Header */}
              <div className="border-b border-green-500 px-6 py-3 bg-green-500 bg-opacity-5">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">root@quantum-breach:~#</span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 min-h-[500px] max-h-[70vh] overflow-y-auto">
                <div className="space-y-1">
                  {lines.slice(0, currentLineIndex).map((line, index) => (
                    <div
                      key={line.id}
                      className={`${getLineClassName(line.type)} ${
                        index === currentLineIndex - 1 ? 'animate-pulse' : ''
                      } text-sm sm:text-base leading-relaxed`}
                    >
                      {line.text ? (
                        <span className="flex items-center">
                          <span className="text-green-500 mr-2">{">"}</span>
                          {line.text}
                        </span>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </div>
                  ))}
                  
                  {/* Blinking cursor */}
                  {isTyping && (
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">{">"}</span>
                      <span className="animate-pulse bg-green-400 w-3 h-5 inline-block"></span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Access Granted Message */}
            {showAccessGranted && (
              <div className="mt-8 text-center">
                <div className="inline-block bg-green-500 bg-opacity-10 border-2 border-green-500 rounded-lg px-8 py-6 animate-pulse">
                  <div className="text-4xl sm:text-6xl font-bold text-green-400 mb-2 tracking-wider">
                    ACCESS GRANTED
                  </div>
                  <div className="text-lg sm:text-xl text-green-300">
                    SYSTEM COMPROMISED • FULL CONTROL ACHIEVED
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Side Panel with Tools */}
          <div className="space-y-4">
            {showTools && (
              <>
                <SystemMonitor />
                <SpeedTest onComplete={handleSpeedTestComplete} />
                <NetworkScanner />
                <GeolocationTracker />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-green-500 bg-black bg-opacity-90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-400">
              STATUS: {isTyping ? 'BREACHING...' : showAccessGranted ? 'COMPROMISED' : 'STANDBY'}
            </span>
            <div className="flex items-center space-x-4">
              {speedTestResults && (
                <span className="text-green-300">
                  NET: {speedTestResults.downloadSpeed}↓ {speedTestResults.uploadSpeed}↑ Mbps
                </span>
              )}
              <span className="text-green-300">
                {new Date().toLocaleTimeString()} UTC
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;