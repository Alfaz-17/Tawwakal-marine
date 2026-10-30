import React from "react";

type TawakkalBackgroundProps = {
  variant?: "light" | "soft" | "dark";
  className?: string;
};

export default function TawakkalBackground({
  variant = "light",
  className = "",
}: TawakkalBackgroundProps) {
  const isDark = variant === "dark";

  return (
    <div
      aria-hidden="true"
      className={`ta-background ta-background-${variant} ${className}`}
    >
      {/* Subtle Maritime Glow for light/soft variants - omitted in dark to prevent any whitish fog */}
      {!isDark && <div className="ta-background-glow" />}

      <svg
        className="ta-background-waves"
        viewBox="0 0 1920 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Wave Gradients - Rich Nautical Teal & Marine Steel */}
          <linearGradient id={`waveOne-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0%"
              stopColor={isDark ? "#0095A8" : "#8CC7D1"}
              stopOpacity={isDark ? ".25" : ".40"}
            />
            <stop
              offset="50%"
              stopColor={isDark ? "#062E5F" : "#5DAEB9"}
              stopOpacity={isDark ? ".35" : ".30"}
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#0095A8" : "#0095A8"}
              stopOpacity={isDark ? ".20" : ".25"}
            />
          </linearGradient>

          <linearGradient id={`waveTwo-${variant}`} x1="0" y1="0" x2="1" y2="0">
            <stop
              offset="0%"
              stopColor={isDark ? "#003A63" : "#C1E0EB"}
              stopOpacity={isDark ? ".25" : ".45"}
            />
            <stop
              offset="50%"
              stopColor={isDark ? "#0095A8" : "#72C6CE"}
              stopOpacity={isDark ? ".30" : ".35"}
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#041C38" : "#B2D9E6"}
              stopOpacity={isDark ? ".35" : ".30"}
            />
          </linearGradient>

          <linearGradient id={`waveThree-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0%"
              stopColor={isDark ? "#020E1E" : "#061D45"}
              stopOpacity={isDark ? ".5" : ".08"}
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#062E5F" : "#0095A8"}
              stopOpacity={isDark ? ".4" : ".18"}
            />
          </linearGradient>

          <filter id={`waveBlur-${variant}`}>
            <feGaussianBlur stdDeviation={isDark ? "8" : "6"} />
          </filter>
        </defs>

        {/* Soft flowing maritime waves */}
        <path
          d="M0 440
          C250 500 330 690 650 760
          C980 850 1260 650 1550 510
          C1710 430 1820 370 1920 330
          L1920 900 L0 900 Z"
          fill={`url(#waveThree-${variant})`}
        />

        <path
          d="M0 520
          C260 550 390 770 730 790
          C1050 810 1320 620 1580 500
          C1720 440 1830 400 1920 370
          L1920 900 L0 900 Z"
          fill={`url(#waveOne-${variant})`}
        />

        <path
          d="M0 610
          C250 570 420 820 760 830
          C1100 850 1330 700 1590 580
          C1740 510 1830 475 1920 450
          L1920 900 L0 900 Z"
          fill={`url(#waveTwo-${variant})`}
        />

        {/* Distinct nautical crest line */}
        <path
          d="M0 450
          C240 490 380 720 690 785
          C1000 850 1270 710 1530 570
          C1710 475 1820 430 1920 400"
          fill="none"
          stroke={isDark ? "#00C9DB" : "#0095A8"}
          strokeWidth="3.5"
          opacity={isDark ? ".6" : ".45"}
        />

        <path
          d="M0 560
          C270 570 430 790 740 815
          C1050 840 1320 675 1600 550
          C1740 485 1840 460 1920 440"
          fill="none"
          stroke={isDark ? "#061D45" : "#0B1E3F"}
          strokeWidth="2"
          opacity={isDark ? ".3" : ".18"}
        />

        {/* Technical upper navigation curves */}
        <path
          d="M0 0 C100 250 250 400 480 520"
          fill="none"
          stroke={isDark ? "#0095A8" : "#0095A8"}
          strokeWidth="2"
          opacity={isDark ? ".4" : ".25"}
        />

        {!isDark && (
          <path
            d="M0 0 C130 300 270 410 510 550"
            fill="none"
            stroke="#8CC7D1"
            strokeWidth="6"
            opacity=".20"
            filter={`url(#waveBlur-${variant})`}
          />
        )}
      </svg>
    </div>
  );
}

export { TawakkalBackground };
