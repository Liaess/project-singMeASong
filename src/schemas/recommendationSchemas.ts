import joi from "joi";

export const postSongSchema = joi.object({
    name: joi.string().required(),
    youtubeLink: joi.string().uri().required()
});

export const IdSchema = joi.object({
    id: joi.number().positive().integer().required()
})