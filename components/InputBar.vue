<template>
    <div class="input-container">
        <input type="text" v-model="textInput" class="input-field" placeholder="2024-03-14T22:00:00+10:00" />
        <div class="values-container">
            <ValueDisplay title="Unix Timestamp" :value="unixTimestamp" />
            <ValueDisplay title="ISO Format" :value="isoFormat" />
        </div>
        <CodeExamples :timestamp="unixTimestamp" :isoDate="isoFormat" />
    </div>
</template>

<script lang="ts">
import ValueDisplay from './ValueDisplay.vue';
import CodeExamples from './CodeExamples.vue';
import { convertDateTimeToUnix, convertUnixToDateTime } from '../utils';

export default {
    components: {
        ValueDisplay,
        CodeExamples
    },
    data() {
        return {
            textInput: ''
        };
    },
    computed: {
        unixTimestamp(): string {
            if (!this.textInput) return '';
            const timestamp = convertDateTimeToUnix(this.textInput);
            return isNaN(timestamp) ? '' : String(timestamp);
        },
        isoFormat(): string {
            if (!this.textInput) return '';
            const timestamp = convertDateTimeToUnix(this.textInput);
            if (isNaN(timestamp)) return this.textInput;
            return convertUnixToDateTime(timestamp);
        }
    }
};
</script>

<style scoped>
.input-container {
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
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
    .values-container {
        flex-direction: column;
    }

    .values-container>* {
        width: 100%;
    }
}
</style>