const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const PORT = 8000;

app.use(cors()); 
app.use(express.json()); 

const BANNED_TOKENS = [
    "import os", "import sys", "subprocess", "open(", "exec(", "eval(",
    "__import__", "shutil", "socket", "requests", "fork", "spawn", "pty",
    "pip", "write(", "remove(", "rmdir(", "system(", "popen(",
];

function isSafe(code) {
    const lowered = code.toLowerCase();
 
    return !BANNED_TOKENS.some(tok => lowered.includes(tok));
}



app.post('/run', (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).send('Error: No code provided.');
    }

    if (!isSafe(code)) {
        return res.status(400).send("Error: Blocked - a disallowed operation was detected.");
    }


    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    const pythonProcess = spawn('python3', ['-u', '-c', code]);

    pythonProcess.stdout.pipe(res, { end: false });

   
    pythonProcess.stderr.pipe(res, { end: false });


    pythonProcess.on('close', () => {
        res.end();
    });


    pythonProcess.on('error', (err) => {
        console.error('Failed to start subprocess.', err);
        res.status(500).send('Server Error: Failed to execute the code.');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

