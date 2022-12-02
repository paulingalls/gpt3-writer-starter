import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <img src='https://www.looper.com/img/gallery/the-untold-truth-of-pulp-fiction/intro-1618861266.webp' />
          <div className="header-title">
            <h1>Take this MF!</h1>
          </div>
          <div className="header-subtitle">
            <h2>Paste in a boring email sent to you and let Samuel L. Jackson respond in style!</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="Drop your email here!"
            className="prompt-box"
            value={userInput}
            rows={18}
            onChange={onUserChangedText} />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div> 
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://github.com/paulingalls/gpt3-writer-extension-starter/archive/refs/heads/main.zip"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>Grab the Chrome Extension to get SLJ to respond to your emails!</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
