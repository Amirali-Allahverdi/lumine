import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پیام ها",
};

export default function Messages() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1>پیام ها</h1>
    </section>
  );
}
