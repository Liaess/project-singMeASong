import joi from "joi";

const postSongSchema = joi.object({
    name: joi.string().required(),
    youtubeLink: joi.string().uri().required()
});

export { postSongSchema }