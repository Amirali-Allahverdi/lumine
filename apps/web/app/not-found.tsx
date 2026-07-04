import Link from "next/link";

export default function NotFound() {
  return (
    <div className="absolute gap-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col">
      <h2 className="text-7xl text-primary">404</h2>
      <h3>صفحه‌ای که به دنبال آن میگردید پیدا نشد.</h3>
      <Link
        href={"/"}
        className="bg-primary p-1 text-center rounded-xl text-base-light w-full"
      >
        صفحه اصلی
      </Link>
    </div>
  );
}
