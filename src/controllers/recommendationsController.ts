import { Request, Response } from "express";
import { postSongSchema, idSchema, amountSchema } from "../schemas/recommendationSchemas";
import { checkYoutubeLink, createSong, findSong, increaseFunction, decreaseFunction, getSearchedAmount } from "../repositories/recommendationsRepository";
import { selectRandomSongRepository } from "../services/recommendationsServices";

export async function addSong(req: Request, res: Response) {
    const { name, youtubeLink } = req.body
    const value = postSongSchema.validate({name: name, youtubeLink: youtubeLink});
    if(value.error) return res.sendStatus(400);
    try{
        const checkLink = await checkYoutubeLink(youtubeLink);
        if(checkLink.length !==0) return res.sendStatus(409);
        await createSong(name, youtubeLink);
        res.sendStatus(201);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export async function handleScore(req: Request, res: Response) {
    const id:number = parseInt(req.params.id);
    const value = idSchema.validate({id: id});
    if(value.error) return res.sendStatus(400);
    try{
        const songFound = await findSong(id);
        if(songFound){
            if(req.route.path === "/recommendations/:id/upvote"){
                await increaseFunction(id);
                res.sendStatus(200);
            }
            if(req.route.path === "/recommendations/:id/downvote"){
                await decreaseFunction(id);
                res.sendStatus(200);
            }
        }else{
            res.sendStatus(401);
        }
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export async function getRandomSong(req: Request, res: Response) {
    try{
        const song = await selectRandomSongRepository();
        if(song === null) return res.sendStatus(404);
        res.send(song);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
}

export async function searchAmount(req: Request, res: Response) {
    const amount:number = parseInt(req.params.amount);
    const value = amountSchema.validate({amount: amount});
    if(value.error) return res.sendStatus(400);
    res.send(await getSearchedAmount(amount));
}