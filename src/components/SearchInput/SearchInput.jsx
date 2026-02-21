import "./searchInput.css"
import React from "react";
import { useState, useCallback } from "react"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "just-debounce-it"

function SearchInput({ updateName }) {
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const validateSearch = (value) => {
    if (value.length > 50) {
      return "Max 50 characters allowed"
    }
    if (value && !/^[a-zA-Z0-9\s]*$/.test(value)) {
      return "Only letters, numbers and spaces allowed"
    }
    return ""
  }

  const debouncedGetBooks = useCallback(debounce(search => {
    const errorMsg = validateSearch(search)
    if (!errorMsg) {
      updateName(search)
    }
  }, 300), [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const errorMsg = validateSearch(search)
    if (!errorMsg) {
      updateName(search)
    } else {
      setError(errorMsg)
    }
  }

  const handleSearchChange = (e) => {
    const newSearch = e.target.value
    const errorMsg = validateSearch(newSearch)

    setSearch(newSearch)
    setError(errorMsg)

    if (!errorMsg) {
      debouncedGetBooks(newSearch)
    }
  }

  return (
    <div className="search-wrapper" style={{ marginTop: '36px' }}>
      <form onSubmit={handleSubmit} className='home__containerinput' role="search" aria-label="Search form" style={{ marginTop: 0 }}>
        <input
          type="text"
          name="q"
          onChange={handleSearchChange}
          className={`home__input ${error ? 'home__input--invalid' : ''}`}
          placeholder='Search your book'
          value={search}
          aria-label="Search books"
          maxLength={55}
        />
        <button
          type="submit"
          title="Search"
          aria-label="Search"
          className='home__loupe'
          disabled={!!error}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
      <span className={`search__error ${error ? 'search__error--visible' : ''}`}>
        {error}
      </span>
    </div>
  )
}

export default SearchInput