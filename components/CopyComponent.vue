<template>
    <div class="container">
        <div class="imgColumn">
            <button @click="copyClipboard"><img src="public/copy-icon.png" class="copyImg"></button>
        </div>
        <div class="textColumn">
            <h3>{{ codeText }}</h3>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        codeText: {
            type: String,
            required: true
        }
    },
    methods: {
        copyClipboard() {
            navigator.clipboard.writeText(this.codeText).then(() => {
                alert('Code copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    }
}
</script>
<style>
.container {
    display: flex;
    flex-direction: column;
}


.textColumn {
    align-items: center;
    justify-content: center;
    display: flex;
}

.imgColumn {
    align-items: center;
    justify-content: end;
    display: flex;
}


button {
    position: absolute;

    /* top: 10px;
    right: 10px; */
    width: 25px;
    height: 20px;
}

.copyImg {
    width: 100%;
    align-content: center;
    display: grid
}
</style>