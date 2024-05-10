import openai from '@/app/utils/openai';
import { PET_COMPARISON_PROMPT } from './prompts';

const getPetComparisonResult = async (picturesPet1: string[], picturesPet2: string[]) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'system', content: PET_COMPARISON_PROMPT },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'First pet pictures:',
          },
          ...picturesPet1.map(url => ({
            type: 'image_url' as const,
            image_url: {
              url,
              detail: 'low' as const,
            },
          })),
        ],
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Second pet pictures:',
          },
          ...picturesPet2.map(url => ({
            type: 'image_url' as const,
            image_url: {
              url,
              detail: 'low' as const,
            },
          })),
        ],
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

export default getPetComparisonResult;
