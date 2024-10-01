import { Injectable } from '@nestjs/common';
import { CompositeKey } from 'src/dto/composite.key';
import { MatchType, UpdateMatchedRecordRequest } from 'src/dto/matched.record.dto';
import { MatchedRecord, Order, Transaction } from 'src/interface/common.interface';
import { LogService } from './log.service'; 
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class MatchTransactionService {
  private matches: Record<string, MatchType>;
  private similarCharsMap: Record<string, string[]>;

  constructor(
    private readonly logService: LogService, 
    private readonly configService: ConfigService 
  ) {
    this.matches = this.configService.matches;
    this.similarCharsMap = this.configService.similarCharsMap;
  }


  updateMatchPreference(updateMatchedRecordRequest: UpdateMatchedRecordRequest) {
    const { customerName, orderId, product } = updateMatchedRecordRequest;

    if (customerName) {
      this.matches.customerName = customerName; 
    }

    if (orderId) {
      this.matches.orderId = orderId; 
    }

    if (product) {
      this.matches.product = product;
    }

    this.logService.log(JSON.stringify(this.matches));
  }

  private areSimilarChars(char1: string, char2: string): boolean {
    if (char1 === char2) return true; 
    return this.similarCharsMap[char1]?.includes(char2) ?? false; 
  }

  private wordCompareScore(str1: string, str2: string): number {
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);

    let commonWords = 0;
    const maxWord = Math.max(words1.length, words2.length);

    words1.forEach(word1 => {
      words2.forEach(word2 => {
        if (this.areSimilarChars(word1, word2) || this.calculateWordSimilarity(word1, word2) > 50) {
          commonWords++;
        }
      });
    });

    const tokenOverlapScore = (commonWords / maxWord) * 100;
    this.logService.log(`Token overlap score: ${tokenOverlapScore}`);
    return tokenOverlapScore;
  }

  private charCompareScore(str1: string, str2: string):number{

    let commonChars = 0;
    const maxLength = Math.max(str1.length, str2.length);

    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
      if (this.areSimilarChars(str1[i], str2[i])) {
        commonChars++;
      }
    }

    const charOverlapScore = (commonChars / maxLength) * 100;
    this.logService.log(`Character overlap score: ${charOverlapScore}`);
    return charOverlapScore;
  }

  // Calculate similarity between two strings
  private calculateStringSimilarity(key: string, str1: string, str2: string): number {
    this.logService.log(`Comparing "${str1}" with "${str2}"`);

    // Exact match
    if (str1 === str2) {
      return 100; 
    }

    // if match type is full match then return 0 score
    if (this.matches[key] === MatchType.FULL_MATCH) {
      return 0;
    }
    
    const tokenOverlapScore = this.wordCompareScore(str1, str2);

    if (tokenOverlapScore > 50) return tokenOverlapScore;

    const charOverlapScore = this.charCompareScore(str1, str2);

    return Math.max(tokenOverlapScore, charOverlapScore);
  }

  // Compare tokens based on character similarity
  private calculateWordSimilarity(word1: string, word2: string): number {
    let commonChars = 0;
    const maxLength = Math.max(word1.length, word2.length);

    for (let i = 0; i < Math.min(word1.length, word2.length); i++) {
      if (this.areSimilarChars(word1[i], word2[i])) {
        commonChars++;
      }
    }

    return (commonChars / maxLength) * 100;
  }

  // Calculate the match score between an order and a transaction
  private calculateMatchScore(order: Order, transaction: Transaction): number {
    this.logService.log(`Calculating match score for order: ${order.customerName} and transaction: ${transaction.customerName}`);

    const nameScore = this.calculateStringSimilarity("customerName", order.customerName, transaction.customerName);
    const idScore = this.calculateStringSimilarity("orderId", order.orderId, transaction.orderId);
    const productScore = this.calculateStringSimilarity("product", order.product, transaction.product);

    const totalScore = (nameScore * 0.33) + (idScore * 0.33) + (productScore * 0.33);
    this.logService.log(`Name score: ${nameScore}, ID score: ${idScore}, Product score: ${productScore}`);
    this.logService.log(`Total score: ${totalScore}`);
    return totalScore;
  }


  matchOrdersAndTransactions(
    orders: Order[],
    transactions: Transaction[],
    similarityThreshold: number = 70
  ): MatchedRecord[] {
    const transactionMap = new Map<string, Transaction[]>();

    transactions.forEach((txn) => {
      const key = new CompositeKey(
        txn.customerName, txn.orderId, txn.date, txn.product, txn.price
      ).hashCode();

      if (!transactionMap.has(key)) {
        transactionMap.set(key, []);
      }
      transactionMap.get(key)!.push(txn);
    });

    return orders.map((order) => {
      const orderKey = new CompositeKey(
        order.customerName, order.orderId, order.date, order.product, order.price
      ).hashCode();

      const exactMatches = transactionMap.get(orderKey) || [];

      if (exactMatches.length > 0) {
        this.logService.log(`Exact matches found for order: ${order.customerName}, ID: ${order.orderId}`);
        return {
          order,
          transactions: exactMatches,
        };
      }

      const matchedTransactions = transactions.filter((txn) => {
        if (order.date === txn.date && order.price === txn.price) {
          const matchScore = this.calculateMatchScore(order, txn);
          if (matchScore >= similarityThreshold) {
            return true;
          }
        }
        return false;
      });

      return {
        order,
        transactions: matchedTransactions,
      };
    });
  }
}
