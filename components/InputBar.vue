<template>
    <div class="input-container">
        <template v-if="isMobile">
            <div class="values-container">
                <ValueDisplay title="Unix Timestamp" :value="unixTimestamp" />
                <ValueDisplay title="ISO Format" :value="isoFormat" />
            </div>
            <input type="text" v-model="textInput" class="input-field" placeholder="2024-03-14T22:00:00+10:00" />
            <CodeExamples :timestamp="unixTimestamp" :isoDate="isoFormat" />
        </template>
        <template v-else>
            <input type="text" v-model="textInput" class="input-field" placeholder="2024-03-14T22:00:00+10:00" />
            <div class="values-container">
                <ValueDisplay title="Unix Timestamp" :value="unixTimestamp" />
                <ValueDisplay title="ISO Format" :value="isoFormat" />
            </div>
            <CodeExamples :timestamp="unixTimestamp" :isoDate="isoFormat" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ValueDisplay from './ValueDisplay.vue';
import CodeExamples from './CodeExamples.vue';
import { convertDateTimeToUnix, convertUnixToDateTime } from '../utils';
import { useMobile } from '../composables/useMobile';

const textInput = ref('');
const { isMobile } = useMobile();

const unixTimestamp = computed(() => {
    if (!textInput.value) return '';
    const timestamp = convertDateTimeToUnix(textInput.value);
    return isNaN(timestamp) ? '' : String(timestamp);
});

const isoFormat = computed(() => {
    if (!textInput.value) return '';
    const timestamp = convertDateTimeToUnix(textInput.value);
    if (isNaN(timestamp)) return textInput.value;
    return convertUnixToDateTime(timestamp);
});
</script>

<style scoped>
.input-container {
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    box-sizing: border-box;
}

.input-field {
    padding: 0.75rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--bg-secondary);
    color: var(--text-secondary);
}

.values-container {
    display: flex;
    gap: 1rem;
}

.values-container>* {
    flex: 1;
    min-width: 0;
}

@media (max-width: 768px) {
    .input-container {
        gap: 1.5rem;
        padding: 0;
        width: 100%;
    }

    .input-field {
        font-size: 14px;
        padding: 0.6rem;
        width: 100%;
        box-sizing: border-box;
    }

    .values-container {
        flex-direction: column;
        gap: 0.75rem;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .values-container>* {
        width: 100%;
        margin: 0;
    }
}
</style>