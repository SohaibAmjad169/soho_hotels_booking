function getImageFromImages(name) {
    return new URL(`../assets/images/${name}`, import.meta.url).href;
}


export { getImageFromImages };
