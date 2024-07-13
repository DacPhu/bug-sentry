$(document).ready(function () {
    const notificationCountElem = $("#notificationCount");
    const notificationListElem = $("#notificationList");
    
    function fetchNotifications() {
        $.ajax({
            url: "/api/v1/notification",
            method: "GET",
            dataType: "json",
            data: { user_id: user_id },
            success: function (data) {
                if (data.length > 0) {
                    notificationCountElem.text(data.length);
                   
                    $.each(data, function (index, notification) {
                        const fullNameSender = notification.User.first_name + ' ' + notification.User.last_name
                
                        
                        if (notification.project_id && notification.User.profile_picture) {
                            const notificationItemHTML = `
                                <a href="/project/${notification.project_id}/overview" class="text-decoration-none text-dark">
                                    <div class="container-notification-item d-flex my-2">
                                        <img src="${notification.User.profile_picture}" alt="Image Description"
                                            class="rounded-circle ms-3"
                                            style="width: 60px; height: 60px; object-fit: cover;" />

                                        <h class="ms-3 flex-grow-1"><strong class="text-danger">${notification.Project.name} : ${fullNameSender}</strong> posted ${notification.content}</h>
                                    </div>
                                </a>
                            `;
                            notificationListElem.append(notificationItemHTML);
                        } else {
                            console.error('Invalid notification data:', notification);
                        }
                    });
                } else {
                    notificationCountElem.text("0");
                    const noNotificationItem = $("<a>")
                        .addClass("dropdown-item notification-item")
                        .attr("href", "#")
                        .text("No notifications");
                    notificationListElem.append(noNotificationItem);
                }
            },
            error: function (error) {
                console.error("Error fetching notifications:", error);
            }
        });
        
    }
    fetchNotifications();

    socket.on('notification',  (notification) => {
        console.log(notification)
        fetchNotifications();
    });
    
});