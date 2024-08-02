import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { ContText } from '../../context/Context'

const Sidebar = (props) => {

  const [extended, setExtended] = useState(false)
  const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(ContText)

  const loadPrompt = async(prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
        <p className='g'>G</p>
        <div onClick={()=>newChat()} className="new-chat">
          <img className='plus-icon' src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ?
          <div className="recent">
            <p className='recent-title'>Recent</p>
            {prevPrompts.map((item, index)=>{
              return (
                  <div onClick={()=>loadPrompt(item)} className="recent_icon">
                    <img src={assets.message_icon} alt="" />
                    <p>{item}...</p>
                  </div>
              )
            })}
          </div>
          : null
        }
      </div>
      {/* --------------------------------------Bottom----------------------------------------*/}
      <div className="bottom">
        <div className="help">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="history">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="setting">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>

    </div >
  )
}

export default Sidebar
