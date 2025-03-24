import { LocalNotifications } from '@capacitor/local-notifications'
import { Toast } from '@capacitor/toast'

export const requestPermissionAndNotify = async (title: string, body: string) => {
  const permStatus = await LocalNotifications.requestPermissions()
  if (permStatus.display === 'granted') {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.random(),
          title,
          body,
          schedule: { at: new Date(Date.now() + 1000) } // Gửi sau 1 giây
        }
      ]
    })
  } else {
    await Toast.show({
      text: 'Quyền thông báo bị từ chối!',
      duration: 'short'
    })
  }
}
