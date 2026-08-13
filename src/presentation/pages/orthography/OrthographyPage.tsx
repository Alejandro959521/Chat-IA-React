import { useState } from "react"
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { orthographyUseCase } from "../../../core/use-cases";
import { GptOrthographyMessage } from "../../components/chat-bubbles/GptOrthographyMessage";

interface Message {
    text: string;
    isGpt: boolean;
    info?:{
        userScore: number;
        errors: string[];
        message: string;
    }
}


export const OrthographyPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handlePost = async(text: string ) => {

        setIsLoading(true);
        setMessages((prev) => [...prev, {text:text, isGpt:false }]);

        const {ok, errors, message, userScore} = await orthographyUseCase(text);
        if ( !ok ) {
        setMessages((prev) => [...prev, {text:'nose puedo realizar la corrección', isGpt:true }]);
        } else {
        setMessages((prev) => [...prev, {text:message, isGpt:true,
            info: {
                errors,
                message,
                userScore,
            }
         }]);
        }

        setIsLoading(false);

    }

    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">

                    {/* Bienvenido  */}
                    <GptMessage text="Introduce un texto en español y te ayudo a corregir lo que necesites" />

                    {
                        messages.map((message, index) => (
                            message.isGpt ?
                                (<GptOrthographyMessage 
                                    key={index} {...message.info!}/>) :
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
                placeholder="Escribe aqui lo que deseas corregir"
                disableCorrections
            />

            {/* <TextMessageBoxFile
                onSendMessage={handlePost}
                placeholder="Escribe aqui lo que deseas"
            /> */}
           
            {/* <TextMessageBoxSelect
            onSendMessage={console.log}
               options={[{id:"1", text:'Hola'}, {id: '2', text:'Mundo'}]} 
            />  */}

        </div>
    )
}

