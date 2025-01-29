import {React, useState} from 'react'
import image1 from './assets/img.png'
import {AlignJustify} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import Sidebar from "./Sidebar"

const HomePage = () => {
    const [isSidebarOpen , setIsSidebarOpen] = useState(false);
    const navigate = useNavigate()
    const routeChange=()=>{
        navigate('/sidebar')
    }
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

      const handleLogout = () => {
        // Clear user authentication (e.g., remove token from localStorage)
        localStorage.removeItem("authToken");
        navigate("/login"); // Redirect to login page
      };
  return (
    <div className="contents">
        <div className='navbar flex items-center justify-start'>
            <AlignJustify height="50px" width="50px" color="white" className="ml-4 mt-20" margin-top="200px" onClick={()=>setIsSidebarOpen(!isSidebarOpen)}/>
            
        </div>
        {isSidebarOpen && <Sidebar/>}
        <div className="text-div" >
            <h1>Student Data Management</h1>
            <h3>For options click on the menu icon on the top-left corner.</h3>
            
        </div>
        <div className ="image-div">
            <img className="image" src={image1}/>
        </div>
      
    </div>
  )
}

export default HomePage;
