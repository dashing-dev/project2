import React, { useState, useEffect } from 'react';
import { Radar, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ScanResult {
  ip: string;
  port: number;
  status: 'open' | 'closed' | 'filtered' | 'scanning';
  service?: string;
}

export const NetworkScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [currentScan, setCurrentScan] = useState<string>('');

  const commonPorts = [
    { port: 21, service: 'FTP' },
    { port: 22, service: 'SSH' },
    { port: 23, service: 'TELNET' },
    { port: 25, service: 'SMTP' },
    { port: 53, service: 'DNS' },
    { port: 80, service: 'HTTP' },
    { port: 110, service: 'POP3' },
    { port: 143, service: 'IMAP' },
    { port: 443, service: 'HTTPS' },
    { port: 993, service: 'IMAPS' },
    { port: 995, service: 'POP3S' },
    { port: 3389, service: 'RDP' },
    { port: 5432, service: 'PostgreSQL' },
    { port: 3306, service: 'MySQL' }
  ];

  const startScan = async () => {
    setIsScanning(true);
    setResults([]);
    
    const targetIP = `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
    
    for (const { port, service } of commonPorts) {
      setCurrentScan(`Scanning ${targetIP}:${port}`);
      
      // Add scanning entry
      setResults(prev => [...prev, {
        ip: targetIP,
        port,
        status: 'scanning',
        service
      }]);

      // Simulate scan delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
      
      // Determine random result
      const statuses: ('open' | 'closed' | 'filtered')[] = ['open', 'closed', 'filtered'];
      const status = Math.random() > 0.7 ? 'open' : statuses[Math.floor(Math.random() * statuses.length)];
      
      // Update result
      setResults(prev => prev.map(result => 
        result.port === port ? { ...result, status } : result
      ));
    }
    
    setIsScanning(false);
    setCurrentScan('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <CheckCircle className="h-3 w-3 text-green-400" />;
      case 'closed': return <XCircle className="h-3 w-3 text-red-400" />;
      case 'filtered': return <XCircle className="h-3 w-3 text-yellow-400" />;
      case 'scanning': return <Clock className="h-3 w-3 text-blue-400 animate-spin" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-400';
      case 'closed': return 'text-red-400';
      case 'filtered': return 'text-yellow-400';
      case 'scanning': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-black bg-opacity-60 border border-green-500 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Radar className="h-4 w-4 text-green-400" />
          <span className="text-green-400 font-semibold">PORT SCANNER</span>
        </div>
        {!isScanning && (
          <button
            onClick={startScan}
            className="bg-green-500 bg-opacity-20 border border-green-500 text-green-400 px-3 py-1 rounded text-sm hover:bg-opacity-30 transition-colors"
          >
            SCAN NETWORK
          </button>
        )}
      </div>

      {isScanning && (
        <div className="mb-3 text-sm text-green-300">
          <span className="animate-pulse">{currentScan}</span>
        </div>
      )}

      {results.length > 0 && (
        <div className="max-h-48 overflow-y-auto">
          <div className="grid grid-cols-4 gap-2 text-xs text-green-500 mb-2 font-semibold">
            <span>PORT</span>
            <span>SERVICE</span>
            <span>STATUS</span>
            <span>STATE</span>
          </div>
          {results.map((result, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 text-xs mb-1 items-center">
              <span className="text-green-300">{result.port}</span>
              <span className="text-green-300">{result.service}</span>
              <div className="flex items-center space-x-1">
                {getStatusIcon(result.status)}
              </div>
              <span className={getStatusColor(result.status)}>
                {result.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



