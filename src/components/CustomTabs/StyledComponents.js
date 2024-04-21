import { styled } from '@mui/material/styles';
import { buttonClasses, tabClasses, Box } from '@mui/material';
import { Tab as BaseTab, TabPanel as BaseTabPanel, TabsList as BaseTabsList , TextareaAutosize, Button as BaseButton} from '@mui/base';

const backgroundColor = "#000000";
const secondaryBackgroundColor = "#9E9E9E";
const buttonBackgroundColor = "";
const fontColor = "#F5F5F5";

export const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: ${fontColor};
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: auto;
  line-height: 1.5;
  padding: 8px 12px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  justify-content: center;
  
  &:hover {
    background-color: ${secondaryBackgroundColor};
  }

  &:focus {
    outline: 3px solid ${secondaryBackgroundColor};
  }

  &.${tabClasses.selected} {
    outline: 3px solid ${secondaryBackgroundColor};
  }
`;

export const TabPanel = styled(BaseTabPanel)`
  padding-top: 1rem;
  width: 90%;
  margin: auto;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

export const TabsList = styled(BaseTabsList)`
  min-width: 500px;
  background-color: ${backgroundColor};
  margin-bottom: 20px; 
  align-items: center;
  justify-content: center;
`;

export const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: theme.spacing(2)
}));
  
export const InputFieldContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
}));

export const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex', 
    alignItems: 'center', 
    marginBottom: theme.spacing(2)
}));

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1
});