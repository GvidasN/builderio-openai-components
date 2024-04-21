import React, { useState } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel, Box, TextField } from '@mui/material';
import { StyledDiv, VisuallyHiddenInput, StyledTextarea } from './StyledComponents';
import { fetchTranscriptionOpenAI, fetchTranslationOpenAI } from '@/utils/OpenaiAPI';

const TranslationForm = () => {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [language, setLanguage] = useState('Spanish');
  const [translatedText, setTranslatedText] = useState('');
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);

  const handleFileUpload = async ({ target }) => {
    const file = target.files?.[0];

    if (file) {
      setFilename(target.files?.[0].name);
      setFile(target.files?.[0]); 
    }
  };

  const handleTextChange = (event) => {
    setTextToTranslate(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleAudioTranslate = async () => {
    if (file) {
      console.log("File being sent for transcription:", file.name);

      try {
          const transcription = await fetchTranscriptionOpenAI(file);
          setTextToTranslate(transcription);        
      } catch (error) {
          console.error('Error fetching transcription:', error);
          alert('Failed to translate file.');
      }
    }
  };

  const handleTextTranslate = async () => {
    if (!textToTranslate) {
      alert("No text to translate.");
      return;
    }

    console.log("File being sent for translation:", file.name);
    const data = await fetchTranslationOpenAI(textToTranslate, language);
    setTranslatedText(data.choices[0].message.content.trim());
  };

  return (
    <Box>
      <StyledDiv>
          <Button 
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
      <TextField
        fullWidth
        label="Enter text to translate"
        variant="outlined"
        value={textToTranslate}
        onChange={handleTextChange}
        margin="normal"
      />
      <FormControl fullWidth margin="normal" sx={{ backgroundColor: 'white', '.MuiOutlinedInput-input': { color: 'black' }, '.MuiInputLabel-root': { color: 'gray' } }}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Language"
          onChange={handleLanguageChange}
          sx={{ backgroundColor: 'white', '.MuiOutlinedInput-input': { color: 'black' } }}
        >
          <MenuItem value="Spanish">Spanish</MenuItem>
          <MenuItem value="French">French</MenuItem>
          <MenuItem value="German">German</MenuItem>
        </Select>
      </FormControl>
      <StyledTextarea
        id="textBox"
        placeholder="Translated text will appear here..."
        value={translatedText}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAudioTranslate}
        sx={{ 
            backgroundColor: 'black', 
            color: 'white',          
            float: 'left',
            '&:hover': {
                backgroundColor: 'gray'
            }
        }} 
      >
        Transcribe Audio
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleTextTranslate}
        sx={{ 
          mb: 2, 
          mx: 2,
          backgroundColor: 'black', 
          color: 'white',
          '&:hover': {
            backgroundColor: 'gray'
          }   
        }}
      >
        Translate Text
      </Button>
    </Box>
  );
};

export default TranslationForm;