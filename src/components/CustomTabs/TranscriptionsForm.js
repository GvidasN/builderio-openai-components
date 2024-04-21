import React, { useState } from "react";
import { Box, Button } from '@mui/material';
import { StyledTextarea, VisuallyHiddenInput, StyledDiv } from "./StyledComponents";
import { fetchTranscriptionOpenAI } from '@/utils/OpenaiAPI';
import { saveTextAsFile } from "@/utils/Actions";


function TranscriptionsForm() {
    const [filename, setFilename] = useState("");
    const [transcription, setTranscription] = useState("");

    const handleFileUpload = async ({ target }) => {
        const file = target.files?.[0];

        if (file) {
            setFilename(file.name);
            console.log("File being sent:", file.name);

            try {               
                const transcribedText = await fetchTranscriptionOpenAI(file);
                setTranscription(transcribedText);

            } catch (error) {
                console.error('Error fetching transcription:', error);
                setTranscription('Failed to transcribe file.');
            }
        }
    };

    const saveTranscriptionAsFile = () => {
        if (!transcription) {
            alert("No transcription to save!");
            return;
        }
        
        saveTextAsFile(transcription, "transcription.txt")
    };

    const deleteContent = () => {
        setTranscription(""); 
        setFilename("");
    };

    return (
        <div>
            <StyledDiv>
                <Button 
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
                    Upload file
                    <VisuallyHiddenInput 
                        type="file" 
                        accept="audio/*,video/*"
                        onChange={handleFileUpload} 
                    />
                </Button>
                <Box paddingLeft={2}>
                    {filename}
                </Box>        
            </StyledDiv>
            <StyledTextarea
                id="textBox"
                placeholder="Transcribed text will appear here..."
                value={transcription}
            />
            <Box display="flex" gap={2}>
                <Button
                    onClick={saveTranscriptionAsFile}
                    component="label"
                    variant="contained"
                    sx={{ 
                        backgroundColor: 'black', 
                        color: 'white',          
                        float: 'left',
                        '&:hover': {
                            backgroundColor: 'gray'
                        }
                    }}   
                >
                    Save
                </Button>
                <Button
                    onClick={deleteContent}
                    component="label"
                    variant="contained"
                    sx={{ 
                        backgroundColor: 'black', 
                        color: 'white',          
                        float: 'left',
                        '&:hover': {
                            backgroundColor: 'gray'
                        }
                    }}     
                >
                    Delete
                </Button>
            </Box>
        </div>
    );
}

export default TranscriptionsForm;