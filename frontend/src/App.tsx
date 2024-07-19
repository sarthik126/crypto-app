import './App.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import CryptoMain from './component/CryptoMain'

function App() {
  return (
    <>
    <Provider store={store}>
      <CryptoMain />
      </Provider>
    </>
  )
}

export default App
