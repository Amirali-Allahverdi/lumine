import { PortfolioForm } from "@/features/auth/components/portfolio-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "رد شده",
};

export default function AuthRejectedStatusPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl text-red">رد شده</h1>
      <p className="max-w-72 text-text-placeholder-dark dark:text-text-placeholder-light">
        متاسفانه درخواست شما بنا به دلایلی مورد تایید قرار نگرفته است ، از توجه
        شما سپاسگذاریم.
        <br /> امیدواریم در آینده افتخار همکاری با شما نصیب ما شود.
      </p>
    </div>
  );
}
