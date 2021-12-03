export const getGif = async (category) => {

    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=bWo4v44iCpufFV5TQfL4zwsKdTHwBPUg&q=${category}&limit=10`;

        const response = await fetch(url);
        const { data } = await response.json();
    
        const gifts = data.map(img => {
            return {
                id: img.id,
                title: img.title,
                url: img.images?.downsized_medium.url
            }
        })
    
        return gifts
    } catch (error) {
        console.log(error)
        return []
    }
   
}