import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import styles from './OTPInput.module.scss'

export default function OTPInput() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const currentIndex = useRef<number>(0)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.substring(e.target.value.length - 1)
    const newOTP = [...otp]
    newOTP[currentIndex.current] = value

    if (!e.target.value) {
      setActiveOtpIndex(currentIndex.current - 1)
    } else {
      setActiveOtpIndex(currentIndex.current + 1)
    }

    setOtp(newOTP)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    currentIndex.current = index

    if (e.key === 'Backspace') {
      setActiveOtpIndex(currentIndex.current - 1)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOtpIndex])

  return (
    <div className={styles.container}>
      {otp.map((_, index) => (
        <input
          key={index}
          ref={index === activeOtpIndex ? inputRef : null}
          type='number'
          className={styles.otpInput}
          value={otp[index]}
          onChange={onChange}
          onKeyDown={e => onKeyDown(e, index)}
        />
      ))}
    </div>
  )
}