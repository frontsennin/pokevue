<template>
    <div class="poke-card" v-if="pokemon">
        <div class="row text-center">
            <div class="col">
                <div class="poke-image-section" :style="pokemonStyle">
                    <img :src="pokemon.sprites.front_default" class="poke-image" :alt="pokemon.name + '-image'">
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col">
                <strong>{{ capitalizeFirstLetter(pokemon.name) }}</strong>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <strong>Type: </strong> <span>{{ this.pokemon.types[0].type.name }}</span>
            </div>
        </div>
        <div class="row" v-for="({ stat, base_stat }, index) in pokemon.stats" :key="index">
            <div class="col">
                <strong>{{ changeStatName(stat.name) }}: </strong> <span>{{ base_stat }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getPokemonTypeColor } from '@/services/helperService'

export default {
    name: 'PokemonCard',
    props: {
        pokemon: {
            type: Object,
            required: true,
        },
    },
    computed: {
        pokemonStyle() {
            const pokemonType = this.pokemon.types[0].type.name;
            return {
                backgroundColor: getPokemonTypeColor(pokemonType),
            };
        }
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        changeStatName(name) {
            let splited = ''
            if (name.includes('-')) {
                splited = name.split('-')
            }
    
            if (splited.length > 1) {
                return `${this.capitalizeFirstLetter(splited[0])} ${this.capitalizeFirstLetter(splited[1])}`
            }
            return this.capitalizeFirstLetter(name)
        }
    },
};
</script>
