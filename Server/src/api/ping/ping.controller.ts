import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { json } from 'body-parser';

@Controller('ping')
export class PingController {

    @Get()
    ping(@Res() res: Response) {
        console.log('Ping');
        const value = {message: 'ping'};
        res.send(value);
    }
}
