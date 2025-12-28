<template>
    <div v-if="loading" class="container">
        <div class="wrapper card space-between skeleton">
            
            <div class="flex-col">
                <div>
                    <div class="sk-img"></div>
                </div>
            </div>
            <div class="flex-col">
                <div>
                    <div class="sk-text"></div>
                </div>
            </div>
        </div>
    </div>

    <div v-else-if="products" class="container" :class="themeClass">
        <div class="bg-pattern"></div>
        <div class="wrapper card space-between">

            <div class="containerImage">
                <img :src="products.image" :alt="products.title" />
            </div>
            <div class="flex-col">
                <div>
                    <h2>{{ products.title }}</h2>
    
                    <div class="wrapper space-between border-bottom">
                        <span>{{ products.category }}</span>
                        
                        <div class="wrapper">
                            <span>{{ products.rating.rate }}/5</span>
                            <StarRating :rating="products.rating.rate" />
                        </div>
                    </div>
                </div>

                <p class="description">{{ products.description }}</p>
                
                <div class="bottom">
                    <h2 class="price">${{ products.price }}</h2>
                    
                    <div class="buttons">
                        <button> Buy Now!</button>
                        <button @click="nextProduct"> Next Product</button>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { getProduct } from '../API/APIProduct';
import { useRoute, useRouter } from 'vue-router';
import StarRating from '../components/StarRating.vue';


    const route =useRoute()
    const router=useRouter()

    const products = ref(null)
    const loading = ref(true)


    async function fetchProduct(id) {
        loading.value = true
        const MAX_ID = 20
         if (id < 1 || id > MAX_ID) {
            router.replace('/not-found')
            return
        }
        try {
            const data = await getProduct(id)
            products.value = data[id-1]
        }
        catch (e) {
            console.error(e)
        }
        finally {
            loading.value = false
        }
    }

    onMounted(()=>{
        fetchProduct(Number(route.params.id))
    })

    watch(() => 
    route.params.id,(newId) => {
             if (newId) fetchProduct(Number(newId))
        }
    )

    const themeClass = computed(()=>{
        if (!products.value) return ''

        const category = products.value.category.toLowerCase()

        if (category.includes("women's")) return 'theme-women'
        if (category.includes(`men's`)) return 'theme-men'

        return 'theme-default'
    })

    function nextProduct () {
        const currentId = Number(route.params.id)
        const maxId = 20
        const nextId = currentId >= maxId? 1 : (currentId+1)
        router.push(`/${nextId}`)
    }

    
</script>

<style  scoped>

    .container {
        --defaultBG:#dcdcdc;
        --antiDefaultColor:#ffff;
        --defaultColor:#1E1E1E;  

        height: 100vh; 
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background: 
        linear-gradient(
            to bottom, var(--defaultBG) 0%, var(--defaultBG) 60%, white 60%, white 100%
            );

        }


    .bg-pattern{
        position: absolute;
        inset: 0;
        height: 60%;
        background-image: url('/bg-pattern.svg');
        background-repeat: repeat;
        background-size: cover;
        pointer-events: none;
        z-index: 0;
    }


    .flex-col{
        display: flex;
        flex-direction: column;
    }
    .wrapper {
        display: flex;
        flex-direction: row;
        
    }

    .card {
        width: 80%;
        min-height: 70vh;
        border: 1px solid var(--defaultColor);
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        background-color: white;
        padding: 1rem;
        position: relative;
        z-index: 1;
    }


    .containerImage {
        min-width: 20vw;   
        max-height: 60vh;
        display: flex;
        margin: 5rem;
        align-items: center;       
        justify-content: center;   
        overflow: hidden;
        height: auto;
    }

    .containerImage img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .card h2{
        color: var(--defaultColor);
    }
    

    .space-between {
        justify-content: space-between;
    }

    .border-bottom{
        border-bottom: 1px solid black;
        padding-bottom: 1rem;
    }

    .description {
        font-size:3rem;
        margin-bottom: 10rem;
    }

    .price {
        border-top: 1px solid black;
        padding-top: 1rem;
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .buttons button {
        width: 45%;
        margin: 0 4% 5% 0;
        padding: 0.5rem;
        color: var(--defaultColor);
        border: 1px solid var(--defaultColor);
        background: transparent;
    }

    .buttons button:nth-child(1){
        background: var(--defaultColor);
        color: var(--antiDefaultColor);
    }

    .buttons button:nth-child(1):hover {
        color: var(--defaultColor);
        background: var(--antiDefaultColor);
    }
    .buttons button:nth-child(2):hover {
        background: var(--defaultColor);
        color: var(--antiDefaultColor);
    }

    .bottom{
        margin-top: auto;
    }

    .container.theme-men {
        --defaultBG:#D6E6FF;
        --antiDefaultColor:#ffff;
        --defaultColor:#002772;
    }
    .container.theme-women {
        --defaultBG:#FDE2FF;
        --antiDefaultColor:#ffff;
        --defaultColor:#720060;
    }

    .skeleton {
        pointer-events: none;
    }

    .skeleton div {
        background: #e5e7eb;
        border-radius: 4px;
        animation: shimmer 1.2s infinite ease-in-out;
    }

    /* image */
    .sk-img {
        width: 22rem;
        height: 100%;
    }

    /* title */
    .sk-text {
        width: 30rem;
 
    }


    /* shimmer */
    @keyframes shimmer {
        0% { opacity: .4 }
        50% { opacity: 1 }
        100% { opacity: .4 }
    }
    

</style>