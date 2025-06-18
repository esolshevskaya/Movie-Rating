import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    const formatMessage = (msg) => {
        if (!msg) return msg;

        const duplicateMatch = msg.match(/Фильм "(.+?)" уже существует в списке!/);
        if (duplicateMatch) {
            const movieTitle = duplicateMatch[1];
            const formattedTitle = movieTitle.charAt(0).toUpperCase() + movieTitle.slice(1).toLowerCase();
            return (
                <>
                    Фильм "{formattedTitle}" уже существует<br />
                    в списке!
                </>
            );
        }
        return msg.charAt(0).toUpperCase() + msg.slice(1);
    };

    const formattedMessage = formatMessage(message);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 300);
    };

    useEffect(() => {
        const timer = setTimeout(handleClose, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <div
                className={`notification-overlay ${isClosing ? 'fade-out' : ''}`}
                onClick={handleClose}
            />

            <div
                className={`notification-content ${isClosing ? 'fade-out' : ''}`}
            >
                <div className="notification-message">
                    {formattedMessage}
                </div>

                <button
                    className="notification-button"
                    onClick={handleClose}
                >
                    Закрыть
                </button>
            </div>
        </>
    );
};

export default Notification;