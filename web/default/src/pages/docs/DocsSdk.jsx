import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useTranslation } from 'react-i18next';

const DocsSdk = () => {
  const { t } = useTranslation();

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{t('docs.sdk.title')}</h1>
        <p className='mt-2 text-lg text-muted-foreground'>
          {t('docs.sdk.description')}
        </p>
      </div>

      <Tabs defaultValue='python'>
        <TabsList>
          <TabsTrigger value='python'>Python</TabsTrigger>
          <TabsTrigger value='nodejs'>Node.js</TabsTrigger>
        </TabsList>

        <TabsContent value='python' className='space-y-6 pt-4'>
          <div className='space-y-3'>
            <h2 className='text-2xl font-semibold'>{t('docs.sdk.install')}</h2>
            <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
              <code>pip install openai</code>
            </pre>
          </div>

          <div className='space-y-3'>
            <h2 className='text-2xl font-semibold'>{t('docs.sdk.basic_usage')}</h2>
            <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
              <code>{`from openai import OpenAI

client = OpenAI(
    api_key="sk-your-api-key",
    base_url="https://api.alayanew.com/v1"
)

response = client.chat.completions.create(
    model="kimi-2.5",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Write a quicksort in Python"}
    ],
    temperature=0.7
)

print(response.choices[0].message.content)`}</code>
            </pre>
          </div>

          <div className='space-y-3'>
            <h2 className='text-2xl font-semibold'>{t('docs.sdk.streaming')}</h2>
            <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
              <code>{`stream = client.chat.completions.create(
    model="qwen-3.5",
    messages=[
        {"role": "user", "content": "Explain what RAG is"}
    ],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")`}</code>
            </pre>
          </div>

          <div className='space-y-3'>
            <h2 className='text-2xl font-semibold'>Embeddings</h2>
            <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
              <code>{`response = client.embeddings.create(
    model="text-embedding-v3",
    input="Hello world"
)

embedding = response.data[0].embedding
print(f"Dimensions: {len(embedding)}")`}</code>
            </pre>
          </div>

          <div className='space-y-3'>
            <h2 className='text-2xl font-semibold'>{t('docs.sdk.env_vars')}</h2>
            <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
              <code>{`# .env
OPENAI_API_KEY=sk-your-api-key
OPENAI_API_BASE=https://api.alayanew.com/v1`}</code>
            </pre>
            <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
              <code>{`import os
from openai import OpenAI

# SDK auto-reads OPENAI_API_KEY and OPENAI_API_BASE
client = OpenAI()

response = client.chat.completions.create(
    model="kimi-2.5",
    messages=[{"role": "user", "content": "Hello"}]
)
print(response.choices[0].message.content)`}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value='nodejs' className='space-y-6 pt-4'>
          <div className='space-y-3'>
            <h2 className='text-2xl font-semibold'>{t('docs.sdk.install')}</h2>
            <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
              <code>npm install openai</code>
            </pre>
          </div>

          <div className='space-y-3'>
            <h2 className='text-2xl font-semibold'>{t('docs.sdk.basic_usage')}</h2>
            <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
              <code>{`import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'sk-your-api-key',
  baseURL: 'https://api.alayanew.com/v1',
});

async function main() {
  const response = await client.chat.completions.create({
    model: 'kimi-2.5',
    messages: [
      { role: 'system', content: 'You are a helpful assistant' },
      { role: 'user', content: 'Write a debounce function in JavaScript' },
    ],
    temperature: 0.7,
  });

  console.log(response.choices[0].message.content);
}

main();`}</code>
            </pre>
          </div>

          <div className='space-y-3'>
            <h2 className='text-2xl font-semibold'>{t('docs.sdk.streaming')}</h2>
            <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
              <code>{`const stream = await client.chat.completions.create({
  model: 'qwen-3.5',
  messages: [
    { role: 'user', content: 'Explain what RAG is' },
  ],
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || '';
  process.stdout.write(content);
}`}</code>
            </pre>
          </div>

          <div className='space-y-3'>
            <h2 className='text-2xl font-semibold'>{t('docs.sdk.env_vars')}</h2>
            <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
              <code>{`# .env
OPENAI_API_KEY=sk-your-api-key
OPENAI_BASE_URL=https://api.alayanew.com/v1`}</code>
            </pre>
            <pre className='overflow-x-auto rounded-md bg-zinc-950 p-3 text-sm text-zinc-100'>
              <code>{`// SDK auto-reads OPENAI_API_KEY
const client = new OpenAI({
  baseURL: process.env.OPENAI_BASE_URL,
});`}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocsSdk;
