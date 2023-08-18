import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './App.css'
import Usermanage from './components/Usermanage'

function App() {

  return (
    <>
     <SkeletonTheme baseColor="#202020" highlightColor="#444">
     <Usermanage/>
     </SkeletonTheme>
    </>
  )
}

export default App
