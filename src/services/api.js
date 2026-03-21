import axios from "axios"

const API_KEY = import.meta.env.VITE_APIKEY_GOOGLEBOOKS;

export const apiBooksUrl = {
  singleBook: (isbn) => `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${API_KEY}`,
  newBooks: `https://www.googleapis.com/books/v1/volumes?q=subject:programming&orderBy=newest&maxResults=20&key=${API_KEY}`,
  searchBooks: (name, page) => `https://www.googleapis.com/books/v1/volumes?q=${name}&startIndex=${page ? (parseInt(page) - 1) * 10 : 0}&maxResults=10&key=${API_KEY}`
};
/**api vieja */
/**
 *  singleBook: 'https://api.itbook.store/1.0/books',
  newBooks: 'https://api.itbook.store/1.0/new',
  searchBooks: (name, page) => `https://api.itbook.store/1.0/search/${name}/${page}`
 * 
 */
//"http://localhost:3001/api"
//"https://bookstore-node-oor6.onrender.com/api"
export const apiUrl = axios.create({
  baseURL: "https://bookstore-node-oor6.onrender.com/api"
})
