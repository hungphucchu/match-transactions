import { Injectable } from '@nestjs/common';
import { CompositeKey } from 'src/dto/composite.key';
import { MatchType, UpdateMatchedRecordRequest } from 'src/dto/matched.record.dto';
import { MatchedRecord, Order, Transaction } from 'src/interface/common.interface';
import { LogService } from './log.service'; // Import the LogService

@Injectable()
export class MatchTransactionService {
  constructor(private readonly logService: LogService) {} // Inject LogService

  private matches: Record<string, MatchType> = {
    customerName: MatchType.PARTIAL_MATCH,
    orderId: MatchType.PARTIAL_MATCH,
    product: MatchType.PARTIAL_MATCH,
  };

  // Define a mapping of visually similar characters
  private similarCharsMap: Record<string, string[]> = {
    'b': ['8'],
    '8': ['b'],
    '1': ['I', 'L', 'l'],
    'I': ['1', 'L', 'l'],
    'L': ['1', 'I', 'l'],
    'l': ['1', 'I', 'L'],
    '0': ['O', 'Q'],
    'O': ['0', 'Q'],
    'Q': ['0', 'O'],
    '5': ['S'],
    'S': ['5'],
    '2': ['Z'],
    'Z': ['2'],
    '6': ['G'],
    'G': ['6'],
    '9': ['g'],
    'g': ['9'],
    'C': ['G'],
    'B': ['8', '3'],
    '3': ['B'],
    'u': ['v'],
    'v': ['u'],
    'n': ['m'],
    'm': ['n'],
    'a': ['o', 'e'],
    'o': ['a', 'e'],
    'e': ['a', 'o'],
    'P': ['R'],
    'R': ['P'],
    'V': ['W', 'Y'],
    'W': ['V'],
    'Y': ['V'],
    'T': ['7'],
    '7': ['T'],
  };

  updateMatchPreference(updateMatchedRecordRequest: UpdateMatchedRecordRequest) {
    const { customerName, orderId, product } = updateMatchedRecordRequest;

    if (customerName) {
      // Update the match type for customerName
      this.matches.customerName = customerName; // Assuming customerName is of type MatchType
    }

    if (orderId) {
      // Update the match type for orderId
      this.matches.orderId = orderId; // Assuming orderId is of type MatchType
    }

    if (product) {
      // Update the match type for product
      this.matches.product = product; // Assuming product is of type MatchType
    }

    // Replace console.log with logService.log
    this.logService.log(JSON.stringify(this.matches));
  }

  // Check if two characters are visually similar
  private areSimilarChars(char1: string, char2: string): boolean {
    if (char1 === char2) return true; // Exact match
    return this.similarCharsMap[char1]?.includes(char2) ?? false; // Check similar chars
  }

  // Calculate similarity between two strings
  private calculateStringSimilarity(key: string, str1: string, str2: string): number {
    this.logService.log(`Comparing "${str1}" with "${str2}"`);

    if (str1 === str2) {
      this.logService.log('Exact match, score: 100');
      return 100; // Exact match
    }

    if (this.matches[key] === MatchType.FULL_MATCH) {
      return 0;
    }

    const tokens1 = str1.split(/\s+/); // Split by space
    const tokens2 = str2.split(/\s+/);

    let commonTokens = 0;
    const maxTokens = Math.max(tokens1.length, tokens2.length);

    tokens1.forEach(token1 => {
      tokens2.forEach(token2 => {
        if (this.areSimilarChars(token1, token2) || this.calculateTokenSimilarity(token1, token2) > 50) {
          commonTokens++;
        }
      });
    });

    const tokenOverlapScore = (commonTokens / maxTokens) * 100;
    this.logService.log(`Token overlap score: ${tokenOverlapScore}`);

    if (tokenOverlapScore > 50) return tokenOverlapScore;

    let commonChars = 0;
    const maxLength = Math.max(str1.length, str2.length);

    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
      if (this.areSimilarChars(str1[i], str2[i])) {
        commonChars++;
      }
    }

    const charOverlapScore = (commonChars / maxLength) * 100;
    this.logService.log(`Character overlap score: ${charOverlapScore}`);

    return Math.max(tokenOverlapScore, charOverlapScore);
  }

  // Compare tokens based on character similarity
  private calculateTokenSimilarity(token1: string, token2: string): number {
    let commonChars = 0;
    const maxLength = Math.max(token1.length, token2.length);

    for (let i = 0; i < Math.min(token1.length, token2.length); i++) {
      if (this.areSimilarChars(token1[i], token2[i])) {
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

    const totalScore = (nameScore * 0.4) + (idScore * 0.4) + (productScore * 0.2);
    this.logService.log(`Name score: ${nameScore}, ID score: ${idScore}, Product score: ${productScore}`);
    this.logService.log(`Total score: ${totalScore}`);
    return totalScore;
  }

  // Match orders to transactions with a similarity threshold
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
