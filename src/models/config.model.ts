import api from "@/plugins/axios";
import { errorHandler } from "@/services/responseHandleService";


export default class Config {


    static readonly Status = [
        { title: 'Active', value: 1 },
        { title: 'Deactive', value: 0 }, // Note: common spelling is "Deactivated" or "Inactive"
    ] as const;

    static readonly Sorts = [
        10, 20, 50, 100
    ] as const;


    /**
     * Fetches the Get All.
     */
       static async get(options: {
            search?: string;
            page?: number;
            length?: number;
            id?: number;
        }): Promise<{
            data: unknown[];
            recordsFiltered: number;
            recordsTotal: number;
            page: number;
            length: number;
            last_page: number;
            offset: number;
        }> {

            try {
                const res = await api.get("/api/master/getAuctionCenter", { params: options });
                return res.data;
            } catch (e) {
                throw await errorHandler(e);
            }

    }
    
    
}
