import React from 'react'
import PrivateRoutes from './contexts/PrivateRoutes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { Navbar, Footer, Sidebar, ThemeSettings } from './components'
import { Dashboard, Invoices, Calendar, Team, Stacked, Pyramid, Clients, Kanban, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Line, Login  } from './pages'
import './App.css'

const App = () => {
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode, user } = useStateContext();
  
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
          <div className='flex relative dark:bg-main-dark-bg'>
            <div className='fixed right-4 bottom-4' style={{ zIndex: '1000' }}>
              <TooltipComponent content='Settings' position='Top'>
                <button 
                  type='button'
                  className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white'
                  style={{ background: currentColor, borderRadius: '50%'}}
                  onClick={() => setThemeSettings(true)}
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>

            {activeMenu ? (
              <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                {user && <Sidebar />}
              </div>
            ) : (
              <div className='w-0 dark:bg-secondary-dark-bg'>
                {user && <Sidebar />}
              </div>
            )}
            <div className={
              `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu && user ? 'md:ml-72' : 'flex-2 '}`
            }>
              <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
              {user && <Navbar />}
              </div>

            <div>
              {themeSettings && <ThemeSettings />}
                <Routes>
                  <Route element={<PrivateRoutes/>}>
                    {/* Dashboard */}
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/dashboard' element={<Dashboard />} />

                    {/* Pages */}
                    <Route path='/invoices' element={<Invoices />} />
                    <Route path='/team' element={<Team />} />
                    <Route path='/clients' element={<Clients />} />

                    {/* Apps */}
                    <Route path='/kanban' element={<Kanban />} />
                    <Route path='/editor' element={<Editor />} />
                    <Route path='/calendar' element={<Calendar />} />
                    <Route path='/color-picker' element={<ColorPicker />} />

                    {/* Charts */}
                    <Route path='/line' element={<Line />} />
                    <Route path='/area' element={<Area />} />
                    <Route path='/bar' element={<Bar />} />
                    <Route path='/pie' element={<Pie />} />
                    <Route path='/financial' element={<Financial />} />
                    <Route path='/color-mapping' element={<ColorMapping />} />
                    <Route path='/pyramid' element={<Pyramid />} />
                    <Route path='/stacked' element={<Stacked />} />
                    </Route>
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </div>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
