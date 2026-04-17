import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailTypeEnum } from './enums/email-type.enum';
import { IEmailPayload } from './interfaces/IEmailPayload';
import { EmailConst } from './consts/email.const';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail<T extends EmailTypeEnum>(
        type: T,
        to: string,
        context: IEmailPayload[T],
    ) {
        const { subject, template } = EmailConst[type];
        await this.mailerService.sendMail({
            to,
            subject,
            template,
            context,
        });
    }
}
