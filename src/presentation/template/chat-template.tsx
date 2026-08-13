import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../components";

interface Message {
    text: string;
    isGpt: boolean;
}


export const ChatTemplate = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handlePost = async(text: string ) => {

        setIsLoading(true);
        setMessages((prev) => [...prev, {text:text, isGpt:false }])

        setIsLoading(false);

    }

    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">

                    {/* Bienvenido  */}
                    <GptMessage text="introduce un texto en español y te ayudo a corregir lo que necesites" />

                    {
                        messages.map((message, index) => (
                            message.isGpt ?
                                (<GptMessage key={index} text="Esto es de OpenAI" />) :
                                (<MyMessage key={index} text={message.text} />)
                        ))
                    }

                    { isLoading && (
                        <div className="col-start-1 col-end-12 fade-in">
                            <TypingLoader />
                        </div>  ) 
                        
                    }




                </div>
            </div>

            <TextMessageBox
                onSendMessage={handlePost}
                placeholder="Escribe aqui lo que deseas"
                disableCorrections
            />

        </div>
    )
}

