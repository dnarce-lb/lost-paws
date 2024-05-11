import supabaseClient from '../utils/supabase/client';

export const getAnimals = async () => {
  const { data, error } = await supabaseClient.from('animals').select('id, name');

  if (error) {
    if (error) throw new Error('Error on fetching animals');
  }

  return data;
};
