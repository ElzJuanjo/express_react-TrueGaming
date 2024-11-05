import React, { useEffect, useState } from 'react'
import { Review } from './Review';

export const GameReviews = ( { id }) => {

    const [filter, setFilter] = useState('r.fecha_resena');
    const [stateUser, setStateUser] = useState(null)
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const user = localStorage.getItem("LoggedUser");
        if (user) {
            setStateUser(JSON.parse(user));
        }
    }, []);

    useEffect(() => {
        if (stateUser && stateUser.user && stateUser.user.correo) {
            loadReviews()
        }
    },[stateUser])

    const loadReviews = async () => {
        const applyFilter = await fetch(`http://localhost:4000/all/reviewsGame/${filter}/${id}/${encodeURIComponent(stateUser.user.correo)}`)
            .then(data => data.json()).catch(err => null);
        setReviews(applyFilter)
    }

    return (
        <div>
            {Array.isArray(reviews) && reviews.map((review) =>
                <Review key={review.id_resena} resena={review} myaccount={false} loadReviews={loadReviews}></Review>
            )}
        </div>
    )
}
