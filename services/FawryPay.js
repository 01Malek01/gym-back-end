import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const {
  FAWRY_MERCHANT_CODE,
  FAWRY_SECURE_KEY,
  FAWRY_BASE_URL,
  FAWRY_DEBIT_MOBILE,
  FRONTEND

} = process.env;

class FawryPayService {
  constructor() {
    this.merchantCode = FAWRY_MERCHANT_CODE;
    this.secureKey = FAWRY_SECURE_KEY;
    this.baseUrl = FAWRY_BASE_URL || 'https://atfawry.fawrystaging.com/fawrypay-api/api/payments/init';
    this.debitMobile = FAWRY_DEBIT_MOBILE;
    this.returnUrl = FRONTEND
  }

  generateSignature(merchantCode, merchantRefNum) {
    return `${this.secureKey}:${merchantCode}:${merchantRefNum}`;
  }

  async createChargeRequest({
    merchantRefNum,
    customer,
    chargeItems,
    returnUrl = this.returnUrl,
    language = 'en-gb',
  }) {
    try {
      const chargeRequest = {
        merchantCode: this.merchantCode,
        merchantRefNum,
        customerMobile: customer.phoneNumber,
        customerEmail: customer.email,
        customerName: customer.name,
        customerProfileId: customer._id,
        language,
        chargeItems: chargeItems.map(item => ({
          itemId: item._id,
          description: item.description,
          price: item.price,
          quantity: item.quantity || 1,
        })),
        returnUrl,
        paymentMethod: 'MWALLET',
        debitMobileWalletNo: this.debitMobile,
        signature: this.generateSignature(this.merchantCode, merchantRefNum)
      };

      const response = await axios.post(`${this.baseUrl}`, chargeRequest);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  async getPaymentStatus(merchantRefNum) {
    try {
      const response = await axios.get(`${this.baseUrl}/status`, {
        params: {
          merchantCode: this.merchantCode,
          merchantRefNum,
          signature: this.generateSignature(this.merchantCode, merchantRefNum)
        }
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }
}

export default new FawryPayService();