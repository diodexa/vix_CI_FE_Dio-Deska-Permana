<script setup>
import { onMounted, ref } from 'vue'
import { getProduct } from '../API/APIProduct'
import StarRating from '../components/StarRating.vue'


const products = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    products.value = await getProduct()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})


</script>

<template>
  <div class="container">
    <div v-for="item in products" :key="item.id" class="wrapper card"> 
        <div class="card-body">
            <div class="picture">
                <img :src="item.image"/>
            </div>
            <div class="text">
                <h1 class="card-title ">{{ item.title }}</h1>
                <StarRating :rating="item.rating.rate" />
                <span>{{ item.rating.rate }} / 5 </span>
                <h2 class="card-price">${{ item.price }}</h2>
            </div>
        </div>
        <button>More Detail</button>
    </div>
  </div>
</template>

<style>
    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
        margin: 0;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
    }
    .card {
        width: 250px;
        border: 2px solid teal;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        text-align: center;
        background-color: white;
        padding: 1rem;
        position: relative;
        transition: 1s;
    }

    .picture {
        height: 250px;              
        display: flex;
        align-items: center;       
        justify-content: center;   
        overflow: hidden;
    }

    .picture img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
    .card-body {
        padding: 0;
    }  
    
    .text {
        display: flex;
        flex-direction: column;
        height: 200px;  
    }
    .card-title {
        font-size: 1.7vw;
         display: -webkit-box;
        -webkit-box-orient: vertical;
        line-clamp: 2;          
        -webkit-line-clamp: 2; 
        overflow: hidden;
        margin: 0;
        line-height: 1.2; 
        min-height: calc(1.2em * 2);
        color: teal;
    }

    .card-price {
        font-size: 2vw;
       
        color: teal;
    }

    .card button {
        position: absolute;
        background: teal;
        color: white;
        width: 100%;
        bottom: 0;
        left: 0;
    }

    .card button:hover {
        background: white;
        color: teal;
        border: 2px solid teal ;
    }

    .card:hover {
        transform: scale(1.1);
        z-index: 2;
    }


</style>
