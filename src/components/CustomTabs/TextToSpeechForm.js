import React, { useState, useRef, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { StyledTextarea } from './StyledComponents';
import { fetchTextToSpeechOpenAI } from '@/utils/OpenaiAPI';

function TextToSpeechForm() {
    const [text, setText] = useState('');
    const [audioSrc, setAudioSrc] = useState('');
    const audioRef = useRef(null);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSpeech = async () => {
        if (!text) {
            alert("No text provided.");
            return;
        }

        console.log("Voice over is being generated..");
        const response = await fetchTextToSpeechOpenAI(text);
        const blobUrl = URL.createObjectURL(response);    
        setAudioSrc(blobUrl);
        console.log("Voice over generation finished");
    };

    const deleteContent = () => {
        setText('');
        if (audioSrc) {
            URL.revokeObjectURL(audioSrc);
        }
        setAudioSrc("");
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, [audioSrc]);

    return (
        <div>
            <StyledTextarea
                id="textBox"
                placeholder="Place text here..."
                value={text}
                onChange={handleTextChange}
            />
            <Box display="flex" gap={2}>
                <Button
                    onClick={handleSpeech}
                    component="label"
                    variant="contained"
                    sx={{ 
                        float: 'left',
                        backgroundColor: 'black', 
                        color: 'white',                               
                        '&:hover': {
                            backgroundColor: 'gray'
                        }
                    }} 
                >
                    Run
                </Button>
                <Button
                    onClick={deleteContent}
                    component="label"
                    variant="contained"
                    sx={{ 
                        float: 'left',
                        backgroundColor: 'black', 
                        color: 'white',                               
                        '&:hover': {
                            backgroundColor: 'gray'
                        }
                    }} 
                >
                    Start over
                </Button>
            </Box>
            <audio ref={audioRef} controls style={{ width: '100%', marginTop: '20px' }}>
                <source src={audioSrc} type="audio/mp3" />
                Your browser does not support the audio tag.
            </audio>
        </div>
    );
}

export default TextToSpeechForm;
