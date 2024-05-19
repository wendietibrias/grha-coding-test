import { HttpException, InternalServerErrorException } from "@nestjs/common";

function catchErrorHandling(err:any){
    const { response } = err;
    if(response) {
        throw new HttpException(response.message,response.statusCode);
    }

    throw new InternalServerErrorException(err.message);
}

export default catchErrorHandling;