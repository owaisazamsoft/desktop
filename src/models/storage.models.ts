import api from "@/plugins/axios";
import { toFormData } from "@/plugins/hleper";
import { errorHandler } from "@/services/responseHandleService";
import * as XLSX from "xlsx";

export default class Storage {



  // Save data (overwrite)
  static async saveStorage(table:any, data:any) {
    try {
      localStorage.setItem(table, JSON.stringify(data));
    } catch (error) {
      console.error("LocalDB save error:", error);
      throw error;
    }
  }

  // Get data (returns array or empty array)
  static async getStorage(table:any) {
    try {
      const data = localStorage.getItem(table);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("LocalDB get error:", error);
      return [];
    }
  }

  // Add a new record
  static async addRecord(table:any, record:any) {
    try {
      const data = await this.getStorage(table);
      record.id = record.id || Date.now(); // unique id
      data.push(record);
      await this.saveStorage(table, data);
      return record;
    } catch (error) {
      console.error("LocalDB addRecord error:", error);
      throw error;
    }
  }


  static async updateRecord(table, updatedData) {

    try {
            if (!updatedData.id) {
            throw new Error("Record must have an id field for update");
            }

            const data = await this.getStorage(table);
            const index = data.findIndex(r => r.id === updatedData.id);
            if (index === -1) return null;

            // Merge the updatedData into existing record
            data[index] = { ...data[index], ...updatedData };

            await this.saveStorage(table, data);
            
            return data[index];

        } catch (error) {
            console.error("LocalDB updateRecord error:", error);
            throw error;
        }

    }

  // Delete a record by id
  static async deleteRecord(table:any, id:any) {
    try {
      const data = await this.getStorage(table);
      const filtered = data.filter(r => r.id !== id);
      await this.saveStorage(table, filtered);
      return filtered;
    } catch (error) {
      console.error("LocalDB deleteRecord error:", error);
      throw error;
    }
  }

  // Get one record by id
  static async getRecord(table:any, id:any) {
    try {
      const data = await this.getStorage(table);
      return data.find(r => r.id === id) || null;
    } catch (error) {
      console.error("LocalDB getRecord error:", error);
      return null;
    }
  }



}


