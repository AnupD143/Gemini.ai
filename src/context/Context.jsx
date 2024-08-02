import { createContext, useState } from "react";
import run from "../config/gemini";

export const ContText = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrePrompts] = useState([]);
    const [ShowResult, setShowResult] = useState(false);
    const [loading, setloading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextword) => {
        setTimeout(function () {
            setResultData(prev => prev + nextword);
        }, 85 * index)
    }

    const newChat = ()=>{
        setloading(false)
        setShowResult(false)
    }


    const onSent = async (prompt) => {
        setResultData("")
        setloading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await run(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrePrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }

        // setRecentPrompt(input)
        // setPrePrompts(prev => [...prev, input])
        // const response = await run(input)
        let responseArray = response.split('**');
        let newResponse ="";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i]
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }
        let newResponse2 = newResponse.split('*').join('</br>')
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextword = newResponseArray[i];
            delayPara(i, nextword + " ")
        }
        // setResultData(newResponse2)
        setloading(false)
        setInput("")
    }


    const contextValue = {
        prevPrompts,
        setPrePrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        ShowResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <ContText.Provider value={contextValue}>
            {props.children}
        </ContText.Provider>
    )
}

export default ContextProvider