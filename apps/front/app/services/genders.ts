import supabaseClient from '../utils/supabase/client';

export const getGenders = async () => {
  const { data, error } = await supabaseClient.from('genders').select('id, name');

  if (error) {
    if (error) throw new Error('Error on fetching genders');
  }

  return data;
};
