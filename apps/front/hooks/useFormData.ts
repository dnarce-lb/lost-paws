'use client';

import constate from 'constate';
import { useEffect, useState } from 'react';
import {
  DatabaseAnimal,
  DatabaseBreed,
  DatabaseGender,
  DatabaseSize,
  Report,
  ReportType,
  createReport,
} from '@/app/services/reports';

export type FormData = {
  pictureUrl1?: string;
  pictureUrl2?: string;
  pictureUrl3?: string;
  lat?: number;
  lng?: number;
  formattedAddress?: string;
  animal?: DatabaseAnimal;
  gender?: DatabaseGender;
  breed?: DatabaseBreed;
  size?: DatabaseSize;
  age?: string;
  color?: string;
  description?: string;
  name?: string;
  type?: ReportType;
  date?: Date;
};

const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    pictureUrl1: '',
    pictureUrl2: '',
    pictureUrl3: '',
    lat: 0,
    lng: 0,
    date: new Date(),
    formattedAddress: '',
    animal: { id: 1, name: 'Perro' },
    gender: { id: 1, name: 'Macho' },
  });
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ filesToUpload', filesToUpload);
  }, [filesToUpload]);

  const handleChange = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  const handleMultipleChange = (newVal: any) => {
    setFormData({
      ...formData,
      ...newVal,
    });
  };

  const submit = async () => {
    try {
      const response = await createReport(formData as Report);
      console.log('🚀 ~ submit ~ responseJson:', response);
      return response;
    } catch (error) {
      console.log('🚀 ~ submit ~ error:', error);
    }
  };

  const uploadImages = async () => {
    const results = [];
    for (let i = 0; i < filesToUpload.length; i += 1) {
      const formData = new FormData();
      formData.append('file', filesToUpload[i]);
      const result = await fetch('/api/images', { method: 'POST', body: formData });
      const resultJson = await result.json();
      results.push(resultJson);
    }

    const images = results.map((result, index) => ({ [`pictureUrl${index + 1}`]: result.publicURL }));
    setFormData({
      ...formData,
      ...Object.assign({}, ...images),
    });
  };

  return {
    formData,
    handleChange,
    handleMultipleChange,
    submit,
    setFilesToUpload,
    uploadImages,
  };
};

export const [FormDataProvider, useFormDataContext] = constate(useFormData);
