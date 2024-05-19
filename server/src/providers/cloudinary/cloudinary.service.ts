import { Injectable } from "@nestjs/common";
import { v2 } from "cloudinary";

@Injectable()
export class CloudinaryService{
    async uploadImageHandler(file: Express.Multer.File, folderName: string){
        return new Promise((resolve,reject)=>{
            v2.uploader.upload_stream({
                folder: folderName,
            }, (error,result)=>{
                if(error) return reject(error);
                return resolve(result);
            }).end(file.buffer)
        });
    }

    async destroyImageHandler(coverId:string){
        return new Promise((resolve,reject)=>{
            v2.uploader.destroy(coverId,(error,result)=>{
                 if(error) return reject(error);
                 resolve(result);
            })
        })
    }
}