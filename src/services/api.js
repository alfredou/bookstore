import axios from "axios"

const API_KEY = import.meta.env.VITE_APIKEY_GOOGLEBOOKS;

export const apiBooksUrl = {
  singleBook: (id) => {
    // Si es puramente numérico (ISBN), buscamos por isbn
    if (/^\d[\d-]*\d$/.test(id)) {
      return `https://www.googleapis.com/books/v1/volumes?q=isbn:${id}&key=${API_KEY}`;
    }
    // Si tiene letras (ID interno de Google Books), usamos el endpoint directo del volumen
    return `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`;
  },
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
//api desplegada en aws lambda, solo responde a la url desplegada
//https://cktbt1bdm0.execute-api.us-east-1.amazonaws.com/
export const apiUrl = axios.create({
  baseURL: "https://cktbt1bdm0.execute-api.us-east-1.amazonaws.com/api",
  headers: {
    'x-client-source': 'bookstore-react-app'
  }
})
