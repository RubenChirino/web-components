async function getCats({ limit = 5 } = {}) {
    const response = await fetch(`https://cataas.com/api/cats?limit=${limit}`);

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
}

export { getCats };