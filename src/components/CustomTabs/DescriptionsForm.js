import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { StyledTextarea, InputFieldContainer } from './StyledComponents';
import { fetchDescriptionOpenAI } from '@/utils/OpenaiAPI';
import { saveTextAsFile } from '@/utils/Actions';

function DescriptionsForm() {
    const [prompt, setPrompt] = useState('');
    const [description, setDescription] = useState('');

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };

    const handleGenerate = async () => {
        try {
            console.log("Description is being generated..");
            const response = await fetchDescriptionOpenAI(prompt);
            setDescription(response);
        } catch (error) {
            console.error(error);
            setDescription('Failed to generate description.');
        }
    };

    const saveDescriptionToFile = () => {
        if (!description) {
            alert("No description to save.");
            return;
        }
        
        saveTextAsFile(description, "description.txt")
    };

    const clearFields = () => {
        setDescription('');
        setPrompt('');
    };

    return (
        <Box>
            <InputFieldContainer>
                <TextField
                    id="standard-basic"
                    label="Prompt for description"
                    variant="standard"
                    value={prompt}
                    onChange={handlePromptChange}
                    sx={{ minWidth: 300 }}
                />
                <Button
                    onClick={handleGenerate}
                    variant="contained"
                    tabIndex={-1}
                    sx={{ 
                        backgroundColor: 'black', 
                        color: 'white',          
                        marginLeft: '20px',
                        '&:hover': {
                            backgroundColor: 'gray'
                        }
                    }} 
                >
                    Generate
                </Button>
            </InputFieldContainer>

            <StyledTextarea
                id="textBox"
                placeholder="Description text will be displayed here"
                value={description}
                readOnly
            />
            
            <Box display="flex" gap={2} mt={2}>
                <Button
                    onClick={saveDescriptionToFile}
                    component="label"
                    variant="contained"
                    tabIndex={-1}
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
                    onClick={clearFields}
                    component="label"
                    variant="contained"
                    tabIndex={-1}
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
        </Box>
    );
}

export default DescriptionsForm;