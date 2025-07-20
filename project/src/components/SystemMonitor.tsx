import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, MemoryStick, Activity } from 'lucide-react';

interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export const SystemMonitor: React.FC = () => {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 100)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getBarColor = (value: number) => {
    if (value > 80) return 'bg-red-500';
    if (value > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const StatBar: React.FC<{ icon: React.ReactNode; label: string; value: number }> = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3 mb-3">
      <div className="flex items-center space-x-2 w-20">
        {icon}
        <span className="text-green-400 text-xs">{label}</span>
      </div>
      <div className="flex-1 bg-gray-800 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${getBarColor(value)}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <span className="text-green-300 text-xs w-10 text-right">{value}%</span>
    </div>
  );

  return (
    <div className="bg-black bg-opacity-60 border border-green-500 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="h-4 w-4 text-green-400" />
        <span className="text-green-400 font-semibold">SYSTEM MONITOR</span>
      </div>
      
      <StatBar icon={<Cpu className="h-3 w-3" />} label="CPU" value={stats.cpu} />
      <StatBar icon={<MemoryStick className="h-3 w-3" />} label="RAM" value={stats.memory} />
      <StatBar icon={<HardDrive className="h-3 w-3" />} label="DISK" value={stats.disk} />
      <StatBar icon={<Activity className="h-3 w-3" />} label="NET" value={stats.network} />
    </div>
  );
};