import { Box, IconButton, TextField } from '@mui/material';
import useContacts from '../stores/useContacts';
import { Portrait, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const ContactList = () => {
  const [keyword, setKeyword] = useState('');
  const [currentContacts, setCurrentContacts] = useState([]);

  const { contacts, deleteContact } = useContacts();

  const handleSearchContacts = (e) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);

    const searchedContacts = contacts.filter(
      (contact) => contact.name.includes(newKeyword) || contact.phoneNumber.includes(newKeyword)
    );
    setCurrentContacts(searchedContacts);
  };

  const handleDeleteContact = (id, name) => {
    const isConfirmed = window.confirm(`"${name}"의 연락처를 삭제하시겠습니까?`);

    if (isConfirmed) {
      deleteContact(id);
    }
  };

  useEffect(() => {
    setCurrentContacts(contacts);
    setKeyword('');
  }, [contacts]);

  return (
    <Box display={'flex'} flexDirection={'column'} border={'5px solid #3974CC'} gap={1} borderRadius={1} padding={1}>
      <Box>
        <Box display={'flex'} justifyContent={'end'} gap={1}>
          <TextField
            id='outlined-basic'
            label='검색'
            variant='outlined'
            value={keyword}
            onChange={handleSearchContacts}
          />
        </Box>
      </Box>
      <Box>
        {currentContacts.length === 0 ? (
          <Box textAlign={'center'}>
            <p style={{ color: '#3974CC' }}>표시할 연락처가 없습니다.</p>
          </Box>
        ) : (
          currentContacts.map((contact, index) => {
            const isLastContact = index === currentContacts.length - 1;

            return (
              <Box
                key={contact.id}
                display={'flex'}
                alignItems={'center'}
                gap={1}
                padding={'8px 0'}
                borderBottom={isLastContact ? 'none' : '1px dashed #CBCBCB'}
              >
                <Box display={'flex'} alignItems={'end'} gap={2}>
                  {contact.profile ? (
                    <img
                      src={contact.profile}
                      alt='프로필'
                      style={{
                        display: 'block',
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        background: '#3974CC',
                        padding: '5px',
                      }}
                    />
                  ) : (
                    <Portrait
                      color='secondary'
                      sx={{ fontSize: 60, color: '#ffffff', bgcolor: '#3974CC', borderRadius: 1 }}
                    />
                  )}
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={1}>
                  <h3 style={{ margin: '0' }}>{contact.name}</h3>
                  <p style={{ margin: '0' }}>{contact.phoneNumber}</p>
                </Box>
                <IconButton
                  aria-label='delete'
                  color='error'
                  style={{ marginLeft: 'auto' }}
                  onClick={() => handleDeleteContact(contact.id, contact.name)}
                >
                  <Delete />
                </IconButton>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default ContactList;
