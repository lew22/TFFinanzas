import http from './http.common';

class MonedaApiService{

    getAll(){
        return http.get('/moneda');
    }
    get(id){
        return http.get(`/moneda/${id}`);
    }
    create(data){

        return http.post("/moneda", data)
    }

    update(id, data){
        return http.put(`/moneda/${id}`, data)
    }

    delete(id){
        return http.delete(`/moneda/${id}`)
    }


}

export default new MonedaApiService();
