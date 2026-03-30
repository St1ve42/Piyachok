import { EmailTypeEnum } from '../enums/email-type.enum';

interface IEmailCombinedPayload {
  name: string;
  token: string;
}

export interface IEmailPayload {
  [EmailTypeEnum.ACTIVATION]: IEmailCombinedPayload;
  [EmailTypeEnum.FORGOT_PASSWORD]: IEmailCombinedPayload;
}
