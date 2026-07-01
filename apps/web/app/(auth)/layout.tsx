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
      <section className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 py-8 md:py-10">
        <header>
          <Image
            src={`/logos/lumine.svg`}
            alt="lumine logo"
            width={30}
            height={30}
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
