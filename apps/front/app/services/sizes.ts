import supabaseClient from '../utils/supabase/client';

export const getSizes = async () => {
  const { data, error } = await supabaseClient.from('sizes').select('id, name');

  if (error) {
    if (error) throw new Error('Error on fetching sizes');
  }

  return data;
};
