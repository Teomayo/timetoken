<script setup lang="ts">
import InputBar from './components/InputBar.vue';
import ThemeToggle from './components/ThemeToggle.vue';
</script>

<template>
  <div class="app">
    <div class="header">
      <div class="title-container">
        <a href="https://github.com/Teomayo/timetoken" target="_blank" rel="noopener noreferrer" class="github-link">
          <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
        <h1 class="title">TimeToken</h1>
      </div>
      <ThemeToggle />
    </div>
    <InputBar />
  </div>
</template>

<style>
:root {
  --bg-primary: antiquewhite;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f5f5f5;
  --text-primary: #8f563b;
  --text-secondary: #333333;
  --border-color: #8f563b;
  --hover-color: rgba(143, 86, 59, 0.1);
}

.dark-theme {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #3d3d3d;
  --text-primary: #e6b17e;
  --text-secondary: #ffffff;
  --border-color: #e6b17e;
  --hover-color: rgba(230, 177, 126, 0.1);
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--bg-primary);
  transition: background-color 0.3s;
}

@media (max-width: 768px) {
  .app {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .title {
    font-size: 2rem;
  }
}

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.github-link {
  display: flex;
  align-items: center;
  color: var(--text-primary);
  transition: opacity 0.2s;
}

.github-link:hover {
  opacity: 0.8;
}

.github-icon {
  width: 24px;
  height: 24px;
}

.title {
  font-family: 'JetBrains Mono', monospace;
  color: var(--text-primary);
  font-size: 2.5rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

input {
  color: var(--text-secondary);
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
}

input::placeholder {
  color: var(--text-secondary);
  opacity: 0.5;
}
</style>