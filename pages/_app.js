import { initialstate } from '@/Context/InitIalState'
import { StateProvider } from '@/Context/StateProvider'
import reducer from '@/Context/reducer'
import '../styles/globals.css'
export default function App({ Component, pageProps }) {
  return (
     
     <StateProvider initialstate={initialstate} reducer={reducer} >
       <Component {...pageProps} />
     </StateProvider>
    
  )
}
