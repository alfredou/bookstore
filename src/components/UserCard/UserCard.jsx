import React from 'react'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import user_image from "../../assets/user.jpg"
import "./userCard.css"
import { UserInfo } from '../UserInfo/UserInfo'
import { OrderInfo } from '../OrderInfo/OrderInfo'
import { ModalPortal } from '../modal/modal'
import Upload from '../Upload/Upload'
import { useSessionStorage } from '../../hooks/useSessionStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faShoppingBag, faCamera, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

function UserCard({ user }) {
    const [showModal, setShowModal] = useState(false);
    const [tab, setTab] = useSessionStorage("tab", 0)

    const tabs = [
        { title: "Profile Settings", icon: faGear },
        { title: "Orders Lists", icon: faShoppingBag }
    ]

    const handleClick = (idx) => {
        setTab(idx)
    }

    const showModalPortal = (e) => {
        setShowModal(true)
    }

    return (
        <section className="profile__info">
            {showModal && (
                <ModalPortal setShowModal={setShowModal}>
                    <Upload setShowModal={setShowModal} />
                </ModalPortal>
            )}

            <aside className="usercard">
                <div className="user__info">
                    <div className="usercard__imgcontainer" onClick={showModalPortal} title="Change Profile Picture">
                        <img
                            src={user.image ? user.image : user_image}
                            className="usercard__img"
                            alt={`${user.username}'s profile`}
                        />
                        <div className="usercard__img-overlay">
                            <FontAwesomeIcon icon={faCamera} />
                        </div>
                    </div>

                    <div className="usercard__data">
                        <h2 className="usercard__username">{user.username}</h2>
                        <p className="usercard__email">{user.email}</p>
                        <span className="usercard__date">
                            <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '6px' }} />
                            Joined {user.createdAt ? format(new Date(user.createdAt), 'MMM yyyy') : 'Recently'}
                        </span>
                    </div>
                </div>

                <nav>
                    <ul className="cardtabs">
                        {tabs.map((item, idx) => (
                            <li
                                onClick={() => handleClick(idx)}
                                key={item.title}
                                className={`cardtabs__title ${tab == idx ? 'cardtab__selected' : ''}`}
                            >
                                <FontAwesomeIcon icon={item.icon} className="cardtabs__icon" />
                                <span className="cardtabs__text">{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <main className="profileinfo__container">
                {tab == 0 && <UserInfo />}
                {tab == 1 && <OrderInfo id={user._id} />}
            </main>
        </section>
    )
}

export default UserCard
