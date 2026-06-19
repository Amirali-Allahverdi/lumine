import { PortfolioForm } from "@/features/auth/components/portfolio-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "نمونه کار ها",
};

export default function AuthPortfolioPage() {
  return <PortfolioForm />;
}
