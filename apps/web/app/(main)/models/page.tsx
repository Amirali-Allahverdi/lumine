import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدل ها",
};

export default function Models() {
  return (
    <section className="flex flex-col gap-4 p-10">
      <header>
        <h1 className="text-4xl font-bold">مدل ها</h1>
        <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">
          در همه شهر های ایران، استعدادی برای درخشیدن هست
        </p>
      </header>
    </section>
  );
}
