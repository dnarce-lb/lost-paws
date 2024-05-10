import openai from '@/app/utils/openai';
import { PET_DESCRIPTION_PROMPT } from './prompts';

const getPetDescription = async (pictures: string[]) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'system', content: PET_DESCRIPTION_PROMPT },
      {
        role: 'user',
        content: pictures.map(url => ({
          type: 'image_url',
          image_url: {
            url,
            detail: 'low',
          },
        })),
      },
    ],
    max_tokens: 4096,
  });

  const result = completion.choices[0]?.message?.content;

  if (!result) {
    throw new Error('No result');
  }

  return result;
};

export default getPetDescription;
