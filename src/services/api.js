import axios from "axios"

export const apiBooksUrl = {
  singleBook: 'https://api.itbook.store/1.0/books',
  newBooks: 'https://api.itbook.store/1.0/new',
  searchBooks: (name, page) => `https://api.itbook.store/1.0/search/${name}/${page}`
};
//"http://localhost:3001/api"
//"https://bookstore-node-oor6.onrender.com/api"
export const apiUrl = axios.create({
  baseURL: "http://localhost:3001/api"
})
