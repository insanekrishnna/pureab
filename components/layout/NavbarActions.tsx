"use client";

import { useCallback, useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
};

function SunIcon() {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto size-2.5"
      aria-hidden="true"
    >
      <g fill="currentColor">
        <path d="M9 0.5C9.41421 0.5 9.75 0.835786 9.75 1.25V2.25C9.75 2.66421 9.41421 3 9 3C8.58579 3 8.25 2.66421 8.25 2.25V1.25C8.25 0.835786 8.58579 0.5 9 0.5Z" fillRule="evenodd" />
        <path d="M15.0103 2.98966C15.3032 3.28255 15.3032 3.75743 15.0103 4.05032L14.3033 4.75732C14.0104 5.05021 13.5356 5.05021 13.2427 4.75732C12.9498 4.46443 12.9498 3.98955 13.2427 3.69666L13.9497 2.98966C14.2426 2.69677 14.7174 2.69677 15.0103 2.98966Z" fillRule="evenodd" />
        <path d="M15 9C15 8.58579 15.3358 8.25 15.75 8.25H16.75C17.1642 8.25 17.5 8.58579 17.5 9C17.5 9.41421 17.1642 9.75 16.75 9.75H15.75C15.3358 9.75 15 9.41421 15 9Z" fillRule="evenodd" />
        <path d="M13.2427 13.2427C13.5356 12.9498 14.0104 12.9498 14.3033 13.2427L15.0103 13.9497C15.3032 14.2426 15.3032 14.7174 15.0103 15.0103C14.7174 15.3032 14.2426 15.3032 13.9497 15.0103L13.2427 14.3033C12.9498 14.0104 12.9498 13.5356 13.2427 13.2427Z" fillRule="evenodd" />
        <path d="M9 15C9.41421 15 9.75 15.3358 9.75 15.75V16.75C9.75 17.1642 9.41421 17.5 9 17.5C8.58579 17.5 8.25 17.1642 8.25 16.75V15.75C8.25 15.3358 8.58579 15 9 15Z" fillRule="evenodd" />
        <path d="M4.75735 13.2427C5.05024 13.5356 5.05024 14.0104 4.75735 14.3033L4.05035 15.0103C3.75746 15.3032 3.28258 15.3032 2.98969 15.0103C2.6968 14.7174 2.6968 14.2426 2.98969 13.9497L3.69669 13.2427C3.98958 12.9498 4.46446 12.9498 4.75735 13.2427Z" fillRule="evenodd" />
        <path d="M0.5 9C0.5 8.58579 0.835786 8.25 1.25 8.25H2.25C2.66421 8.25 3 8.58579 3 9C3 9.41421 2.66421 9.75 2.25 9.75H1.25C0.835786 9.75 0.5 9.41421 0.5 9Z" fillRule="evenodd" />
        <path d="M2.98969 2.98966C3.28258 2.69677 3.75746 2.69677 4.05035 2.98966L4.75735 3.69666C5.05024 3.98955 5.05024 4.46443 4.75735 4.75732C4.46446 5.05021 3.98958 5.05021 3.69669 4.75732L2.98969 4.05032C2.6968 3.75743 2.6968 3.28255 2.98969 2.98966Z" fillRule="evenodd" />
        <path d="M9 13.25C11.3472 13.25 13.25 11.347 13.25 9C13.25 6.653 11.3472 4.75 9 4.75C6.6528 4.75 4.75 6.653 4.75 9C4.75 11.347 6.6528 13.25 9 13.25Z" fillOpacity="0.4" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto size-3"
      aria-hidden="true"
    >
      <path
        d="M13.88 11.14C12.79 11.74 11.51 11.93 10.25 11.62C7.4 10.92 5.66 8.04 6.36 5.19C6.58 4.29 7.02 3.49 7.62 2.85C4.93 3.45 2.92 5.85 2.92 8.72C2.92 12.04 5.61 14.73 8.93 14.73C11.04 14.73 12.9 13.64 13.98 11.99C14.21 11.64 14.24 11.35 13.88 11.14Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className="navbar-install-icon -rotate-45"
      aria-hidden="true"
    >
      <g fill="currentColor">
        <path d="M9 1C4.589 1 1 4.589 1 9C1 13.411 4.589 17 9 17C13.411 17 17 13.411 17 9C17 4.589 13.411 1 9 1Z" opacity="0.4" />
        <path d="M8.47 11.72C8.177 12.013 8.177 12.488 8.47 12.781C8.616 12.927 8.808 13.001 9 13.001C9.192 13.001 9.384 12.928 9.53 12.781L12.78 9.53103C13.073 9.23803 13.073 8.76299 12.78 8.46999L9.53 5.21999C9.237 4.92699 8.762 4.92699 8.469 5.21999C8.176 5.51299 8.176 5.98803 8.469 6.28103L10.439 8.251H1.75C1.336 8.251 1 8.587 1 9.001C1 9.415 1.336 9.751 1.75 9.751H10.439L8.469 11.721L8.47 11.72Z" />
      </g>
    </svg>
  );
}

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
          {isDark ? <MoonIcon /> : <SunIcon />}
        </span>
      </button>

      <button
        type="button"
        data-slot="button"
        onClick={handleInstall}
        className="navbar-install-button"
      >
        <span>Install</span>
        <ArrowIcon />
      </button>
    </div>
  );
}
