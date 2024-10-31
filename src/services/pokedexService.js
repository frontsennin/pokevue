import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        // Tratamento de erros
        console.error('API Error:', error.response);
        return Promise.reject(error);
    }
);

const pokedexService = {
    async getAllPokemonDetails() {
        try {
            // Faz a requisição inicial para obter a lista de Pokémons
            const response = await apiClient.get('/pokemon?limit=2000');
            const basicPokemonList = response.data.results;

            const detailedPokemonList = await Promise.all(
                basicPokemonList.map(async (pokemon) => {
                    const pokemonDetails = await apiClient.get(pokemon.url);
                    return pokemonDetails.data;
                })
            );

            return detailedPokemonList;
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
            throw error;
        }
    },
    getPokemonById(id) {
        return apiClient.get(`/pokemon/${id}`)
    },
    getPokemonByName(name) {
        return apiClient.get(`/pokemon/${name}`)
    }
};

export default pokedexService;