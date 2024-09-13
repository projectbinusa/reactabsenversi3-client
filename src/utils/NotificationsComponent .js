import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useEffect } from 'react';

const NotificationsComponent = () => {
    useEffect(() => {
        const socket = new SockJS('http://localhost:2026/ws-notifications');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);

            stompClient.subscribe('/topic/notifications', function (notification) {
                console.log('Notification received: ', JSON.parse(notification.body));
            });
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    return <div>Check console for notifications.</div>;
};

export default NotificationsComponent;
