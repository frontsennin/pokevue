import { useToast } from 'vue-toast-notification';
const toast = useToast();

const successToastr = (message) => {
    toast.open({
        message,
        type: 'success',
        duration: 3000,
        position: 'top'
    });
}

const errorToastr = (message) => {
    toast.open({
        message,
        type: 'error',
        duration: 3000,
        position: 'top'
    });
}

const setObjectLocalStorage = (objName, data) => {
    console.log(data);
    localStorage.setItem(objName, JSON.stringify(data));
};

const getObjectLocalStorage = (objName) => {
    return JSON.parse(localStorage.getItem(objName));
};

const getPokemonTypeColor = (type) => {
    const colors = {
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC',
        normal: '#A8A878',
    };

    return colors[type.toLowerCase()] || '#A8A878';
}

export {
    successToastr,
    errorToastr,
    setObjectLocalStorage,
    getObjectLocalStorage,
    getPokemonTypeColor,
}