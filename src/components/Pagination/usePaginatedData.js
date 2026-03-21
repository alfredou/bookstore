import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useBookContext } from "../../context/DataBooksContext";
import useFetch from "../../hooks/useFetch";
import { apiBooksUrl } from "../../services/api";

export default function usePaginatedData (){
    const { bookList, newbooks, setNewBooks, setBookList} = useBookContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('q') || "";
    const page = parseInt(searchParams.get('p')) || 1;

    //const urlList = (page && name) ? apiBooksUrl.searchBooks(name, page) : apiBooksUrl.newBooks
    const urlList = (page && name) ? apiBooksUrl.searchBooks(name, page) : apiBooksUrl.newBooks
    const { data, loading, error, hasMore, text } = useFetch(urlList)
    const { books } = data
    //arreglar para mañana que todo funcione

   useEffect(() => {
      setNewBooks(books)
   }, [data, setNewBooks])

   useEffect(()=>{
       if(bookList?.length > 0){
           setBookList(prevBookList => prevBookList.concat(books));
          } 
          //console.log("pageNumber",page)
      }, [data])
    
    const updateName = (newName)=>{
        if (newName) {
            setSearchParams({ q: newName, p: 1 });
        } else {
            setSearchParams({});
        }
    }
    const updatePage = (newPage)=>{
        if (name) {
            searchParams.set('p', newPage);
            setSearchParams(searchParams);
        }
    }    
    return {
           loading, bookList, newbooks, data, updatePage, name, updateName
    }
}