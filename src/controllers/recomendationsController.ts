import { Request, Response } from "express";
import { postSongSchema } from "../schemas/recommendationSchemas";
import { checkYoutubeLink, createSong } from "../repositories/recomendationsRepository";

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

export { addSong }