import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Page } from '../components';

const AboutPage = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      const result = await axios.get('/about.html');
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

export default AboutPage;
