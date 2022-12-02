import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const summaryPromptPrefix = 
`
Summarize the following text in less than 100 words, hitting the important statements and requests:

Text:
`;
const summaryPromptSuffix = 
`
Summary:
`;
const responsePromptPrefix = `
Respond to the following text in the style of Samuel L. Jackson in the movie Pulp Fiction:

Text:
`;
const responsePromptSuffix = `

Response:
`
const generateAction = async (req, res) => {
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${summaryPromptPrefix}${req.body.userInput}${summaryPromptSuffix}`,
    temperature: 0.5,
    max_tokens: 150,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();
  const secondPrompt = `${responsePromptPrefix}${basePromptOutput.text}${responsePromptSuffix}`;

  const responseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: secondPrompt,
    temperature: 0.7,
    max_tokens: 150,
  });

  const responsePromptOutput = responseCompletion.data.choices.pop();
  res.status(200).json({ output: responsePromptOutput });
};

export default generateAction;