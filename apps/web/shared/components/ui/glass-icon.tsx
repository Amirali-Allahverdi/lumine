import React from "react";
import styles from "./iconBox.module.css";

interface IconBoxProps {
  icon: React.ReactNode;
  className?: string;
  /** حالت‌های از پیش تعریف شده */
  variant?:
    | "default"
    | "blue"
    | "green"
    | "indigo"
    | "orange"
    | "pink"
    | "red"
    | "teal"
    | "yellow";
  /** رنگ‌های سفارشی که مقادیر پیش‌فرض یا Variant را بازنویسی می‌کنند */
  customColors?: {
    icon?: string;
    background?: string;
    borderTopLeft?: string;
    borderBottomRight?: string;
  };
}

export const IconBox: React.FC<IconBoxProps> = ({
  icon,
  className = "",
  variant = "default",
  customColors,
}) => {
  const variantColors = {
    default: {
      light: {
        bg: "#FFFFFF",
        icon: "#111111",
        borderTL: "rgba(255, 255, 255, 0.8)",
        borderBR: "rgba(0, 0, 0, 0.15)",
      },
      dark: {
        bg: "#161618",
        icon: "#F5F5F5",
        borderTL: "rgba(255, 255, 255, 0.235)",
        borderBR: "rgba(255, 255, 255, 0.235)",
      },
    },
    blue: {
      light: {
        bg: "#F0F8FF",
        icon: "#007AFF",
        borderTL: "rgba(0, 122, 255, 0.4)",
        borderBR: "rgba(0, 122, 255, 0.2)",
      },
      dark: {
        bg: "#001A38",
        icon: "#0A84FF",
        borderTL: "rgba(10, 132, 255, 0.3)",
        borderBR: "rgba(10, 132, 255, 0.1)",
      },
    },
    green: {
      light: {
        bg: "#F0FDF4",
        icon: "#34C759",
        borderTL: "rgba(52, 199, 89, 0.4)",
        borderBR: "rgba(52, 199, 89, 0.2)",
      },
      dark: {
        bg: "#05220E",
        icon: "#30D158",
        borderTL: "rgba(48, 209, 88, 0.3)",
        borderBR: "rgba(48, 209, 88, 0.1)",
      },
    },
    indigo: {
      light: {
        bg: "#F5F5FF",
        icon: "#5856D6",
        borderTL: "rgba(88, 86, 214, 0.4)",
        borderBR: "rgba(88, 86, 214, 0.2)",
      },
      dark: {
        bg: "#100F26",
        icon: "#5E5CE6",
        borderTL: "rgba(94, 92, 230, 0.3)",
        borderBR: "rgba(94, 92, 230, 0.1)",
      },
    },
    orange: {
      light: {
        bg: "#FFF8F0",
        icon: "#FF9500",
        borderTL: "rgba(255, 149, 0, 0.4)",
        borderBR: "rgba(255, 149, 0, 0.2)",
      },
      dark: {
        bg: "#2A1800",
        icon: "#FF9F0A",
        borderTL: "rgba(255, 159, 10, 0.3)",
        borderBR: "rgba(255, 159, 10, 0.1)",
      },
    },
    pink: {
      light: {
        bg: "#FFF0F4",
        icon: "#FF2D55",
        borderTL: "rgba(255, 45, 85, 0.4)",
        borderBR: "rgba(255, 45, 85, 0.2)",
      },
      dark: {
        bg: "#2A040E",
        icon: "#FF375F",
        borderTL: "rgba(255, 55, 95, 0.3)",
        borderBR: "rgba(255, 55, 95, 0.1)",
      },
    },
    red: {
      light: {
        bg: "#FEF2F2",
        icon: "#FF3B30",
        borderTL: "rgba(255, 59, 48, 0.4)",
        borderBR: "rgba(255, 59, 48, 0.2)",
      },
      dark: {
        bg: "#2A0806",
        icon: "#FF453A",
        borderTL: "rgba(255, 69, 58, 0.3)",
        borderBR: "rgba(255, 69, 58, 0.1)",
      },
    },
    teal: {
      light: {
        bg: "#F0FCFF",
        icon: "#30B0C7",
        borderTL: "rgba(48, 176, 199, 0.4)",
        borderBR: "rgba(48, 176, 199, 0.2)",
      },
      dark: {
        bg: "#052026",
        icon: "#40C8E0",
        borderTL: "rgba(64, 200, 224, 0.3)",
        borderBR: "rgba(64, 200, 224, 0.1)",
      },
    },
    yellow: {
      light: {
        bg: "#FFFDF0",
        icon: "#FFCC00",
        borderTL: "rgba(255, 204, 0, 0.4)",
        borderBR: "rgba(255, 204, 0, 0.2)",
      },
      dark: {
        bg: "#262000",
        icon: "#FFD60A",
        borderTL: "rgba(255, 214, 10, 0.3)",
        borderBR: "rgba(255, 214, 10, 0.1)",
      },
    },
  };

  const selectedVariant = variantColors[variant];

  // تخصیص متغیرهای CSS برای انتقال به فایل استایل
  // در صورتی که customColors ارسال شود، جایگزین مقادیر Variant می‌شود
  const cssVariables = {
    "--iconbox-bg-light": customColors?.background || selectedVariant.light.bg,
    "--iconbox-icon-light": customColors?.icon || selectedVariant.light.icon,
    "--iconbox-btl-light":
      customColors?.borderTopLeft || selectedVariant.light.borderTL,
    "--iconbox-bbr-light":
      customColors?.borderBottomRight || selectedVariant.light.borderBR,

    "--iconbox-bg-dark": customColors?.background || selectedVariant.dark.bg,
    "--iconbox-icon-dark": customColors?.icon || selectedVariant.dark.icon,
    "--iconbox-btl-dark":
      customColors?.borderTopLeft || selectedVariant.dark.borderTL,
    "--iconbox-bbr-dark":
      customColors?.borderBottomRight || selectedVariant.dark.borderBR,
  } as React.CSSProperties;

  return (
    <div
      className={`relative flex items-center justify-center p-4 rounded-[30%] ${styles.iconBoxContainer} ${className}`}
      style={cssVariables}
    >
      <div className={styles.iconBoxInnerGlow} />
      <div
        className="z-10 flex items-center justify-center"
        style={{ color: "var(--iconbox-icon-light)" }}
      >
        {/* رنگ آیکون در لایت مود اعمال می‌شود، در دارک مود کلس زیر آن را اورراید می‌کند */}
        <span className={styles.iconWrapper}>{icon}</span>
      </div>
    </div>
  );
};
