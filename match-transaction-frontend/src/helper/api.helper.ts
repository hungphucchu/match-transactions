import axios, { AxiosRequestConfig } from "axios";

class ApiHelper {
  private static backend_url = process.env.REACT_APP_BACKEND_URL;

  static async callApi(url: string, method: string = "GET", data: any = null) {
    try {
      const config: AxiosRequestConfig = {
        method: method,
        url: url,
        data: data,
      };
      const response = await axios(config);
      return response?.data ? response.data : response;
    } catch (error) {
      console.error("Error calling API:", error);
      throw error;
    }
  }

  static async getOrderTransactions(ordersId: string[]) {
    try {
      const url = `${ApiHelper.backend_url}/order/transactions`;
      const data = { ordersId: ordersId };
      return await ApiHelper.callApi(url, "POST", data);
    } catch (error) {
      console.error("Error fetching quiz session participants:", error);
      throw error;
    }
  }

  static async deleteOrderTransactions(ordersId: string[]) {
    try {
      const url = `${ApiHelper.backend_url}/order/transactions`;
      const data = { ordersId: ordersId };
      return await ApiHelper.callApi(url, "DELETE", data);
    } catch (error) {
      console.error("Error fetching quiz session participants:", error);
      throw error;
    }
  }

  static async matchTransactions(orders: any[], transactions: any[]) {
    try {
      const url = `${ApiHelper.backend_url}/match/transactions`;
      const data = { orders, transactions };
      return await ApiHelper.callApi(url, "POST", data);
    } catch (error) {
      console.error("Error matching transactions:", error);
      throw error;
    }
  }

  static async createMatchTransactions(dataInput: any[]) {
    try {
      const url = `${ApiHelper.backend_url}/match/transactions/create`;
      const data = { data: dataInput };
      return await ApiHelper.callApi(url, "POST", data);
    } catch (error) {
      console.error("Error matching transactions:", error);
      throw error;
    }
  }

  static async updateMatchTransactionsPreference(matchUpdateData: {
    customerName?: string;
    orderId?: string;
    product?: string;
  }) {
    try {
      const url = `${ApiHelper.backend_url}/match/transactions/preferences`;
      const data = matchUpdateData;
      return await ApiHelper.callApi(url, "POST", data);
    } catch (error) {
      console.error("Error updating match transactions:", error);
      throw error;
    }
  }
}

export default ApiHelper;
