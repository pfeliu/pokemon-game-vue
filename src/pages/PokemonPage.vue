<template>
  <h1 v-if="!pokemon">Wait, please</h1>
  <div v-else>
    <h1>Who is this pokémon?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />

    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />

    <template v-if="showAnswer" >
      <h2 class="fade-in">{{ message }}</h2>

      <button @click="newGame">New game</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture';
import PokemonOptions from '@/components/PokemonOptions';
import getPokemonOptions from '@/helpers/getPokemonOptions';

export default {
  components: { PokemonPicture, PokemonOptions },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: '',
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();

      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(selectedId) {
      this.showPokemon = true;
      this.showAnswer = true;

      if (selectedId === this.pokemon.id) {
        this.message = `Well done!!, it's ${this.pokemon.name}`;
      } else {
        this.message = `Ooops!!! no!!!, was ${this.pokemon.name}`;
      }
    },
    newGame() {
        this.pokemon = null
        this.showPokemon = false
        this.showAnswer = false
        this.pokemonArr = []
        this.mixPokemonArray()
    }
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>
