<template>
    <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
        <svg v-if="isDark" class="theme-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm7.071 2.929a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm-14.142 0a1 1 0 0 1 1.414 0l.707.707A1 1 0 1 1 5.636 8.05l-.707-.707a1 1 0 0 1 0-1.414zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm-8 4a1 1 0 0 1 1 1 1 1 0 1 1-2 0 1 1 0 0 1 1-1zm16 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM5.636 15.95a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707zm12.728 0l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414zM12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1z"
                fill="currentColor" />
        </svg>
        <svg v-else class="theme-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.37 5.51A7.35 7.35 0 0 0 9.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0 1 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
                fill="currentColor" />
        </svg>
    </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '../stores/theme';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

function toggleTheme() {
    themeStore.toggleTheme();
}

onMounted(() => {
    themeStore.initTheme();
});

// Watch for theme changes and update localStorage
watch(isDark, (newValue) => {
    if (process.client) {
        localStorage.setItem('theme', newValue ? 'dark' : 'light');
    }
});
</script>

<style scoped>
.theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
}

.theme-toggle:hover {
    background-color: var(--hover-color);
}

.theme-icon {
    width: 24px;
    height: 24px;
    color: var(--text-primary);
}

:global(.dark-theme) .theme-icon {
    color: #fff;
}
</style>