import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function usePagination(totalItems, itemsPerPage) {
   const [searchParams] = useSearchParams();
   const urlPage = parseInt(searchParams.get('p')) || 1;
   
   const [currentPage, setCurrentPage] = useState(urlPage)
   const totalPages = Math.ceil(totalItems / itemsPerPage);

   // Sync currentPage when URL changes externally (like searching or browser back/forward)
   useEffect(() => {
       setCurrentPage(urlPage);
   }, [urlPage]);

   const goToPage = (page)=>{
         if(page>=1 && page <= totalPages){
            setCurrentPage(page)
         }
   }

   const getPageNumbers = ()=>{
            const pageNumbers = []
            const maxPageNumbersToShow = 7; // Máximo de números de página a mostrar
            const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));//4 //importante analizar
            const endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);//10

            for(let i = startPage; i<= endPage; i++){
                  pageNumbers.push(i)
            }
       return pageNumbers
   }   

   return {
       currentPage, 
       totalPages,
       getPageNumbers,
       goToPage
   }
}

export default usePagination