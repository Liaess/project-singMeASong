import { Request, Response } from "express";
import { postSongSchema } from "../schemas/recommendationSchemas";
import { checkYoutubeLink, createSong, findSong, increaseFunction, decreaseFunction } from "../repositories/recommendationsRepository";

async function addSong(req: Request, res: Response) {
    const { name, youtubeLink } = req.body
    const value = postSongSchema.validate({name: name, youtubeLink: youtubeLink});
    if(value.error) return res.sendStatus(400);
    try{
        const checkLink = await checkYoutubeLink(youtubeLink);
        if(checkLink.length !==0) return res.sendStatus(409);
        await createSong(name, youtubeLink);
        res.sendStatus(201)
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

async function increaseScore(req: Request, res: Response) {
    const id:number = parseInt(req.params.id);
    try{
        const songFound = await findSong(id);
        if(songFound){
            await increaseFunction(id)
            res.sendStatus(200);
        }else{
            res.sendStatus(401);
        }
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

async function decreaseScore(req: Request, res: Response) {
    const id:number = parseInt(req.params.id);
    try{
        const songFound = await findSong(id);
        if(songFound){
            await decreaseFunction(id)
            res.sendStatus(200);
        }else{
            res.sendStatus(401);
        }
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export { addSong, increaseScore, decreaseScore }