"use client";

import React, { useMemo } from "react";

interface ArcGradientProps {
  /** ارتفاع کامپوننت به پیکسل */
  height?: number;
  /** رنگ‌های گرادیانت از داخل به خارج */
  colors?: {
    inner: string;
    middle: string;
    outer: string;
  };
  /** شدت blur effect */
  blurIntensity?: "low" | "medium" | "high";
  /** کلاس‌های اضافی */
  className?: string;
}

const ArcGradient: React.FC<ArcGradientProps> = ({
  height = 400,
  colors = {
    inner: "#1e40af", // blue-800
    middle: "#3b82f6", // blue-500
    outer: "#9ca3af", // gray-400
  },
  blurIntensity = "high",
  className = "",
}) => {
  const blurValues = {
    low: 40,
    medium: 60,
    high: 80,
  };

  const gradientId = useMemo(
    () => `arc-gradient-${Math.random().toString(36).substr(2, 9)}`,
    [],
  );

  return (
    <div
      className={`relative w-full overflow-hidden bg-black ${className}`}
      style={{ height: `${height}px` }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 576 400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id={gradientId}
            cx="50%"
            cy="100%"
            r="70%"
            fx="50%"
            fy="100%"
          >
            <stop offset="0%" stopColor={colors.inner} stopOpacity="1" />
            <stop offset="40%" stopColor={colors.middle} stopOpacity="0.8" />
            <stop offset="70%" stopColor={colors.outer} stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <filter id={`blur-${gradientId}`}>
            <feGaussianBlur stdDeviation={blurValues[blurIntensity]} />
          </filter>
        </defs>

        {/* Arc shape */}
        <ellipse
          cx="288"
          cy="400"
          rx="350"
          ry="280"
          fill={`url(#${gradientId})`}
          filter={`url(#blur-${gradientId})`}
          opacity="0.9"
        />
      </svg>
    </div>
  );
};

export default ArcGradient;
