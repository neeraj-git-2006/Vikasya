import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface CircularHealthMeterProps {
  value: number;
  size?: number;
}

export function CircularHealthMeter({ value, size = 200 }: CircularHealthMeterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayValue / 100) * circumference;

  // Determine color based on value
  const getColor = (val: number) => {
    if (val >= 80) return { primary: "#10b981", glow: "rgba(16, 185, 129, 0.5)" };
    if (val >= 60) return { primary: "#06b6d4", glow: "rgba(6, 182, 212, 0.5)" };
    if (val >= 40) return { primary: "#eab308", glow: "rgba(234, 179, 8, 0.5)" };
    return { primary: "#ef4444", glow: "rgba(239, 68, 68, 0.5)" };
  };

  const colors = getColor(displayValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 200);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Glow Effect */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ backgroundColor: colors.glow }}
      />
      
      <svg width={size} height={size} className="transform -rotate-90 relative z-10">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(71, 85, 105, 0.3)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
            filter: `drop-shadow(0 0 8px ${colors.glow})`,
          }}
        />
        
        {/* Inner glow circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth}
          fill="none"
          stroke={colors.primary}
          strokeWidth={1}
          opacity={0.2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-5xl font-bold text-white mb-1" style={{ color: colors.primary }}>
            {Math.round(displayValue)}
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Health Score</div>
        </motion.div>
      </div>
    </div>
  );
}
