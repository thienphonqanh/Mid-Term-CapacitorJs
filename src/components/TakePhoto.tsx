import { useState } from 'react'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

export default function TakePhoto() {
  const [photo, setPhoto] = useState<string | null>(null)
  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 90
    })
    setPhoto(image.dataUrl || null)
  }
  return (
    <div>
      <button onClick={takePhoto} className='!bg-purple-500 text-white p-2 rounded m-2 mt-4'>
        Chụp ảnh
      </button>
      {photo && <img src={photo} alt='Ảnh của bạn' className='w-full mt-4 rounded' />}
    </div>
  )
}
