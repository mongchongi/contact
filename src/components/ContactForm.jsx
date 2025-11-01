import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import useContacts from '../stores/useContacts';
import { Portrait, AddIcCall } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ContactForm = () => {
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { addContact } = useContacts();

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfile(imageUrl);
    } else {
      setProfile('');
    }
  };

  const handleAddContact = (e) => {
    e.preventDefault();

    const id = Math.random().toString(36).substring(2, 7);

    if (!name.trim() || !phoneNumber.trim()) {
      alert('이름 또는 전화번호를 입력하세요. ');
      return;
    }

    addContact(id, name, phoneNumber, profile);

    setProfile(null);
    setName('');
    setPhoneNumber('');
  };

  return (
    <Box component={'form'} display={'flex'} flexDirection={'column'} gap={2} onSubmit={handleAddContact}>
      <Box display={'flex'} alignItems={'end'} gap={2}>
        {profile ? (
          <img
            src={profile}
            alt='프로필'
            style={{
              display: 'block',
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '4px',
              background: '#3974CC',
              padding: '5px',
            }}
          />
        ) : (
          <Portrait color='secondary' sx={{ fontSize: 100, color: '#ffffff', bgcolor: '#3974CC', borderRadius: 1 }} />
        )}
        <Button component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
          사진 추가
          <VisuallyHiddenInput type='file' onChange={handleFileChange} multiple />
        </Button>
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <TextField
          id='outlined-basic'
          label='이름'
          variant='outlined'
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='전화번호'
          variant='outlined'
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Box>
      <Button variant='contained' type='submit'>
        <AddIcCall style={{ marginRight: '6px' }} />
        연락처 추가
      </Button>
    </Box>
  );
};

export default ContactForm;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
