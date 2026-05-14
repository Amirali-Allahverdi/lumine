"use client";

import { AuthLogoStepper } from "@/features/auth/components/auth-logo-stepper";
import {
  AUTH_STEP_MAP,
  AUTH_TOTAL_STEPS,
} from "@/features/auth/funcs/auth_steps";
import { PhoneAccordion } from "@/shared/components/form/phone-accordion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const currentStep = AUTH_STEP_MAP[pathname] ?? 0;

  return (
    <>
      <div className="w-[30rem] blur-3xl h-[30rem] rounded-full fixed -top-32 -start-32 bg-surface-elevated-light dark:bg-surface-elevated-dark" />
      <div className="w-[30rem] blur-3xl h-[30rem] rounded-full fixed -bottom-32 -end-32 bg-surface-elevated-light dark:bg-surface-elevated-dark" />
      <section className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 py-8 md:py-10">
        <header>
          <Image
            src={`/logos/lumine_light.svg`}
            alt="lumine logo"
            width={40}
            height={40}
          />
        </header>
        <div className="text-center justify-center">{children}</div>
        <footer className="mt-8 text-text-secondary-light dark:text-text-secondary-dark text-sm">
          <PhoneAccordion />
        </footer>
      </section>
    </>
  );
}
