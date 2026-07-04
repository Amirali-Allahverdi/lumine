"use client";

import { useMemo } from "react";
import { useMe } from "@/features/profile/hooks/mutations/use-me";
import { title } from "../../primitives";

const morningMessages = [
  "صبح بخیر",
  "صبح قشنگت بخیر",
  "روزت پرانرژی",
  "بریم بدرخشیم",
];

const afternoonMessages = [
  "ظهر بخیر",
  "وقتت بخیر",
  "ادامه روزت پربار",
  "هنوز کلی فرصت برای درخشیدن هست",
];

const eveningMessages = ["عصر بخیر", "عصرت آرام", "خسته نباشی"];

const nightMessages = ["شب بخیر", "شبت آرام"];

const getRandomItem = (items: string[]) => {
  return items[Math.floor(Math.random() * items.length)];
};

const getGreetingMessagesByHour = (hour: number) => {
  if (hour >= 5 && hour < 12) {
    return morningMessages;
  }

  if (hour >= 12 && hour < 17) {
    return afternoonMessages;
  }

  if (hour >= 17 && hour < 21) {
    return eveningMessages;
  }

  return nightMessages;
};

export const SayHello = () => {
  const { data } = useMe();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    const messages = getGreetingMessagesByHour(hour);

    return getRandomItem(messages);
  }, []);

  const firstName = data?.first_name;

  if (!firstName) {
    return greeting;
  }

  return (
    <h1 className="text-4xl font-bold">
      {greeting}، {firstName}
    </h1>
  );
};
