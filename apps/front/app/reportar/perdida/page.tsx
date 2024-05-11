'use client';

import React, { useState } from 'react';
import Form from '@/components/Form';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { SearchingForMatches } from '@/components/LoadingStates/SearchingForMatches';
import { ObtainingPetDesc } from '@/components/LoadingStates/ObtainingPetDesc';
import { FormDataProvider } from '@/hooks/useFormData';

const PerdidasPage: React.FC = () => {
  const [showSearchingForMatches, setShowSearchingForMatches] = useState(false);
  const [showObtainPetDesc, setShowObtainPetDesc] = useState(false);
  return (
    <FormDataProvider>
      <Layout>
        {showSearchingForMatches && <SearchingForMatches />}
        {showObtainPetDesc && <ObtainingPetDesc />}

        <div
          className={
            !showSearchingForMatches && !showObtainPetDesc ? 'flex flex-col bg-mainGray px-6 py-5 gap-5' : 'hidden'
          }>
          <Header />
          <Form
            type='lost'
            setShowSearchingForMatches={setShowSearchingForMatches}
            setShowObtainPetDesc={setShowObtainPetDesc}
          />
        </div>
      </Layout>
    </FormDataProvider>
  );
};

export default PerdidasPage;
