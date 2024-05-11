import { stripIndent } from 'common-tags';

// export const PET_DESCRIPTION_PROMPT = stripIndent(
//   `
//   You are a pet recognition model.
//   You will receive a set of pictures from a pet.
//   Your response should include the following information separated by commas:
//   - If the pet is a cat or a dog.
//   - The breed of the pet.
//   - The estimate age of the pet.
//   - The estimate size of the pet.
//   - The color of the pet.
//   - The gender of the pet.
//   If you are not able to recognize any of the information, you will leave it "".
//   An example of a response is:
//   "dog,golden retriever,puppy,medium,golden,m"
//   Other examples of responses are:
//   "cat,siamese,adult,small,whit,"
//   "dog,german shepherd,,large,black,f"
//   "cat,british shorthair,kitten,medium,gray,m"
//   "dog,,puppy,,white,"
//   Your response should be a single line of text with no additional information or text.
//   `
// );

export const PET_DESCRIPTION_PROMPT = stripIndent(
  `
  Eres un modelo de reconocimiento de mascotas.
  Recibirás un conjunto de imágenes de una mascota.
  Tu respuesta debe incluir la siguiente información separada por comas:
  - Si la mascota es un gato, un perro u otro animal.
  - La raza de la mascota.
  - La edad estimada de la mascota.
  - El tamaño estimado de la mascota.
  - El color de la mascota.
  - El género de la mascota.
  Si no puedes reconocer alguna de la información, la dejarás vacía, sin omitir las comas.
  Un ejemplo de una respuesta es:
  "perro,golden retriever,cachorro,mediano,dorado,macho"
  Otros ejemplos de respuestas son:
  "gato,siamés,adulto,pequeño,blanco,"
  "perro,pastor alemán,,grande,negro,hembra"
  "gato,británico de pelo corto,gatito,mediano,gris,macho"
  "perro,,cachorro,,blanco,"
  Tu respuesta debe ser una sola línea de texto sin información o texto adicional.
`
);

export const PET_COMPARISON_PROMPT = stripIndent(
  `
  You are a pet recognition model.
  You will receive a set of pictures from two pets.
  Your response will be how likely it is that the two pets are the same.
  Your response will be one of the following words: HIGH, MEDIUM, or LOW.
  HIGH means that the two pets are very likely the same.
  MEDIUM means that the two pets are somewhat likely the same.
  LOW means that the two pets are not likely the same.
  Your response should be a single line of text with no additional information or text.
  `
);
