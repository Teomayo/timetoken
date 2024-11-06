<template>
    <div class="centered">
        <div class="column">
            <div class="row">
                <input type="text" v-model="textInput" class="inputItem" />
            </div>
            <div class="row">
                <CodeLanguages :text=textInput class="code-display" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import CodeLanguages from './CodeLanguages.vue';
export default {
    components: {
        CodeLanguages
    },
    data() {
        return {
            textInput: ''
        };
    }
};
</script>

<style>
.centered {
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
    width: 80%;
}

.inputItem {
    background-color: #fff;
    border: 1px solid #8f563b;
    border-radius: 5px;
    padding: 10px;
    font-family: 'Jetbrains Mono', Courier, monospace;
    font-size: 16px;
    overflow-x: auto;
    width: 100%;
    text-align: center;
}

.code-display {
    position: relative;
    background-color: #f5f5f5;
    border: 1px solid #8f563b;
    border-radius: 5px;
    padding: 10px;
    font-family: 'Jetbrains Mono', Courier, monospace;
    font-size: 16px;
    font-weight: 300;
    overflow-x: auto;
    width: 100%;

}

.column {
    display: flex;
    flex-direction: column;
    width: 90%;
}

.row {
    padding: 5%;
    display: grid;
    justify-items: center;
}
</style>