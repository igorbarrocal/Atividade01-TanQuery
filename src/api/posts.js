import axios from "axios";

//Função que será usada pelo Tanstack Query
export const fetchPosts = async () =>{
    const response = await axios.get("https://689342c6c49d24bce86a0c75.mockapi.io/users");
    return response.data;//Retorna os dados
}

//Função para criar um novo usuário
export const createUser = async (newUser) =>{
    const response = await axios.post("https://689342c6c49d24bce86a0c75.mockapi.io/users", newUser);
    return response.data;//Retorna os dados do novo usuário
}