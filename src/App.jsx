import { Box, Grid, IconButton } from '@mui/material';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { Publish } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const App = () => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const windowHeight = window.innerHeight;
      const documentHeight = entry.contentRect.height;
      setIsOverflowing(windowHeight < documentHeight);
    }
  });

  useEffect(() => {
    observer.observe(document.documentElement);
  }, []);

  return (
    <Box padding={2}>
      <h1 style={{ textAlign: 'center', color: '#3974CC' }}>나의 연락처</h1>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ContactForm />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <ContactList />
        </Grid>
      </Grid>
      {isOverflowing && (
        <IconButton
          style={{ color: '#3974CC', position: 'fixed', bottom: '16px', right: '16px' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Publish fontSize='large' />
        </IconButton>
      )}
    </Box>
  );
};

export default App;
