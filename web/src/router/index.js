import { createRouter, createWebHistory } from 'vue-router'
import NotFound from "@/views/NotFound";
import ValidAccount from "@/views/ValidAccount"

const routes = [
    {
        path: '/:idUser',
        name: 'validAccount',
        component: ValidAccount
    },
    {
        path: "/:pathMatching(.*)*", 
        name: "Not Found", 
        component: NotFound
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
