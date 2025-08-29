import React, { useState } from 'react';
import './App.css'; 


export default function App() {
  const [code, setCode] = useState('import time\n\nfor i in range(5):\n    print(f"Streaming output... #{i}")\n    time.sleep(0.5)');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = 'http://localhost:8000/run';

  const handleSubmit = async () => {
    setIsLoading(true);
    setOutput('');
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      if (!response.body) {
          throw new Error('Response body is null.');
      }

     
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        setOutput((prevOutput) => prevOutput + chunk);
      }

    } catch (err) {
      setError(`Execution failed. Is the server running?\nError: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Python Compiler</h1>
      </header>
      {}
      <main className="main-content">
        
        <div className="editor-container">
          <textarea
            className="editor-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your Python code here..."
            spellCheck="false"
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="run-button"
          >
            {isLoading ? 'Executing...' : 'Run Code'}
          </button>
        </div>

        {}
        <div className="output-container">
          <h2 className="sidebar-header">Output</h2>
          <pre className="output-content">
            {output && <code className="output-text">{output}</code>}
            {error && <code className="error-text">{error}</code>}
            {!isLoading && !output && !error && <span className="placeholder-text">Execution output will appear here.</span>}
            {isLoading && !output && <span className="placeholder-text">Running code...</span>}
          </pre>
        </div>
      </main>
    </div>
  );
}