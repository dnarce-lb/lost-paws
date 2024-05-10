import supabase from '../utils/supabase/client';

type ReportType = 'lost' | 'found';

export interface Report {
  id?: number;
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
}

export interface DatabaseAnimal {
  id: number;
  name: string;
}

export interface DatabaseGender {
  id: number;
  name: string;
}

export interface DatabaseBreed {
  id: number;
  name: string;
}
export interface DatabaseSize {
  id: number;
  name: string;
}

export interface DatabaseReport {
  id?: number;
  picture_url1?: string;
  picture_url2?: string;
  picture_url3?: string;
  lat?: number;
  lng?: number;
  formatted_address?: string;
  animals?: DatabaseAnimal;
  genders?: DatabaseGender;
  breeds?: DatabaseBreed;
  sizes?: DatabaseSize;
  age?: string;
  color?: string;
  description?: string;
  name?: string;
  type?: ReportType;
  date?: Date;
}

const transformToReport = (reportData: DatabaseReport): Report => {
  return {
    id: reportData.id,
    pictureUrl1: reportData.picture_url1,
    pictureUrl2: reportData.picture_url2,
    pictureUrl3: reportData.picture_url3,
    lat: reportData.lat,
    lng: reportData.lng,
    formattedAddress: reportData.formatted_address,
    animal: reportData.animals,
    gender: reportData.genders,
    breed: reportData.breeds,
    size: reportData.sizes,
    color: reportData.color,
    description: reportData.description,
    type: reportData.type,
    date: reportData.date,
  };
};

export const createReport = async (report: Report) => {
  const { data, error } = await supabase
    .from('reports')
    .insert([
      {
        picture_url1: report.pictureUrl1,
        picture_url2: report.pictureUrl2,
        picture_url3: report.pictureUrl3,
        lat: report.lat,
        lng: report.lng,
        formatted_address: report.formattedAddress,
        animal_id: report.animal?.id,
        gender_id: report.gender?.id,
        breed_id: report.breed?.id,
        size_id: report.size?.id,
        age: report.age,
        description: report.description,
        name: report.name,
        type: report.type,
      },
    ])
    .select();

  if (error) throw new Error('Error on creating report');

  return data;
};

export const updateReport = async (id: number, reportUpdate: Partial<Report>) => {
  const { data, error } = await supabase
    .from('reports')
    .update({
      picture_url1: reportUpdate.pictureUrl1,
      picture_url2: reportUpdate.pictureUrl2,
      picture_url3: reportUpdate.pictureUrl3,
      lat: reportUpdate.lat,
      lng: reportUpdate.lng,
      formatted_address: reportUpdate.formattedAddress,
      animal_id: reportUpdate.animal?.id,
      gender_id: reportUpdate.gender?.id,
      breed_id: reportUpdate.breed?.id,
      size_id: reportUpdate.size?.id,
      age: reportUpdate.age,
      description: reportUpdate.description,
      name: reportUpdate.name,
      type: reportUpdate.type,
    })
    .eq('id', id)
    .select('*, animals(id, name), genders(id, name), breeds(id, name), sizes(id, name)');

  if (error) throw new Error('Error on updating report');

  return data;
};

export const getAllReports = async () => {
  const { data, error } = await supabase
    .from('reports')
    .select('*, animals(id, name), genders(id, name), breeds(id, name), sizes(id, name)');

  if (error) throw new Error('Error on fetching reports');

  return data.map(transformToReport);
};

export const getReportById = async (id: number) => {
  const { data, error } = await supabase
    .from('reports')
    .select('*, animals(id, name), genders(id, name), breeds(id, name), sizes(id, name)')
    .eq('id', id);

  if (error) throw new Error('Error on fetching report');

  return data ? transformToReport(data[0]) : null;
};