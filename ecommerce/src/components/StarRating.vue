<script setup>

    import { computed } from 'vue'

    const props = defineProps({

        rating: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            default: 5
        },
      
    })

    const dots = computed(() => {
    const full = Math.floor(props.rating)
    const half = props.rating - full >= 0.5
    const empty = props.max - full - (half ? 1 : 0)

    return { full, half, empty }
    })
</script>


<template>
    <div class="dots">
        <!-- full -->
        <span
        v-for="n in dots.full"
        :key="'f' + n"
        class="dot filled"
        ></span>

        <!-- half -->
        <span
        v-if="dots.half"
        class="dot half"
        ></span>

        <!-- empty -->
        <span
        v-for="n in dots.empty"
        :key="'e' + n"
        class="dot"
        ></span>
    </div>
</template>


<style scoped>

    .star.active {
        color: var(--defaultColor); 
    }

    .dots {
        --dot-color: var(--defaultColor);
        display: flex;
        gap: 2px;
       align-items: center;
    }

    .dot {
        width: 1vw;
        height: 1vw;
        border-radius: 50%;
        border: 1px solid var(--dot-color);
        background: #e5e7eb00;
    }

        /* full */
    .dot.filled {
        background: var(--dot-color);
    }

        /* half */
    .dot.half {
        background: linear-gradient(
            to right,
            var(--dot-color) 50%,
            #e5e7eb00 50%
        );
    }

</style>
