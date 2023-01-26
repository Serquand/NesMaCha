<template>
    <main>
        <section>
            <h3>Valider votre compte</h3>
            <form @submit.prevent="submitCode">
                <input 
                    type="text"
                    placeholder="Code de validation"
                    v-model="code"
                >
                <button type="submit">Valider</button>
            </form>
            <Loader v-if="loading"/>
        </section>
    </main>
</template>

<script>
import Loader from '@/components/LoaderFetch.vue';
import { ref } from 'vue';
import { URL_API } from "../../config.json";

export default {
    setup() {
        const code = ref(""), loading = ref(false);
        return { code, loading };
    },
    methods: {
        async submitCode() {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: this.code,
                    idUser: this.$route.params.idUser
                })
            };

            this.loading = true;
            const res = await fetch(URL_API + "/user/validAccount", requestOptions);
            this.loading = false;
            console.log(res);
        }
    },
    components: { Loader }
}
</script>

<style lang="scss">
</style>