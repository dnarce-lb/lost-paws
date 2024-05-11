import supabaseClient from '../utils/supabase/client';

export const getBreeds = async () => {
  const { data, error } = await supabaseClient.from('breeds').select('id, name');

  if (error) {
    if (error) throw new Error('Error on fetching breads');
  }

  return data;
};
