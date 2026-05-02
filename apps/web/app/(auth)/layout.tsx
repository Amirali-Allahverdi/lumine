import { PhoneAccordion } from "@/shared/components/form/phone-accordion";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-[30rem] blur-3xl h-[30rem] rounded-full fixed -top-32 -start-32 bg-surface-elevated-light dark:bg-surface-elevated-dark" />
      <div className="w-[30rem] blur-3xl h-[30rem] rounded-full fixed -bottom-32 -end-32 bg-surface-elevated-light dark:bg-surface-elevated-dark" />
      <section className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 py-8 md:py-10">
        <header>
          <Image
            src={`/logos/lumine_dark_org.svg`}
            alt="lumine logo"
            width={80}
            height={80}
            className="rounded-3xl border-4 border-text-placeholder-light"
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
