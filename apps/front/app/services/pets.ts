import supabaseClient from '../utils/supabase/client';

export const getPetsData = async () => {
  const { data: pets, error } = await supabaseClient
    .from('pets')
    .select('id, name, age, color, description, breed(id, name), gender(id, name), animal(id, name), size(id, name)');

  if (error) {
    return 'no data';
  }

  return pets;
};
