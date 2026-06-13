"use client";

import { Download, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
};

export function NavbarActions() {
  const [isDark, setIsDark] = useState(false);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme ?? (prefersDark ? "dark" : "light");

    document.documentElement.dataset.theme = nextTheme;
    setIsDark(nextTheme === "dark");
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((current) => {
      const nextIsDark = !current;
      const nextTheme = nextIsDark ? "dark" : "light";

      document.documentElement.dataset.theme = nextTheme;
      window.localStorage.setItem("theme", nextTheme);

      return nextIsDark;
    });
  }, []);

  const handleInstall = useCallback(async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    setInstallPrompt(null);
  }, [installPrompt]);

  const state = isDark ? "checked" : "unchecked";

  return (
    <div className="navbar-actions">
      <button
        type="button"
        role="switch"
        aria-label="Toggle theme"
        aria-checked={isDark}
        data-state={state}
        value="on"
        data-slot="switch"
        onClick={toggleTheme}
        className="navbar-theme-switch"
      >
        <span
          data-state={state}
          data-slot="switch-thumb"
          className="navbar-theme-thumb"
        >
          {isDark ? (
            <Moon className="size-3" aria-hidden="true" />
          ) : (
            <Sun className="size-3" aria-hidden="true" />
          )}
        </span>
      </button>

      <button
        type="button"
        data-slot="button"
        onClick={handleInstall}
        className="navbar-install-button"
      >
        <span>Install</span>
        <Download className="navbar-install-icon" aria-hidden="true" />
      </button>
    </div>
  );
}
