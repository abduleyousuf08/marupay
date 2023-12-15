import { PaymentCtx, PaymentOptions } from '../types';
import * as API from './api';

export const prepareRequest = (paymentType: "request" | "credit", data: PaymentOptions, ctx: PaymentCtx, referenceId: string): API.PurchaseData | API.PurchasePaymentData | API.CreditPaymentData => {
    var requestData: API.PurchaseData;

    if (paymentType === 'request') {
        requestData = {
            apiKey: ctx.apiKey,
            edahabNumber: data.accountNumber,
            amount: data.amount,
            currency: data.currency,
            agentCode: ctx.merchantId,
            description: data.description,
        } as API.PurchasePaymentData;
    } else if (paymentType === 'credit') {
        requestData = {
            apiKey: ctx.apiKey,
            phoneNumber: data.accountNumber,
            transactionAmount: data.amount,
            transactionId: referenceId,
            currency: data.currency,
            description: data.description,
        } as API.CreditPaymentData;
    } else {
        throw new Error(`Unexpected paymentType: ${paymentType}`);
    }

    return requestData;
};
