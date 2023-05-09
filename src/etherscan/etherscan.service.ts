import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EtherscanService {
    private readonly API_KEY = process.env.ETHERSCAN_API_KEY;
    
    async getBalance(address: string): Promise<string> {
      const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${this.API_KEY}`;
      const response = await axios.get(url);
      
      if (response.data.status === '1') {
        return response.data.result;
      } else {
        throw new Error(response.data.message);
      }
    }

    async isWalletOld(address: string): Promise<boolean> {
      const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${this.API_KEY}`;
  
      try {
        const response = await axios.get(url);
        if (response.data.status === '1' && response.data.result.length > 0) {
          const firstTransactionTimestamp = parseInt(response.data.result[0].timeStamp, 10);
          const oneYearAgo = Date.now() / 1000 - 60 * 60 * 24 * 365;
  
          return firstTransactionTimestamp < oneYearAgo;
        }
      } catch (error) {
        console.error('Error fetching wallet transactions:', error);
      }
  
      return false;
    }
}
