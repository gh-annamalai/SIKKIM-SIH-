import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTourTypeBadge(type: string) {
  switch (type) {
    case '360':
      return 'bg-yellow-600 text-black';
    case 'walkthrough':
      return 'bg-blue-600 text-white';
    case 'audio-guide':
      return 'bg-green-600 text-white';
    default:
      return 'bg-gray-600 text-white';
  }
}

