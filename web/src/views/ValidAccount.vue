<template>
    <main>
        <section v-if="step == 0">
            <div class="title-container">
                <h3>Valider votre compte</h3>
            </div>

            <form @submit.prevent="submitCode">
                <input 
                    type="text"
                    placeholder="Code de validation"
                    v-model="code"
                >
                <button type="submit">Valider</button>
            </form>
        </section>

        <section v-else>
            <p v-if="!error">Félicitations, votre compte a été validé avec succès !</p>
            <p v-else>Un problème a été rencontré lors de la validation de votre compte !</p>
            <p>Vous pouvez maintenant fermer cette page !</p>
        </section>

        <Loader v-if="loading"/>
    </main>
</template>

<script>
import Loader from '@/components/LoaderFetch.vue';
import { ref } from 'vue';
import information from "../../config.json";

export default {
    setup() {
        const code = ref(""), loading = ref(false), error = ref(false), step = ref(0);
        
        return { code, loading, error, step };
    },     

    data: () => {
        return {
            URL_API: information.URL_API, 
        }
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
            const res = await fetch(this.URL_API + "/user/validAccount", requestOptions);
            this.loading = false;
            this.step = 1;
            this.error = res.status === 200 ? false : true;
        }
    },
    components: { Loader }
}
</script>

<style lang="scss">
main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(4, 4, 28);
    color: #333;

    section {
        padding: 50px;
        border-radius: 30px;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;

        .title-container {
            overflow: hidden;

            h3 {
                font-weight: 500;
                color: #333;
                font-size: 20px;
                transform: translateY(100%);
                animation: apparitionTitle 0.3s linear forwards;
            }   
        }

        form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;

            input {
                outline: none;
            }

            button {
                padding: 5px 30px;
                border: none;
                outline: none;
                background-color: rgb(4, 4, 28);
                color: white;
                cursor: pointer;
                border-radius: 10px;
            }
        }
    }
}

@keyframes apparitionTitle {
    to {
        transform: translate(0);
    }
}
</style>