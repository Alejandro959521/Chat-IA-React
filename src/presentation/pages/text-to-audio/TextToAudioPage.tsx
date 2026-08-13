
import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect, GptMessageAudio } from "../../components";
import { textToAudioUseCase } from "../../../core/use-cases";


const disclaimer = `## Que audio quieres generar hoy? * Todo el audio generado es por IA`

const voices = [{id:'autumn', text:'autumn'}]

interface TextMessage {
    text: string;
    isGpt: boolean;
    type:'text';
}

interface AudioMessage {
text: string;
    isGpt: boolean;
    type:'audio';
    audio: string;

}

type Message = TextMessage | AudioMessage

export const TextToAudioPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handlePost = async(text: string, selectedVoice: string ) => {

        setIsLoading(true);
        setMessages((prev) => [...prev, { text:text, isGpt:false, type:'text' }])

      const {ok, message, audioUrl } = await textToAudioUseCase(text, selectedVoice)

        setIsLoading(false);

        if (!ok) return;

        setMessages((prev) => [...prev, {text:message, isGpt:true, type:"audio", audio: audioUrl! },
        ]);
    }

    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">

                    {/* Bienvenido  */}
                    <GptMessage text= {disclaimer} />

                    {
                        messages.map((message, index) => 
                            message.isGpt ? (
                              message.type === 'audio'
                             ? (
                          <GptMessageAudio key={index} text={message.text} audio={message.audio} />
                            ) : ( <GptMessage key={index} text={message.text} /> )                                 
                          ):(
                                <MyMessage key={index} text={message.text} />                              
                        )
                    )}

                    { isLoading && (
                        <div className="col-start-1 col-end-12 fade-in">
                            <TypingLoader />
                        </div>  ) 
                        
                    }

                </div>
            </div>

            <TextMessageBoxSelect
                onSendMessage={handlePost}
                placeholder="Escribe aqui lo que deseas escuchar"
                options={voices}
            />

        </div>
    )
}

