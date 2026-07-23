"use client";
import { useMe } from "../hooks/mutations/use-me";

export const ProfileMain = () => {
  const { data, isLoading } = useMe();

  if (!data) {
    return (
      <div className="p-4 text-center text-red-500">
        خطا در بارگذاری اطلاعات کاربری
      </div>
    );
  }

  return (
    <section className="flex justify-center items-center max-w-4xl flex-col gap-8"></section>
  );
};
