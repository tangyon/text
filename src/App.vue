<template>
    <div id="app">
        <div class="audio">
            <audio controls autoplay preload>
                <source>
            </audio>
        </div>
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: "App",
    }

</script>


<style lang="less">

    html, body {
        width: 100%;
        height: 100%;
    }

    #app {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .audio {
        width: 0;
        height: 0;
        overflow: hidden;
    }

    audio {
        width: 0;
        height: 0;
    }

</style>
