import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useBookContext } from "../context/DataBooksContext";
import './home.css'
import { Image } from "../components/Image/Image"
import PaginatedList from "../components/Pagination/PaginatedList";
import SearchInput from "../components/SearchInput/SearchInput";
import usePaginatedData from "../components/Pagination/usePaginatedData";
import BookSkeleton from "../components/Skeletons/BookSkeleton";
import { decodeHTMLEntities } from "../utilities/utils";
import { useViewTransitionNavigate } from "../hooks/useViewTransitionNavigate";

export function Home() {
    //const [page, setPage] = useState(1) 
    const { loading, bookList, newbooks, data, updatePage, name, updateName } = usePaginatedData()
    const transitionNavigate = useViewTransitionNavigate();
    /*const urlList = (page && name) ? `https://api.itbook.store/1.0/search/${name}/${page}` : 'https://api.itbook.store/1.0/new' 
     const { data, loading, error, hasMore, text } = useFetch(urlList)
     const { books } = data*/
    {/*infine scrolling cuando llega al final hace el fetching y carga los datos que siguen*/ }
    /*    
    const observer = useRef()
    //let counterIntersecting = 1
    const lastBookElementRef = useCallback((node)=>{
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting && hasMore){
                    console.log("visible")
                    setPage(prev=> prev + 1)
                    console.log("page", page)
                }
        })
        if(node) observer.current.observe(node)
    }, [loading, hasMore])
*/
    /*
    useEffect(() => {
            setNewBooks(books)
         }, [data, setNewBooks])
    
         useEffect(()=>{
             if(bookList?.length > 0){
                 setBookList(prevBookList => prevBookList.concat(books));
                } 
            }, [page])
            */
    return (
        <>
            <SearchInput updateName={updateName} />
            <h1 className="title">{name ? `Results from search` : `new released books`}</h1>
            <div className="books__container">
                <div className="books">
                    {(bookList?.length > 0) ? bookList?.map((book, i) => {
                        //if(bookList?.length === i + 1){
                        return <Link
                            data-testid={`booklist-${i}`}
                            key={i}
                            to={`${book?.isbn13}`}
                            className="books__link"
                            onClick={(e) => {
                                e.preventDefault();
                                transitionNavigate(`${book?.isbn13}`);
                            }}
                        >
                            <Image
                                key={i}
                                src={book?.image}
                                imageClass={`books__img`}
                                alt={decodeHTMLEntities(book.title)}
                                style={{ viewTransitionName: `book-${book?.isbn13}` }}
                            />
                            <div className="books__texts">
                                <span>{decodeHTMLEntities(book?.title) || 'loading the first text'}</span>
                                <span>{book?.isbn13 || 'loading'}</span>
                                <span>{book?.price || 'loading'}</span>
                            </div>
                        </Link>
                        {/*}else{
                            return <Link key={i} to={`books/${book?.isbn13}`} className="books__link" >
                            <img className="books__img" src={book?.image} alt="" />
                            <Image key={i} src={book.image} imageClass={`books__img`} alt={book.title}/>
                            <div className="books__texts">
                                <span>{book?.title}</span>
                                <span>{book?.isbn13}</span>
                                <span>{book?.price}</span>
                                </div>
                        </Link>
                        }*/}
                    }) : loading ? Array.from({ length: 10 }).map((item) => <div key={item}><BookSkeleton /></div>) //<div className="spinner"></div> /** este loading al inicio era el que afectaba el infinite scrolling devolviendo la barra de scroll hacia arriba lo quite de arriba si no tiene utilidad lo quito de abajo, el infinite scrolling funciona poniendo el loading abajo de la iteracion de los datos*/                 
                        : newbooks?.map((book, i) => (
                            <Link
                                data-testid={`newbooks-${i}`}
                                key={i}
                                to={`${book.isbn13}`}
                                className="books__link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    transitionNavigate(`${book.isbn13}`);
                                }}
                            >
                                <Image
                                    key={i}
                                    src={book.image}
                                    imageClass={`books__img`}
                                    alt={decodeHTMLEntities(book.title)}
                                    style={{ viewTransitionName: `book-${book.isbn13}` }}
                                />
                                <div className="books__texts">
                                    <span>{decodeHTMLEntities(book.title)}</span>
                                    <span>{book.isbn13}</span>
                                    <span>{book.price}</span>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
            <div>
                <PaginatedList data={data} updatePage={updatePage} name={name} />
            </div>
        </>
    )
}