import React from 'react';

const ProgressChart = ({ data, topic }) => {
  // Ensure we have at least two data points for drawing a line
  const chartData = data.length === 1 
    ? [...data, { week: data[0].week + 1, progress: data[0].progress }] 
    : data;
  
  // Find min and max values for scaling
  const maxProgress = Math.max(...chartData.map(point => point.progress), 100);
  const minProgress = Math.min(...chartData.map(point => point.progress), 0);
  
  // Chart dimensions
  const width = 100;
  const height = 100;
  const padding = 10;
  
  // Calculate positions for each point
  const points = chartData.map((point, index) => {
    // Handle division by zero when there's only one point
    const x = chartData.length > 1 
      ? (index / (chartData.length - 1)) * (width - 2 * padding) + padding
      : padding + (width - 2 * padding) / 2;
      
    const progressRange = maxProgress - minProgress;
    // Avoid division by zero
    const normalizedProgress = progressRange > 0 
      ? ((point.progress - minProgress) / progressRange) 
      : 0.5;
      
    const y = height - padding - (normalizedProgress * (height - 2 * padding));
    return { x, y };
  });
  
  // Create SVG path
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`
  ).join(' ');

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="font-semibold text-gray-900 mb-4 capitalize">Learning Progress: {topic}</h3>
      
      <div className="relative h-48">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {/* Y-axis labels */}
          <text x="6" y="10" className="text-[8px] fill-gray-500">100%</text>
          <text x="6" y="45" className="text-[8px] fill-gray-500">50%</text>
          <text x="6" y="80" className="text-[8px] fill-gray-500">0%</text>
          
          {/* X-axis labels */}
          {chartData.map((point, index) => (
            <text 
              key={index}
              x={points[index].x}
              y={height - 2}
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {point.week}
            </text>
          ))}
          
          {/* Grid lines */}
          <line x1="10" y1="15" x2="90" y2="15" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="10" y1="85" x2="90" y2="85" stroke="#e5e7eb" strokeWidth="0.5" />
          
          {/* Progress line */}
          <path
            d={pathData}
            fill="none"
            stroke="#4f46e5"
            strokeWidth="2"
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="2"
              fill="#4f46e5"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default ProgressChart;