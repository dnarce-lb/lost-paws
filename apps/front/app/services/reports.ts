import supabase from '../utils/supabase/client';

export type ReportType = 'lost' | 'found';

export interface Report {
  id: number;
  pictureUrl1?: string;
  pictureUrl2?: string;
  pictureUrl3?: string;
  lat?: number;
  lng?: number;
  formattedAddress?: string;
  animal?: string;
  gender?: string;
  breed?: string;
  size?: string;
  age?: string;
  color?: string;
  description?: string;
  name?: string;
  type?: ReportType;
  date?: Date;
}

export interface DatabaseReport {
  id: number;
  picture_url1?: string;
  picture_url2?: string;
  picture_url3?: string;
  lat?: number;
  lng?: number;
  formatted_address?: string;
  animal?: string;
  gender?: string;
  breed?: string;
  size?: string;
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
    animal: reportData.animal,
    gender: reportData.gender,
    breed: reportData.breed,
    size: reportData.size,
    color: reportData.color,
    description: reportData.description,
    type: reportData.type,
    date: reportData.date,
    name: reportData.name,
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
        animal: report.animal,
        gender: report.gender,
        color: report.color,
        breed: report.breed,
        size: report.size,
        age: report.age,
        date: report.date,
        description: report.description,
        name: report.name,
        type: report.type,
      },
    ])
    .select();

  if (error) {
    console.log(error);
    throw new Error('Error on creating report');
  }

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
      animal: reportUpdate?.animal,
      gender: reportUpdate?.gender,
      breed: reportUpdate?.breed,
      size: reportUpdate?.size,
      age: reportUpdate.age,
      description: reportUpdate.description,
      name: reportUpdate.name,
      type: reportUpdate.type,
    })
    .eq('id', id)
    .select('*');

  if (error) throw new Error('Error on updating report');

  return data;
};

export const getAllReports = async () => {
  const { data, error } = await supabase.from('reports').select('*');

  if (error) throw new Error('Error on fetching reports');

  return data.map(transformToReport);
};

export const getReportById = async (id: number) => {
  const { data, error } = await supabase.from('reports').select('*').eq('id', id);
  console.log("🚀 ~ getReportById ~ data:", data)

  if (error || !data) throw new Error('Error on fetching report');

  return transformToReport(data[0]);
};

export const getMatchingReports = async (id: number) => {
  try {
    const { data: report, error } = await supabase.from('reports').select('*').eq('id', id).single();

    if (error) throw new Error('Error on fetching report');

    const { data: matchingReports, error: matchingError } = await supabase
      .from('reports')
      .select('*')
      .eq('animal', report.animal)
      .eq('type', report.type === 'lost' ? 'found' : 'lost');

    if (matchingError) throw new Error('Error on fetching matching reports');

    const filteredReports = matchingReports.filter(
      matchingReport =>
        (!report.gender || matchingReport.gender === report.gender || matchingReport.gender === null) &&
        (!report.breed || matchingReport.breed === report.breed || matchingReport.breed === null) &&
        (!report.size || matchingReport.size === report.size || matchingReport.size === null) &&
        (!report.age || matchingReport.age === report.age || matchingReport.age === null)
    );

    return filteredReports.map(transformToReport);
  } catch (error) {
    throw new Error('An error occurred while fetching reports');
  }
};
