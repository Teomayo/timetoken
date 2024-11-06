<template>
    <div class="tabs">
        <!-- <button v-for="(tab, index) in tabs" :key="index" @click="currentTab = index">
            {{ tab.name }}
        </button> -->
        <div class="content">
            <CopyComponent :codeText=convertTimeToTokens(text) />
        </div>
    </div>
</template>
<script lang="ts">
import CopyComponent from './CopyComponent.vue';
import { convertTimeToTokens } from '../utils'

export default {
    props: {
        text: { type: String, required: true },
    },
    methods: {
        convertTimeToTokens
    },
    components: {
        CopyComponent
    },
    data() {
        return {
            currentTab: 0,
            tabs: [
                { name: 'Python' },
                { name: 'JavaScript' }
            ]
        };
    }
};
</script>
<style>
.tabs button {
    margin-right: 10px;
    cursor: pointer;
}

.content {
    margin-top: 20px;
}
</style>