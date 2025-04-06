import UploadForm from './components/UploadForm';
import ResearchList from './components/ResearchList';
import LandingPage from './components/LandingPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
const App = () => {
  return (
    <>
    <Router>
    <Routes>
    
          <Route exact path='/' element={<LandingPage/>}/>
          <Route exact path='/upload' element={<UploadForm/>}/>
          <Route exact path='/list' element={<ResearchList/>}/>
        </Routes>
      
    </Router>
    </>
  );
};

export default App;
