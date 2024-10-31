<template>
    <div v-if="pokemonList.length > 0">
      <div v-for="(group, groupIndex) in groupedPokemonList" :key="groupIndex" class="row justify-content-center align-items-center">
        <div class="col-sm-12 col-md-4 col-xl-4" v-for="(pokemon, index) in group" :key="index">
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
    computed: {
      groupedPokemonList() {
        const groups = [];
        for (let i = 0; i < this.pokemonList.length; i += 3) {
          groups.push(this.pokemonList.slice(i, i + 3));
        }
        return groups;
      }
    },
    components: {
      PokemonCard,
    },
  };
  </script>
  
  <style scoped>
  /* Adicione estilos personalizados aqui, se necessário */
  </style>
  