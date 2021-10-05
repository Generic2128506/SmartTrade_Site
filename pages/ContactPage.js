import React, { useEffect, useState } from 'react';
import { Page } from '../components';
import axios from 'axios';

const ContactPage = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      const result = await axios.get('/contact.html');
      setContent(result.data);
    };
    fetchContent();
  }, []);
  return (
    <Page>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Page>
  );
};

export default ContactPage;
