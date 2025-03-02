<template>
    <div class="value-container">
        <div class="value-label">{{ title }}</div>
        <div class="value-content">
            <div class="value-text">{{ value }}</div>
            <CopyComponent :text="value" :button-only="true" />
        </div>
    </div>
</template>

<script setup lang="ts">
import CopyComponent from './CopyComponent.vue';

defineProps<{
    title: string;
    value: string;
}>();
</script>

<style scoped>
.value-container {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    box-sizing: border-box;
}

.value-label {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-primary);
}

.value-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 4px;
    padding: 0.75rem;
}

.value-text {
    flex: 1;
    min-width: 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: var(--text-secondary);
    padding: 0.5rem;
    background: var(--bg-secondary);
    border-radius: 4px;
    border: 1px solid var(--border-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media (max-width: 768px) {
    .value-container {
        padding: 0.75rem;
        margin: 0;
    }

    .value-content {
        padding: 0.5rem;
        margin: 0;
        width: 100%;
        box-sizing: border-box;
        gap: 0.25rem;
    }

    .value-text {
        font-size: 12px;
        padding: 0.4rem;
        flex: 1;
        min-width: 0;
    }

    .value-label {
        font-size: 0.9rem;
    }
}

:deep(.copy-button-small) {
    .code-block {
        margin: 0;
        padding: 0;
        background: none;
        display: flex;
        align-items: center;
    }

    .copy-button {
        position: static;
        opacity: 0.8;
        padding: 4px;
    }

    .copy-icon {
        color: var(--text-primary);
    }
}
</style>