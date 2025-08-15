<script setup>
import Wrapper from './components/Wrapper.vue'
import Header from './components/Header.vue'
import Container from './components/Container.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
import SearchIcon from './icons/SearchIcon.vue'

const items = [
  {
    id: 1,
    author: 'Enthrallment',
    title: "AGAINST THE WILL TO LIVE 'Macabre Universe Embrace'",
    price: '$4.99',
    imageUrl: '/albums/1.jpg',
  },
  {
    id: 2,
    author: 'Blood Everywhere',
    title: 'Enthusiasm',
    price: '$3',
    imageUrl: '/albums/2.jpg',
  },
  {
    id: 3,
    author: 'Auld',
    title: "After Today/Everyone Else's Brilliant Answers",
    price: '$2',
    imageUrl: '/albums/3.jpg',
  },
  {
    id: 4,
    author: 'Orbital Decay',
    title: 'broken broadcast',
    price: '$4.99',
    imageUrl: '/albums/4.jpg',
  },
  {
    id: 5,
    author: 'Seconds Before',
    title: 'Further Destinations',
    price: '$4.99',
    imageUrl: '/albums/5.jpg',
  },
  {
    id: 6,
    author: 'chaoscollectors',
    title: 'The Lost Art Of Communicating',
    price: '$5',
    imageUrl: '/albums/6.jpg',
  },
  {
    id: 7,
    author: 'Mania',
    title: 'Nude Gay Fight for Sexual Domination EP',
    price: '$3.99',
    imageUrl: '/albums/7.jpg',
  },
  { id: 8, author: 'Sharp Shock', title: 'Youth Club ', price: '$8', imageUrl: '/albums/8.jpg' },
  {
    id: 9,
    author: 'Shiny Red Nothing',
    title: 'Silk Of Red Esteem (Redux) ',
    price: '$8',
    imageUrl: '/albums/9.jpg',
  },
  {
    id: 10,
    author: 'Absolute',
    title: 'Tonal Imagery ',
    price: '$8',
    imageUrl: '/albums/10.jpg',
  },
]
</script>

<template>
  <!-- <Drawer /> -->
  <Wrapper>
    <Header />
    <Container>
      <div class="flex justify-between mb-4">
        <h2 class="text-2xl font-semibold my-auto">All items</h2>
        <div class="space-y-2">
          <div class="relative">
            <SearchIcon class="absolute top-1 left-1" />
            <input
              class="border border-neutral-200 outline-none focus:ring focus:ring-neutral-300 rounded-lg py-0.5 pl-8 pr-1.5"
              type="text"
              placeholder="Search something..."
            />
          </div>
          <select
            class="border border-neutral-200 rounded-lg px-1.5 py-1 outline-none focus:ring focus:ring-neutral-300"
          >
            <option value="all">Default</option>
            <option value="highPrice">High price</option>
            <option value="lowPrice">Low price</option>
          </select>
        </div>
      </div>
      <CardList :items="items" />
    </Container>
  </Wrapper>
</template>
