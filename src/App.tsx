import { useState } from 'react'
import { Calculator, CameraIcon } from 'lucide-react'
import { shareResult } from './utils/ShareResults'
import { requestPermissionAndNotify } from './utils/LocalNotifications'
import TakePhoto from './components/TakePhoto'

const App = () => {
  const [height, setHeight] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)
  const [bmi, setBmi] = useState<string | null>(null)
  const [category, setCategory] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'bmi' | 'camera'>('bmi')

  const calculateBMI = (): void => {
    if (height > 0 && weight > 0) {
      const bmiValue = (weight / (height / 100) ** 2).toFixed(2)
      setBmi(bmiValue)
      let result = ''
      if (parseFloat(bmiValue) < 18.5) result = 'Gầy'
      else if (parseFloat(bmiValue) < 24.9) result = 'Bình thường'
      else if (parseFloat(bmiValue) < 29.9) result = 'Thừa cân'
      else result = 'Béo phì'
      setCategory(result)
      sendNotification(bmiValue, result)
    }
  }

  const sendNotification = async (bmiValue: string, result: string): Promise<void> => {
    const title = 'Kết quả BMI'
    const body = `Chỉ số BMI của bạn là ${bmiValue} - ${result}`
    await requestPermissionAndNotify(title, body)
  }

  const handleShareBMI = async (): Promise<void> => {
    if (bmi && category) {
      const title = 'Kết quả BMI'
      const text = `Chỉ số BMI của tôi là ${bmi} - ${category}`
      await shareResult(title, text)
    }
  }

  return (
    <div className='w-screen h-screen bg-gray-100 p-4'>
      <div className='flex flex-col items-center p-4 w-full bg-white shadow-xl rounded-2xl'>
        {activeTab === 'bmi' ? (
          <div className='text-center'>
            <h1 className='text-2xl font-bold'>Tính BMI</h1>
            <input
              type='number'
              placeholder='Chiều cao (cm)'
              className='border my-3 p-3 w-full rounded border-gray-400 placeholder:italic'
              onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
            />
            <input
              type='number'
              placeholder='Cân nặng (kg)'
              className='border my-3 p-3 w-full rounded border-gray-400 placeholder:italic'
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            />
            <button className='!bg-blue-500 text-white rounded w-1/2 my-1' onClick={calculateBMI}>
              Tính BMI
            </button>

            {bmi && (
              <div className='border-2 border-gray-300 rounded m-3 py-3'>
                <h2 className='text-xl font-semibold'>BMI: {bmi}</h2>
                <h3 className='text-lg'>{category}</h3>
                <button className='!bg-green-500 text-white mt-2 rounded' onClick={handleShareBMI}>
                  Chia sẻ kết quả
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className='text-center'>
            <h1 className='text-2xl font-bold'>Chụp ảnh</h1>
            <TakePhoto />
          </div>
        )}

        <div className='fixed bottom-0 w-full border-2 border-gray-400 rounded-t-xl flex justify-around gap-0.5'>
          <button
            className={`p-2 w-full text-center !border-none !bg-blue-100 ${
              activeTab === 'bmi' ? '!bg-transparent !border-black border-2' : ''
            }`}
            onClick={() => setActiveTab('bmi')}
          >
            <div className='w-full flex flex-col items-center justify-center'>
              <Calculator />
              <span>Tính BMI</span>
            </div>
          </button>
          <button
            className={`p-2 w-full text-center !border-none !bg-blue-100 ${
              activeTab === 'camera' ? '!bg-transparent !border-black border-2' : ''
            }`}
            onClick={() => setActiveTab('camera')}
          >
            <div className='w-full flex flex-col items-center justify-center'>
              <CameraIcon />
              <span>Chụp ảnh</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
