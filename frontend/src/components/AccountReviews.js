import React, { useEffect, useState } from 'react'
import { Review } from './Review';

export const AccountReviews = ( {email,myaccount} ) => {
    // RECUPERACIÓN DE LA SESIÓN
    const [stateUser, setStateUser] = useState(null);
    const [filter, setFilter] = useState('r.fecha_resena');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("LoggedUser"));
        const filter = 'r.fecha_resena';
        setFilter(filter);
        if (user && user.loggedIn) {
            setStateUser(user);
        }
    }, [])

    useEffect(() => {
        if (stateUser && stateUser.user) {
            loadReviews()
        }
    })

    const loadReviews = async () => {
        const applyFilter = await fetch(`http://localhost:4000/all/accountreviews/${filter}/${encodeURIComponent(stateUser.user.correo)}/${encodeURIComponent(email)}`)
            .then(data => data.json()).catch(err => null);
        setReviews(applyFilter);
    }

    return (
        <div>
            {Array.isArray(reviews) && reviews.map((review) =>
                <Review key={review.id_resena} resena={review} myaccount={myaccount} loadReviews={loadReviews}></Review>
            )}
        </div>
    )
}
