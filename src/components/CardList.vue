<script setup>
import Card from './Card.vue'
</script>

<template>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <Card
      title='AGAINST THE WILL TO LIVE "Macabre Universe Embrace"'
      image-url="/albums/1.jpg"
      price="4.99"
      :is-added="true"
    />
    <Card title="Enthusiasm" image-url="/albums/2.jpg" price="4.99" :is-added="false" />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
  </div>
</template>
