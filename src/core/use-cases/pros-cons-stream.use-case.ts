

export const ProsConsStreamUseCase = async ( prompt: string) => {

    try {

        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({prompt})
        })

        if ( !resp.ok ) throw new Error ('Nose pudo realizar la comparación');

        const reader = resp.body?.getReader();
        if ( !reader ) {
            console.log('no se pudo generar el reader core');
            return null
        }
        return reader;

        // const decoder = new TextDecoder();
        // let text = '';

        // while(true) {
        //     const { value, done } = await reader.read();
        //     if( done ) {
        //         break;
        //     }
        // const decodedChunk = decoder.decode( value, {stream: true} );       
        // text += decodedChunk;
        // console.log(text)
        // }

    } catch (error) {

        return null

        }
    }
