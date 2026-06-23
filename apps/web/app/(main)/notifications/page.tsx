import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اعلانات",
};

export default function Notifications() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1>اعلانات</h1>
    </section>
  );
}
