import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotificationLine } from 'react-icons/ri';
import { MdKeyboardArrowDown  } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Notification, UserProfile } from '.'
import { useStateContext } from '../contexts/ContextProvider'
import { useFirebaseContext } from '../contexts/FirebaseContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={customFunc} style={{ color }} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
      <span 
        style={{ background: dotColor }}
        className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
      />
      {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const { setActiveMenu, isClicked, handleClick, currentColor } = useStateContext();
  const { profilePic } = useFirebaseContext();

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title='Menu' customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color={currentColor} icon={<AiOutlineMenu />} />

      <div className='flex'>
        <NavButton 
          title='Notification'
          dotColor='#03C9D7' 
          customFunc={() => handleClick('notification')} 
          color={currentColor}
          icon={<RiNotificationLine />}
        />
        
          <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
            onClick={() => handleClick('userProfile')}
          >
            <img className='rounded-full w-8 h-8' src={profilePic} />
            <p>
              <span className='text-gray-400 text-14'>Hi, </span> {' '}
              <span className='text-gray-400 font-bold ml-1 text-14'>{localStorage.getItem("name")}</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14'/>
          </div>

        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  )
}

export default Navbar