import styles from './App.module.scss'
import OTPInput from 'components/OTPInput/OTPInput'

export default function App() {
  return (
    <div className={styles.app}>
      <OTPInput />
    </div>
  )
}