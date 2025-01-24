import { ChangeEvent, useTransition } from "react";
import styles from "./local-switcher.module.css";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const LocalSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    const segments = pathname.split("/");
    segments[1] = nextLocale;

    const newPath = segments.join("/");
    startTransition(() => {
      router.replace(newPath); // Removed the search params
    });
  };

  return (
    <div className={styles["language-switcher"]}>
      <select
        defaultValue={currentLocale}
        disabled={isPending}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="ar">Arabic</option>
      </select>
    </div>
  );
};

export default LocalSwitcher;
