<template>
    <div class="container" >
        <div class="wrapper card space-between">
            <img src="/public/sad-face.png" class="icon" />
            <div>
                <h1>This Product Unavailable to show</h1>
                <div>
                    <button @click="GoToProduct">Next Product</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

    const Router = useRouter()
    
    function GoToProduct () {
        Router.push('/1')
    }
</script>

<style  scoped>

    .container {
        --defaultBG:#dcdcdc;
        --antiDefaultColor:#ffff;
        --defaultColor:#1E1E1E;  

        --patternColor: #dcdcdc92;

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
        place-items: center;
        justify-content: center;

    }

    .card img {
        position: absolute;
        left: 55%;
        top: 20%;
        transform: translate(-50%);
        pointer-events: none;
    }
    .card button {
        width: 100%;
        padding: 1%;
        z-index: 10;
    }

    .card button:hover {
        background-color: var(--defaultColor);
        color: var(--antiDefaultColor);
    }

    

</style>