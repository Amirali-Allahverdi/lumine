import { PortfolioForm } from "@/features/auth/components/portfolio-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "انتظار",
};

export default function AuthPendingStatusPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl text-orange">صفحه انتظار</h1>
      <p className="max-w-72 text-text-placeholder-dark dark:text-text-placeholder-light">
        فرم شما در صف انتظار قرار گرفته است ، پس از بررسی نهایی ، نتیجه از طریق
        پیامک و ایمیل به شما اطلاع داده خواهد شد.
      </p>
    </div>
  );
}
