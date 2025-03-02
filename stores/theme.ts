import { defineStore } from "pinia";

interface ThemeState {
  isDark: boolean;
}

interface ThemeActions {
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore = defineStore<"theme", ThemeState, {}, ThemeActions>(
  "theme",
  {
    state: () => ({
      isDark: false,
    }),

    actions: {
      toggleTheme() {
        this.isDark = !this.isDark;
        if (process.client) {
          document.body.classList.toggle("dark-theme", this.isDark);
          localStorage.setItem("theme", this.isDark ? "dark" : "light");
        }
      },

      initTheme() {
        if (process.client) {
          const storedTheme = localStorage.getItem("theme");
          if (storedTheme) {
            this.isDark = storedTheme === "dark";
          } else {
            const prefersDark = window.matchMedia(
              "(prefers-color-scheme: dark)"
            ).matches;
            this.isDark = prefersDark;
          }
          document.body.classList.toggle("dark-theme", this.isDark);
        }
      },
    },
  }
);
