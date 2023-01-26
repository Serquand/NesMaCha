<template>
    <div class="loader">
        <div class="loader-content"></div>
    </div>
</template>

<script>
export default {
    name: "LoaderFetch"
}
</script>

<style lang="scss">
.loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(20, 20, 20, .7);
    z-index: 1500;
    display: flex;
    justify-content: center;
    align-items: center;
    &-content {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border-top: 1px solid white;
        border-left: 1px solid white;
        animation: loading 1s linear infinite;
    }
}
@keyframes loading {
    to {
        transform: rotate(360deg);
    }
}
</style>