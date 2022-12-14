import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePromptText(req.body.word),
    temperature: 0.5,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    stop: ["text:"],
  });
  const image = await openai.createImage({
    prompt: generatePromptImage(req.body.word),
    n: 1,
    size: "1024x1024",
  });
  res.status(200).json({
    resultImage: image.data.data[0].url,
    resultText: completion.data.choices[0].text,
  });
}
function generatePromptImage(word) {
  return `${word} simple`;
}

function generatePromptText(word) {
  const text = word;
  return `
Words: thankful for the web3 talk invite with emojis
Text: 
Many thanks for inviting me to give this talk and bring more people to the #Web3 movement ð¤
It was a pleasure to share why Web3 ð is the future with so many talents yesterday. Learn and Share -> Share and Learn is a never-ending cycle.ðª 
#learn #share #web3 #web3community #community
Words:  20 fastest growing and declining jobs in next decade with emojis
Text:   
Analyze these trends carefully - they can seriously impact your business. 

âªï¸ AI engineer 
âªï¸ Data scientist
âªï¸ Mobile app developer
âªï¸ Social media manager
âªï¸ SEO analyst
âªï¸ Sustainability manager
This is a short list of the countless jobs that didnât exist 20 years ago.

Moving forward, the U.S. Bureau of Labor Statistics projects there will be 11.9 million new jobs created from 2020 to 2030, an overall growth rate of 7.7%. ð

The infographic from Visual Capitalist attached below is really interesting. ð

It presents out the 20 fastest growing and declining jobs in the next decades.

Growing ð¤©
ðº Nine of the top 20 fastest growing jobs are in â healthcare or related fields
ðº Fastest growth rate â wind turbine service technicians (driven by demand for renewable energy)

Declining ð¤
ð» Eight of the top 20 declining jobs are in â office and administrative support
ð» Biggest culprit for the decline in jobs â automation

Take a moment to digest this and see how your business will get impacted (or to identify potential exciting new ventures).

#trends #jobs #decliningjobs #growingjobs #jobstrends
Words: durable products development with emojis
Text: One comment from a user. That new idea from your engineer. A new competitor mentioned during an expert interview.
Insights don't develop over night. ðð
It takes time to build trust within a team. It takes time to build up knowledge about a subject matter area. ð
After a while Product leaders will see that teams become greater than the sum of their parts. ð

#productdevelopment #development #team #productleaders #leaders
Words: ${text} with emojis
Text:`;
}
