import React, { useState, useEffect } from 'react';
import { Wifi, Download, Upload, Zap } from 'lucide-react';

interface SpeedTestProps {
  onComplete: (results: SpeedTestResults) => void;
}

interface SpeedTestResults {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
}

export const SpeedTest: React.FC<SpeedTestProps> = ({ onComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<'ping' | 'download' | 'upload' | 'complete'>('ping');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Partial<SpeedTestResults>>({});

  const runSpeedTest = async () => {
    setIsRunning(true);
    setProgress(0);
    
    // Simulate ping test
    setCurrentTest('ping');
    await simulateTest(25, () => {
      const ping = Math.floor(Math.random() * 50) + 10;
      const jitter = Math.floor(Math.random() * 10) + 1;
      setResults(prev => ({ ...prev, ping, jitter }));
    });

    // Simulate download test
    setCurrentTest('download');
    await simulateTest(50, () => {
      const downloadSpeed = Math.floor(Math.random() * 800) + 100;
      setResults(prev => ({ ...prev, downloadSpeed }));
    });

    // Simulate upload test
    setCurrentTest('upload');
    await simulateTest(25, () => {
      const uploadSpeed = Math.floor(Math.random() * 200) + 50;
      setResults(prev => ({ ...prev, uploadSpeed }));
    });

    setCurrentTest('complete');
    setIsRunning(false);
    
    const finalResults = results as SpeedTestResults;
    onComplete(finalResults);
  };

  const simulateTest = (duration: number, onComplete: () => void): Promise<void> => {
    return new Promise((resolve) => {
      let elapsed = 0;
      const interval = setInterval(() => {
        elapsed += 1;
        setProgress(prev => Math.min(prev + (100 / duration), 100));
        
        if (elapsed >= duration) {
          clearInterval(interval);
          onComplete();
          resolve();
        }
      }, 100);
    });
  };

  const getTestIcon = () => {
    switch (currentTest) {
      case 'ping': return <Zap className="h-4 w-4" />;
      case 'download': return <Download className="h-4 w-4" />;
      case 'upload': return <Upload className="h-4 w-4" />;
      default: return <Wifi className="h-4 w-4" />;
    }
  };

  const getTestLabel = () => {
    switch (currentTest) {
      case 'ping': return 'MEASURING LATENCY';
      case 'download': return 'TESTING DOWNLOAD SPEED';
      case 'upload': return 'TESTING UPLOAD SPEED';
      default: return 'SPEED TEST COMPLETE';
    }
  };

  return (
    <div className="bg-black bg-opacity-60 border border-green-500 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getTestIcon()}
          <span className="text-green-400 font-semibold">NETWORK SPEED TEST</span>
        </div>
        {!isRunning && currentTest !== 'complete' && (
          <button
            onClick={runSpeedTest}
            className="bg-green-500 bg-opacity-20 border border-green-500 text-green-400 px-3 py-1 rounded text-sm hover:bg-opacity-30 transition-colors"
          >
            RUN TEST
          </button>
        )}
      </div>

      {isRunning && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-300 text-sm">{getTestLabel()}</span>
            <span className="text-green-400 text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {Object.keys(results).length > 0 && (
        <div className="grid grid-cols-2 gap-4 text-sm">
          {results.ping && (
            <div>
              <span className="text-green-500">PING:</span>
              <span className="text-green-300 ml-2">{results.ping}ms</span>
            </div>
          )}
          {results.jitter && (
            <div>
              <span className="text-green-500">JITTER:</span>
              <span className="text-green-300 ml-2">{results.jitter}ms</span>
            </div>
          )}
          {results.downloadSpeed && (
            <div>
              <span className="text-green-500">DOWNLOAD:</span>
              <span className="text-green-300 ml-2">{results.downloadSpeed} Mbps</span>
            </div>
          )}
          {results.uploadSpeed && (
            <div>
              <span className="text-green-500">UPLOAD:</span>
              <span className="text-green-300 ml-2">{results.uploadSpeed} Mbps</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};