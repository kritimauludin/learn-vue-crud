<template>
    <div class="navbar">
        <nav class="nav-extended indigo darken-2">
            <div class="nav-content">
                <router-link to="/"><span class="nav-title">Vue-CRUD</span></router-link>
                <router-link to="/addcourse">
                    <a href="" class="btn-floating btn-large halfway-fab pink">
                        <i class="material-icons">add</i>
                    </a>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default{
    name: 'NavbarItem',
    data(){
        return {

        }
    }
}
</script>

<style>
    .navbar{
        margin-top: -60px;
    }
</style>