<script setup>
import {defineProps, onMounted} from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
    id: String,
    labels: Array,
    data: Array,
    color: {
        type: String,
        default: '#A0D26D'
    },
    tension: {
        type: Number,
        default: 0.5
    },
    titleDisplay: {
        type: Boolean,
        default: false
    },
    titleLabel: {
        type: String,
        default: ''
    },
    suggestedMin: {
        type: Number,
        default: 0
    },
    suggestedMax: {
        type: Number,
        default: 50
    },
    stepSize: {
        type: Number,
        default: 15
    },
    circular: {
        type: Boolean,
        default: false
    }
})

onMounted(() => {
    const ctx = document.getElementById(props.id)
    new Chart(ctx, {
            type: 'radar',
            data: {
                labels: props.labels,
                datasets: [
                    {
                        label: 'Vùng đánh giá',
                        data: props.data,
                        fill: false,
                        borderColor: props.color,
                        backgroundColor: 'rgba(160, 210, 109, 0.1)',
                        pointBackgroundColor: props.color,
                        pointBorderColor: '#FFF',
                        pointHoverBackgroundColor: '#FFF',
                        pointHoverBorderColor: props.color,
                        tension: props.tension
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: props.titleDisplay,
                        text: props.titleLabel
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: false
                        },
                        suggestedMin: props.suggestedMin,
                        suggestedMax: props.suggestedMax,
                        ticks: {
                            stepSize: props.stepSize
                        },
                        alignToPixels: true,
                        grid: {
                            circular: props.circular
                        }
                    }
                }
            }
        }
    )
})
</script>

<template>
    <canvas :id="id"/>
</template>
