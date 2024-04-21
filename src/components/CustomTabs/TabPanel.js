import { Tabs } from '@mui/base';
import TranscriptionsForm from "./TranscriptionsForm";
import DescriptionsForm from './DescriptionsForm';
import TranslationsForm from './TranslationsForm';
import TextToSpeechForm from './TextToSpeechForm';
import { Tab, TabPanel, TabsList } from './StyledComponents';
import { Children } from 'react';


function CustomTabPanel() {
    return (
        <Tabs defaultValue={1}>
            <TabsList>
                <Tab value={1}>Transcriptions</Tab>
                <Tab value={2}>Descriptions</Tab>
                <Tab value={3}>Translations</Tab>
                <Tab value={4}>Text to Speech</Tab>
            </TabsList>
            <TabPanel value={1}>
                <TranscriptionsForm/>
            </TabPanel>
            <TabPanel value={2}>
                <DescriptionsForm/>
            </TabPanel>
            <TabPanel value={3}>
                <TranslationsForm/>
            </TabPanel>
            <TabPanel value={4}>
                <TextToSpeechForm/>
            </TabPanel>
        </Tabs>   
    )
}

export default CustomTabPanel;