<script setup>
import Wrapper from './components/Wrapper.vue'
import Header from './components/Header.vue'
import Container from './components/Container.vue'
import CardList from './components/CardList.vue'
</script>

<template>
  <Wrapper>
    <Header />
    <Container>
      <h2 class="text-2xl font-semibold mb-4">All items</h2>
      <CardList />
    </Container>
  </Wrapper>
</template>

<style scoped></style>
