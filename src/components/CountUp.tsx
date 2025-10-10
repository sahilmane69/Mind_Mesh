"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import type { CSSProperties } from "react";

type CountUpProps = {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  useEasing?: boolean;
  easingFn?: (t: number, b: number, c: number, d: number) => number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
  animationTriggerMargin?: number | string;
  children?: (props: { countUpRef: React.RefObject<HTMLSpanElement> }) => React.ReactNode;
  onStart?: () => void;
  onEnd?: () => void;
};

// Easing functions
const easing = {
  // Simple linear
  linear: (t: number, b: number, c: number, d: number) => (c * t) / d + b,
  
  // Quadratic easing in
  easeInQuad: (t: number, b: number, c: number, d: number) => c * (t /= d) * t + b,
  
  // Cubic easing out
  easeOutCubic: (t: number, b: number, c: number, d: number) =>
    c * ((t = t / d - 1) * t * t + 1) + b,
  
  // Exponential easing in/out
  easeInOutExpo: (t: number, b: number, c: number, d: number) => {
    if (t === 0) return b;
    if (t === d) return b + c;
    if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
    return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
  },
};

// Format number with commas, decimals, etc.
const formatNumber = (value: number, decimals: number = 0, separator: string = ",") => {
  const fixed = value.toFixed(decimals);
  const [integer, fraction] = fixed.split(".");
  
  // Add separator for thousands
  const integerWithSeparator = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  
  return decimals ? `${integerWithSeparator}.${fraction}` : integerWithSeparator;
};

export function CountUp({
  start = 0,
  end,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = ",",
  useEasing = true,
  easingFn = easing.easeOutCubic,
  className = "",
  style,
  once = true,
  animationTriggerMargin = "-100px",
  children,
  onStart,
  onEnd
}: CountUpProps) {
  const [value, setValue] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const countUpRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(componentRef, { 
    once, 
    margin: (typeof animationTriggerMargin === "string" 
      ? animationTriggerMargin 
      : `${animationTriggerMargin}px`) as any // Cast to expected type
  });
  const frameRef = useRef(0);
  const startTimeRef = useRef(0);
  
  // Handle animation
  useEffect(() => {
    if (!isInView) return;
    
    // Delay the animation if needed
    const timer = setTimeout(() => {
      startTimeRef.current = Date.now();
      setIsAnimating(true);
      onStart?.();
      
      // Clean up previous animation frame if it exists
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      // Start animation
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTimeRef.current;
        
        // Calculate current value
        const timeProgress = Math.min(elapsed / (duration * 1000), 1);
        const valueProgress = useEasing
          ? easingFn(timeProgress, 0, 1, 1)
          : easing.linear(timeProgress, 0, 1, 1);
        
        const currentValue = start + (end - start) * valueProgress;
        setValue(currentValue);
        
        // Continue animation if not finished
        if (timeProgress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setValue(end);
          setIsAnimating(false);
          onEnd?.();
        }
      };
      
      frameRef.current = requestAnimationFrame(animate);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timer);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isInView, start, end, duration, delay, useEasing, easingFn, onStart, onEnd]);
  
  // Format the value for display
  const formattedValue = `${prefix}${formatNumber(value, decimals, separator)}${suffix}`;
  
  // Render with render props pattern if children is provided
  if (children) {
    return (
      <div ref={componentRef} className={className} style={style}>
        <span ref={countUpRef} style={{ visibility: 'hidden', position: 'absolute' }}>
          {formattedValue}
        </span>
        {children({ countUpRef })}
      </div>
    );
  }
  
  // Default render
  return (
    <motion.div 
      ref={componentRef}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
    >
      <span ref={countUpRef}>{formattedValue}</span>
    </motion.div>
  );
}

// Stat card with CountUp component
type StatCardProps = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  accentColor?: string;
  delay?: number;
};

export function StatCard({
  value,
  label,
  prefix = "",
  suffix = "",
  icon,
  accentColor = "from-[#6366F1] to-[#A855F7]",
  delay = 0
}: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative"
      whileHover={{ scale: 1.03 }}
    >
      <div className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all duration-300">
        {/* Background gradient */}
        <div
          className={`absolute inset-0 opacity-5 rounded-xl bg-gradient-to-br ${accentColor}`}
        />
        
        {/* Icon */}
        {icon && (
          <div className={`mb-4 text-gradient bg-gradient-to-r ${accentColor} p-3 rounded-lg inline-block`}>
            {icon}
          </div>
        )}
        
        {/* Counter value */}
        <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${accentColor} bg-clip-text text-transparent`}>
          <CountUp
            end={value}
            prefix={prefix}
            suffix={suffix}
            useEasing={true}
            duration={2.5}
            delay={delay}
          />
        </div>
        
        {/* Label */}
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  );
}

// Stats group component with multiple stat cards
type StatsGroupProps = {
  stats: StatCardProps[];
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export function StatsGroup({
  stats,
  columns = 3,
  className = ""
}: StatsGroupProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          {...stat}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}