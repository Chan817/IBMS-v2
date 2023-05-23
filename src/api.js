import axios from 'axios';
const url = "/api/order";

export default class API {
    // to get all the orders from the server
    static async getAllOrder(){
        const res = await axios.get(url);
        return res.data;
    }

    // to get single order by id
    static async getOrderByID(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }

    // to insert order into database
    static async addOrder(post){
        const res = await axios.post(url, post);
        return res.data;
    }

    // to update order into database
    static async updateOrder(id, post){
        const res = await axios.patch(`${url}/${id}`, post);
        return res.data;
    }
    
    // to delete an order
    static async deleteOrder(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}