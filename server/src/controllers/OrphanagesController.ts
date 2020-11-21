import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import orphanagesView from '../views/orphanages_view';

export default {
    async show(request: Request, response: Response) {

        const id = request.params.id;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id,{
            relations: ['images']
        });

        return response.status(200).json(orphanagesView.render(orphanage, request.hostname));
    },

    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.status(200).json(orphanagesView.renderMany(orphanages, request.hostname));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const requestImages = request.files as Express.Multer.File[];
        
        const images = requestImages.map(file=>{
            return {path: file.filename};
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === "true",
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false
        })

        const orphanagesRepository = getRepository(Orphanage);
    
        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
    
        return response.status(201).json(orphanage);
    }
};
