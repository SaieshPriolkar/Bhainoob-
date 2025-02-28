import React from 'react';

const ProgressWidget = ({ title, current, target, unit, color }) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  return (
    <div className="bg-white border-2 border-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300">
      <h3 className="font-bold text-gray-700">{title}</h3>
      
      {/* Circle Progress */}
      <div className="flex justify-center my-4">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="#f0f0f0" 
              strokeWidth="10" 
            />
            
            {/* Progress Circle */}
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke={color.replace('bg-', 'text-')} 
              strokeWidth="10" 
              strokeDasharray={`${2 * Math.PI * 45 * percentage / 100} ${2 * Math.PI * 45}`} 
              strokeDashoffset="0" 
              strokeLinecap="round" 
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} 
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">{percentage}%</span>
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-600">
        {current} / {target} {unit}
      </div>
    </div>
  );
};

export default ProgressWidget;