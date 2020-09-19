import React, { useEffect } from 'react';
import {
    FiAlertCircle,
    FiCheckCircle,
    FiInfo,
    FiXCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
    message: ToastMessage;
    style: object;
}

const icons = {
    info: <FiInfo />,
    error: <FiAlertCircle />,
    success: <FiCheckCircle />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
    const { removeToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id);
        }, 3000);

        return () => {
            clearTimeout(3000);
        };
    }, [removeToast, message.id]);

    return (
        <Container
            type={message.type}
            hasdescription={Number(!!message.description)}
            style={style}
        >
            {icons[message.type || 'info']}
            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p>}
            </div>
            <button onClick={() => removeToast(message.id)} type="button">
                <FiXCircle />
            </button>
        </Container>
    );
};

export default Toast;
