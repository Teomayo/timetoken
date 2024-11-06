<template>
    <div class="container">
        <div class="hamburger-menu" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <img class="centered-image" src="public/TimeToken.png" alt="Large Image" />
        <div v-if="menuOpen" class="menu">
            <!-- Menu items go here -->
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            menuOpen: false,
        };
    },
    methods: {
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        }
    }
};
</script>
<style scoped>
.container {
    display: flex;
    text-align: center;
}

.column {
    display: flex;
}

.hamburger-menu {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 10;
}

.hamburger-menu span {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px;
    background-color: #333;
}

.centered-image {
    max-width: 100%;
    height: auto;
    display: block;
    /* padding-bottom: 200px; */
    /* margin: 0 auto; */
}

.menu {
    position: absolute;
    top: 60px;
    right: 20px;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 10;
}
</style>