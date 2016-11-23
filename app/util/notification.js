const notification = {
    isNotificationSupported: 'Notification' in window,
    isPermissionGranted: function () {
        return Notification.permission === 'granted'
    },
    requestPermission: function () {
        if(this.isNotificationSupported){
            Notification.requestPermission(function (status) {
                if(status === 'granted'){
                    // return console.log('允许桌面推送');
                }
            });
        }
    },
    showNotification: function (title,options) {
        if(this.isPermissionGranted() && this.isNotificationSupported){
            var n = new Notification(title,options);
            n.onclick = function () {
                window.focus();
                n.close();
            }
            setTimeout(function () {
                n.close()
            },3000);
            return n;
        }
    }
};
export default notification;
