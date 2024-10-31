<template>
  <div class="form-group">
    <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" @input="handleChange">
  </div>
  <div v-if="pokemonList.length > 0">
    <div class="row justify-content-center align-items-center">
      <div class="col-sm-12 col-md-4 col-xl-4" v-for="(pokemon, index) in pokemonList" :key="index">
        <PokemonCard :pokemon="pokemon" />
      </div>
    </div>
  </div>
</template>

<script>
import PokemonCard from '@/components/PokemonCard';
import pokedexService from '@/services/pokedexService';
import { saveData, getData } from '@/services/indexedDBService';
import { errorToastr } from '@/services/helperService';

export default {
  name: 'HomeView',
  data() {
    return {
      pokemonList: [],
    };
  },
  async mounted() {
    this.mountByDb()
  },
  methods: {
    async mountByDb() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
      this.pokemonList = await getData('pokemonList');
      if (this.pokemonList.length === 0) {
        try {
          const detailedPokemonList = await pokedexService.getAllPokemonDetails();
          this.pokemonList = detailedPokemonList;
          await saveData('pokemonList', detailedPokemonList);
        } catch (error) {
          errorToastr(error.message);
        }
      }
      loader.hide();
    },
    handleChange(event) {
      const value = event.target.value

      if (value && value.length > 0) {
        this.pokemonList = this.pokemonList.filter(poke => poke.name.includes(value))
      } else {
        this.mountByDb()
      }
    }
  },
  components: {
    PokemonCard,
  },
};
</script>