import { getAll } from "../repositories/recommendationsRepository";

export async function selectRandomSongRepository() {
    const result = await getAll();   
    const randomize = ((Math.random()*100));
    if(result.length === 0) return null 
    if(randomize > 30){
        const filteredArray = result.filter((e)=>e.score > 10);
        const randomizeSong = Math.floor(Math.random() * filteredArray.length);
        if(filteredArray.length === 0){
            return result[randomizeSong];
        }else{
            return filteredArray[randomizeSong];
        }
    }else{
        const filteredArray = result.filter((e)=>e.score <= 10);
        const randomizeSong = Math.floor(Math.random() * filteredArray.length);
        if(filteredArray.length === 0){
            return result[randomizeSong];
        }else{
            return filteredArray[randomizeSong];
        }
    }
}