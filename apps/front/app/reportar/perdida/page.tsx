'use client';

import React, { useState } from 'react';
import Form from '@/components/Form';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { SearchingForMatches } from '@/components/LoadingStates/SearchingForMatches';
import { ObtainingPetDesc } from '@/components/LoadingStates/ObtainingPetDesc';

const PerdidasPage: React.FC = () => {
  const [showSearchingForMatches, setShowSearchingForMatches] = useState(false);
  const [showObtainPetDesc, setShowObtainPetDesc] = useState(false);
  return (
    <Layout>
      {showSearchingForMatches && <SearchingForMatches />}
      {showObtainPetDesc && <ObtainingPetDesc />}
      {!showSearchingForMatches && !showObtainPetDesc && (
        <>
          <Header />
          <Form setShowSearchingForMatches={setShowSearchingForMatches} setShowObtainPetDesc={setShowObtainPetDesc} />
        </>
      )}
    </Layout>
  );
};

export default PerdidasPage;
