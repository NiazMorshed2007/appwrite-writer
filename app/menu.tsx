"use client";

import { FontDefault, FontMono, FontSerif } from "@/ui/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/primitives/popover";
import { Check } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "./providers";

const fonts = [
  {
    font: "Default",
    icon: <FontDefault className="h-4 w-4" />,
  },
  {
    font: "Serif",
    icon: <FontSerif className="h-4 w-4" />,
  },
  {
    font: "Mono",
    icon: <FontMono className="h-4 w-4" />,
  },
];

export default function Menu() {
  const { font: currentFont, setFont } = useContext(AppContext);

  return (
    <Popover>
      <PopoverTrigger className="flex h-8 border border-stone-300 w-8 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-stone-100 active:bg-stone-200 sm:bottom-auto sm:top-5">
        <FontDefault className="text-stone-600 w-4 h-4" />
      </PopoverTrigger>
      <PopoverContent className="w-52 divide-y divide-stone-200" align="end">
        <div className="p-2">
          <p className="p-2 text-xs font-medium text-stone-500">Font</p>
          {fonts.map(({ font, icon }) => (
            <button
              key={font}
              className="flex w-full items-center justify-between rounded px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
              onClick={() => {
                setFont(font);
              }}
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border border-stone-200 p-1">
                  {icon}
                </div>
                <span>{font}</span>
              </div>
              {currentFont === font && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
