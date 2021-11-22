import http from './http.common';

class InicialesApiService{

    getAll(){
        return http.get('/datosiniciales');
    }
    get(id){
        return http.get(`/datosiniciales/${id}`);
    }
    create(data){

        return http.post("/datosiniciales", data)
    }

    update(id, data){
        return http.put(`/datosiniciales/${id}`, data)
    }

    delete(id){
        return http.delete(`/datosiniciales/${id}`)
    }

}

export default new InicialesApiService();
