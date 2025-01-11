
import React, {useEffect, useState} from "react";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';


const PartidoCard = ({ partido }) => {
    const token = localStorage.getItem('token');
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                console.log(token);
                const response = await axios.post(
                    'http://localhost:8000/favorite-events/check',
                    { eventID: String(partido.id) },
                    {
                        headers: {
                            Authorization: `Bearer ${(token)}` // Incluye el token en el encabezado
                        }
                    }
                );
                
                setIsFavorite(response.data.isFavorite); 
            } catch (error) {
                console.error('Error checking favorite state:', error);
            }
        };

        fetchFavoriteStatus();
    }, [partido.id, token]);

    // Función para alternar el estado de favorito
    const toggleFavorite = async () => {
        try {
            setIsFavorite(!isFavorite);
            console.log(token)
            if (isFavorite) {
                try {
                    console.log(partido.id);
                    const response = await axios.delete(
                        `http://localhost:8000/favorite-events/delete`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }, data: { event: partido.id }
                        }
                    );
            
                    console.log(response.data.message);
                } catch (error) {
                    console.error('Error deleting favorite event:', error);
                }
            } else {
                try {
                    const response = await axios.post(
                        'http://localhost:8000/favorite-events/add',
                        { event: partido.id },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
            
                    console.log(response.data.message);
                } catch (error) {
                    console.error('Error adding favorite event:', error);
                }
            }
        } catch (error) {
            console.error('Error changing favorite state:', error);
        }
    };

    return (
        <div className="partido-card">

            <div style={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }} onClick={toggleFavorite}>
                {isFavorite ? (
                    <FaHeart color="red" size={24} /> // Corazón lleno en rojo
                ) : (
                    <FaRegHeart color="red" size={24} /> // Corazón contorno en rojo
                )}
            </div>

            <h2>{partido.name}</h2>
            <p><strong>Ubicación:</strong> {partido.city}</p>
            <p><strong>Día:</strong> {partido.date}</p>
            <p><strong>Hora:</strong> {partido.time}</p>
            <p><strong>Precio:</strong> {partido.price}</p>
        </div>
    );
}

export default PartidoCard;
