<template>
    <nav class="navbar  navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/home">Poke Vue</a>
            <div class="collapse navbar-collapse">
                <div class="navbar-nav  me-auto mb-2 mb-lg-0">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item" v-for="(link, index) in linkList" :key="index">
                            <router-link :class="getClassForRoute(link.route)" :to="link.route"
                                @click="changeCurrentLink(link.route)">
                                {{ link.title }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <div v-if="showColapssedMenu" class="md-view">
        <ul class="mobile-list">
            <li class="mobile-list-item" v-for="(link, index) in linkList" :key="index">
                <router-link :class="getClassForRoute(link.route)" :to="link.route"
                    @click="changeCurrentLink(link.route)">
                    {{ link.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "HeaderComponent",
    data() {
        return {
            showColapssedMenu: false,
            currentLink: '/home',
            linkList: [
                {
                    title: 'Home',
                    route: '/home',
                    activated: true
                }
            ]
        }
    },
    methods: {
        getClassForRoute(route) {
            return this.currentLink === route ? 'nav-link active' : 'nav-link';
        },
        changeCurrentLink(route) {
            this.showColapssedMenu = false
            this.currentLink = route
        }
    }
}
</script>

<style>
.nav-link {
    cursor: pointer;
}
</style>