import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { CrearCompraDto } from './dto/create-compra.dto';

@Controller('compra')
export class CompraController {

    constructor(
        private readonly mailService: MailService,
    ) { }

    @Post()
    async crearCompra(
        @Body() compraData: CrearCompraDto
    ) {        
        try {
            const result = await this.mailService.EnviarEmailDeCompra(compraData);

            return {
                success: true,
                message: 'Confirmación de compra enviada correctamente a ' + compraData.email,
                messageId: result.messageId,
            };
        } catch (error) {
            console.error('Error en crearCompra:', error);
            throw new HttpException(
                {
                    success: false,
                    message: 'Error al enviar el correo electrónico',
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

}
