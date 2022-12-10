import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.word),
    temperature: 0.5,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    stop: ["text:"],
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(word) {
  const text = word;
  return `
Words: thankful for the web3 talk invite
Text: 
Many thanks for inviting me to give this talk and bring more people to the #Web3 movement :)
It was a pleasure to share why Web3 is the future with so many talents yesterday. Learn and Share -> Share and Learn is a never-ending cycle. 
#learn #share #web3 #web3community #community
Words:  20 fastest growing and declining jobs in next decade
Text:   
Analyze these trends carefully - they can seriously impact your business.

▪️ AI engineer
▪️ Data scientist
▪️ Mobile app developer
▪️ Social media manager
▪️ SEO analyst
▪️ Sustainability manager
This is a short list of the countless jobs that didn’t exist 20 years ago.

Moving forward, the U.S. Bureau of Labor Statistics projects there will be 11.9 million new jobs created from 2020 to 2030, an overall growth rate of 7.7%.

The infographic from Visual Capitalist attached below is really interesting. 👇

It presents out the 20 fastest growing and declining jobs in the next decades.

Growing:
🔺 Nine of the top 20 fastest growing jobs are in → healthcare or related fields
🔺 Fastest growth rate → wind turbine service technicians (driven by demand for renewable energy)

Declining:
🔻 Eight of the top 20 declining jobs are in → office and administrative support
🔻 Biggest culprit for the decline in jobs → automation

Take a moment to digest this and see how your business will get impacted (or to identify potential exciting new ventures).

#trends #jobs #decliningjobs #growingjobs #jobstrends
Words: durable products development
Text: One comment from a user. That new idea from your engineer. A new competitor mentioned during an expert interview.
Insights don't develop over night.
It takes time to build trust within a team. It takes time to build up knowledge about a subject matter area.
After a while Product leaders will see that teams become greater than the sum of their parts.

#productdevelopment #development #team #productleaders #leaders
Words: ${text}
Text:`;
}
