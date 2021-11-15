import http from './http.common';

class DeudasApiService{
    getAll(){
        return http.get('/deudas');
    }
    get(id){
        return http.get(`/deudas/${id}`);
    }
    create(data){

        return http.post("/deudas", data)
    }

    update(id, data){
        return http.put(`/deudas/${id}`, data)
    }

    delete(id){
        return http.delete(`/deudas/${id}`)
    }
    
}

export default new DeudasApiService();
