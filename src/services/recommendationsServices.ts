import { getAll } from "../repositories/recommendationsRepository";

export async function selectRandomSongRepository() {
    const result = await getAll();   
    const randomize = ((Math.random()*100));
    if(result.length === 0) return null
    let filteredArray; 
    if(randomize > 30){
        filteredArray = result.filter((e)=>e.score > 10);
        const randomizeSong = Math.floor(Math.random() * filteredArray.length);
        return filteredArray[randomizeSong];
    }else{
        filteredArray = result.filter((e)=>e.score <= 10);
        const randomizeSong = Math.floor(Math.random() * filteredArray.length);
        return filteredArray[randomizeSong];
    }
}