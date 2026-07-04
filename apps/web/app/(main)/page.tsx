import { SayHello } from "@/shared/components/main/home/say-hello";
import { SearchField } from "@heroui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خانه",
};

export default function Home() {
  return (
    <section className="flex flex-col gap-4 p-10">
      <header>
        <SayHello />
        <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">
          روی قولات بمون ، رویا هات رو بساز
        </p>
      </header>
    </section>
  );
}
