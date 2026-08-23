"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type LocaleSelectorProps = {
  locales: string[];
  value: string;
};

export function LocaleSelector({ locales, value }: LocaleSelectorProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-[#374151]">
      Locale
      <select
        value={value}
        onChange={(event) => {
          const next = new URLSearchParams(searchParams);
          next.set("locale", event.target.value);
          router.replace(`${pathname}?${next.toString()}`);
        }}
        className="h-9 rounded-md border border-[#D8E1DE] bg-white px-2 text-sm text-[#111827] outline-none focus:border-[#08766F]"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale}
          </option>
        ))}
      </select>
    </label>
  );
}
