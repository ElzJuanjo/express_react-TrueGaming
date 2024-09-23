import React, { useEffect, useState } from 'react';
import { Review } from './Review';

export const Reviews = () => {

    // RECUPERACIÓN DE LA SESIÓN
    const [stateUser, setStateUser] = useState(null);
    const [filter, setFilter] = useState('r.fecha_resena');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("LoggedUser"));
        const filter = (localStorage.getItem('Filter')) ? JSON.parse(localStorage.getItem('Filter')).order : 'r.fecha_resena';
        setFilter(filter);
        if (user && user.loggedIn) {
            setStateUser(user);
        } else {
            loadReviews();
        }
    }, [])

    useEffect(() => {
        if (stateUser && stateUser.loggedIn) {
            loadReviewsLogged();
        }
    }, [stateUser]);

    const loadReviewsLogged = async () => {
        const applyFilter = await fetch(`http://localhost:4000/all/reviews/${filter}/${encodeURIComponent(stateUser.user.correo)}`)
            .then(data => data.json()).catch(err => null);
        setReviews(applyFilter);
    }

    const loadReviews = async () => {
        const applyFilter = await fetch(`http://localhost:4000/all/reviews/${filter}`)
            .then(data => data.json()).catch(err => null);
        setReviews(applyFilter);
    }

    return (
        <div>
            {Array.isArray(reviews) && reviews.map((review) =>
                <Review key={review.id_resena} resena={review}></Review>
            )}
        </div>
    )
}