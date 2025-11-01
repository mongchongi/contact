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
  const [isNameError, setIsNameError] = useState(false);
  const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);

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

  const handleChangeName = (e) => {
    const regex = /[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g;

    if (regex.test(e.target.value)) {
      setIsNameError(true);
    } else {
      setIsNameError(false);
    }

    setName(e.target.value);
  };

  const handleChangePhoneNumber = (e) => {
    const regex = /[^0-9-]/;

    if (regex.test(e.target.value)) {
      setIsPhoneNumberError(true);
    } else {
      setIsPhoneNumberError(false);
    }

    setPhoneNumber(e.target.value);
  };

  const handleAddContact = (e) => {
    e.preventDefault();

    const id = Math.random().toString(36).substring(2, 7);

    if (!name.trim() || !phoneNumber.trim()) {
      alert('이름 또는 전화번호를 입력하세요. ');
      return;
    }

    if (isNameError || isPhoneNumberError) {
      alert('이름 또는 전화번호 형식이 올바르지 않습니다.');
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
        <Box>
          <TextField
            id='outlined-basic'
            label='이름'
            variant='outlined'
            color={isNameError ? 'error' : ''}
            fullWidth
            value={name}
            onChange={handleChangeName}
          />
          {isNameError && (
            <p style={{ fontSize: '12px', marginTop: '8px', color: '#E15241' }}>
              한글과 영어 외의 문자는 입력할 수 없습니다.
            </p>
          )}
        </Box>
        <Box>
          <TextField
            id='outlined-basic'
            label='전화번호'
            variant='outlined'
            color={isPhoneNumberError ? 'error' : ''}
            fullWidth
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
          />
          {isPhoneNumberError && (
            <p style={{ fontSize: '12px', marginTop: '8px', color: '#E15241' }}>
              숫자와 하이픈(-) 외의 문자는 입력할 수 없습니다.
            </p>
          )}
        </Box>
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
