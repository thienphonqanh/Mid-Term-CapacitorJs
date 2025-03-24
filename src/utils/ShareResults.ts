import { Share } from '@capacitor/share'

export const shareResult = async (title: string, text: string) => {
  await Share.share({
    title,
    text,
    dialogTitle: 'Chia sẻ kết quả'
  })
}
