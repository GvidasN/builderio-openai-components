import axios from 'axios';

// OpenAI APIs
const OPENAI_API_URL = 'https://api.openai.com/v1';
const OPENAI_CHAT_API_URL = `${OPENAI_API_URL}/chat/completions`;
const OPENAI_TRANSCRIPTIONS_API_URL = `${OPENAI_API_URL}/audio/transcriptions`;
const OPENAI_SPEECH_API_URL = `${OPENAI_API_URL}/audio/speech`;

// OpenAI MODELS
const OPENAI_CHAT_MODEL = "gpt-3.5-turbo";
const OPENAI_SPEECH_MODEL = "tts-1";
const OPENAI_TRANSCRIPTIONS_MODEL = "whisper-1";

// OpenAI RESPONSE FORMATS
const TRANSCRIPTIONS_FORMAT = "text";
const TEXT_TO_SPEECH_FORMAT = "blob";

const openAI = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    }
});

export async function fetchChatFromOpenAI(data) {
    try {
        const response = await openAI.post(OPENAI_CHAT_API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat from OpenAI:', error);
        throw error;
    }
}

export async function fetchDescriptionOpenAI(userMessage) {
    const data = {
        messages:[
            {"role": "system", "content": "You are an experienced content creator. Your task is to create creative descriptions based on user's provided prompts. Descriptions should be suited for social medias, like youtube, facebook, tiktok."},
            {"role": "user", "content": `${userMessage}`}
        ],
        model: OPENAI_CHAT_MODEL,
        max_tokens: 150,        
        temperature: 1
    };

    const response = await fetchChatFromOpenAI(data);
    return  response.choices[0].message.content;
}

export async function fetchTranslationOpenAI(text, language) {
    const data = {
        messages:[
            {"role": "system", "content": `I want you to act as an algorithm for translation to language ${language}. System will provide you with a text, and your only task is to translate it to ${language}. Never break character.`},
            {"role": "user", "content": `${text}`}
        ],
        model: OPENAI_CHAT_MODEL,
        max_tokens: 300,        
        temperature: 1
    };

    return fetchChatFromOpenAI(data);
}

export async function fetchTranscriptionOpenAI(file) {
    try {
        const formData = new FormData();
        formData.append('model', OPENAI_TRANSCRIPTIONS_MODEL);
        formData.append('file', file);
        formData.append('response_format', TRANSCRIPTIONS_FORMAT);

        const response = await openAI.post(OPENAI_TRANSCRIPTIONS_API_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching transcription from OpenAI:', error);
        throw error;
    }
}

export async function fetchTextToSpeechOpenAI(input)
{
    console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY)
    const response = await axios({
        url: OPENAI_SPEECH_API_URL,
        method: 'POST',
        responseType: TEXT_TO_SPEECH_FORMAT,  // Ensures that the response is treated as binary data
        data: {
            model: OPENAI_SPEECH_MODEL,
            voice: "alloy",
            input: input
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
    });

    return response.data;
}

export async function fetchChatAssistantOpenAI(userMessage) {
    const data = {
        messages:[
            {"role": "system", "content": "You are a helpful assistant. Your task is to provide information about Lithuania. If the user question is not about Lithuania, do not answer."},
            {"role": "user", "content": `${userMessage}`}
        ],
        model: OPENAI_CHAT_MODEL,
        max_tokens: 150,        
        temperature: 1
    };

    const response = await fetchChatFromOpenAI(data);
    return  response.choices[0].message.content;
}