export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('PokemonDB', 1);
        request.onerror = (event) => {
            console.error('Database error:', event.target.errorCode);
            reject(event.target.errorCode);
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore('pokemonList', { keyPath: 'id' });
        };
    });
};

export const saveData = async (storeName, data) => {
    const db = await openDB();
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    data.forEach(item => store.put(item));
    return transaction.complete;
};

export const getData = async (storeName) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName]);
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = (event) => {
            reject(event.target.errorCode);
        };
    });
};
