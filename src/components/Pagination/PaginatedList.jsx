import "./pagination.css"
import React, {useEffect, useState} from 'react'
import usePagination from '../../hooks/usePagination'

function PaginatedList({data, updatePage, name}) { 
    const {currentPage, totalPages, goToPage, getPageNumbers} = usePagination(data?.total, data.books?.length)
    
    useEffect(()=>{
        goToPage(1)
    }, [name])

    useEffect(()=>{//
        updatePage(currentPage);
        //console.log("urlList", urlList)
     }, [currentPage])
 
    return (
             <>
                {(name && currentPage) && <div className="pagination" role="navigation" aria-label="Pagination">
                   <button
                     className={`pagination__nav pagination__prev ${currentPage <= 1 ? 'disabled' : ''}`}
                     onClick={() => goToPage(currentPage - 1)}
                     disabled={currentPage <= 1}
                     aria-label="Previous page"
                   >&lsaquo;</button>

                   <div className="pagination__list">
                     {getPageNumbers().map(number=>{
                         const isActive = number === currentPage
                         return (
                           <button
                             key={number}
                             onClick={()=>goToPage(number)}
                             className={`pagination__pages ${isActive ? 'pagination__active' : 'pagination__hover'}`}
                             aria-current={isActive ? 'page' : undefined}
                             aria-label={`Page ${number}`}
                           >
                             {number}
                           </button>
                         )
                     })}
                   </div>

                   <button
                     className={`pagination__nav pagination__next ${currentPage === totalPages ? 'disabled' : ''}`}
                     onClick={() => goToPage(currentPage + 1)}
                     disabled={currentPage === totalPages}
                     aria-label="Next page"
                   >&rsaquo;</button>
                </div>}
             </>
  )
}

export default PaginatedList