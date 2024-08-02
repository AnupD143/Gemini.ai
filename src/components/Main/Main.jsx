import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { ContText } from '../../context/Context'

// import { ThemeProvider, useTheme } from '../../Theme/ThemeContext';
// import { GlobalStyles } from '../../Theme/globalStyles';


const Main = () => {

  const { onSent, recentPrompt, ShowResult, loading, resultData, setInput, input } = useContext(ContText)

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

        {!ShowResult ?
          <>
            <div className='greet'>
              <p><span>Hello, Sir.</span></p>
              <p>How can i help you</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautyful place to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize the concept: uraban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>please help me to chose the clothe</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>If you want to improve your programming skils then you have to follow this stpes </p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
          :
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ?
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }
            </div>
          </div>
        }


        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Message Gemini' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
            </div>
          </div>
          <p className='bottom-info'>
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
