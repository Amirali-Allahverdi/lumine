"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type AuthLogoStepperProps = {
  totalSteps?: number;
  currentStep?: number;
  staticRoutes?: string[];
  size?: number;
};

export const AuthLogoStepper: React.FC<AuthLogoStepperProps> = ({
  totalSteps = 6,
  currentStep = 0,
  staticRoutes = ["/auth", "/auth/otp"],
  size = 80,
}) => {
  const pathname = usePathname();

  const isStaticMode = staticRoutes.includes(pathname || "");

  if (isStaticMode) {
    return (
      <Image
        src={`/logos/lumine_dark_org.svg`}
        alt="lumine logo"
        width={size}
        height={size}
        className="rounded-3xl border-4 border-text-placeholder-light"
      />
    );
  }

  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference / totalSteps;

  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
        <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
          {steps.map((stepIndex) => {
            const isCompleted = stepIndex < currentStep;
            const offset =
              -circumference / 2 +
              segmentLength * stepIndex +
              segmentLength / 2;

            return (
              <circle
                key={stepIndex}
                r={radius}
                cx={0}
                cy={0}
                fill="transparent"
                strokeWidth={6}
                strokeLinecap="round"
                strokeDasharray={`${segmentLength - 2} ${circumference}`}
                strokeDashoffset={offset}
                className={clsx(
                  "transition-all duration-500",
                  isCompleted ? "stroke-primary" : "",
                )}
              />
            );
          })}
        </g>
      </svg>

      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: size - 18,
          height: size - 18,
        }}
      >
        <Image
          src={`/logos/lumine_dark_org.svg`}
          alt="lumine logo"
          width={size}
          height={size}
          className="rounded-full border-4 border-text-placeholder-light"
        />
      </div>
    </div>
  );
};
