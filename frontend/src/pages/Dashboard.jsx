import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});

  const token = localStorage.getItem('token');
  const userId = parseInt(localStorage.getItem('userId'), 10);

  useEffect(() => {
    if (!token) return;
    fetchStores();
  }, []);

  const fetchStores = () => {
    axios
      .get(import.meta.env.VITE_API_URL + '/api/stores', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((res) => {
        setStores(res.data);

        
        const ratingMap = {};
        res.data.forEach((store) => {
          const myRating = store.Ratings?.find((r) => r.userId === userId);
          if (myRating) {
            ratingMap[store.id] = myRating.value;
          }
        });
        setRatings(ratingMap);
      })
      .catch((err) => {
        console.error('Error fetching stores:', err.response?.data || err.message);
      });
  };

  const handleRatingChange = (storeId, value) => {
    setRatings((prev) => ({ ...prev, [storeId]: value }));
  };

  const submitRating = (storeId) => {
  axios
    .post(
      import.meta.env.VITE_API_URL + '/api/ratings',
      {
        storeId,
        value: ratings[storeId]
      },
      {
        headers: { Authorization: 'Bearer ' + token } 
      }
    )
    .then(() => {
      alert('Rating submitted!');
      fetchStores(); 
    })
    .catch((err) => {
      console.error('Rating error:', err.response?.data || err.message);
      alert('Failed to submit rating');
    });
};


  return (
    <div style={{ padding: '2rem' }}>
      <h2>Stores</h2>
      <ul>
        {stores.map((store) => {
          const average =
            store.Ratings && store.Ratings.length
              ? (
                  store.Ratings.reduce((sum, r) => sum + r.value, 0) /
                  store.Ratings.length
                ).toFixed(1)
              : 'N/A';

          return (
            <li key={store.id} style={{ marginBottom: '1rem' }}>
              <strong>{store.name}</strong> — Avg Rating: {average}
              <br />
              <input
                type="number"
                min={1}
                max={5}
                value={ratings[store.id] || ''}
                onChange={(e) => handleRatingChange(store.id, parseInt(e.target.value, 10))}
                placeholder="Your rating"
              />
              <button onClick={() => submitRating(store.id)}>Rate</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
