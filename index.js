const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html; charset=UTF-8"
    });

    res.end(`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>DevOps CI/CD Pipeline</title>

            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                body {
                    font-family: Arial, Helvetica, sans-serif;
                    min-height: 100vh;
                    background:
                        radial-gradient(circle at top left, #1e3a5f, transparent 40%),
                        radial-gradient(circle at bottom right, #312e81, transparent 40%),
                        #0f172a;
                    color: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 30px;
                }

                .container {
                    width: 100%;
                    max-width: 900px;
                    background: rgba(15, 23, 42, 0.88);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 20px;
                    padding: 50px;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
                    backdrop-filter: blur(12px);
                }

                .badge {
                    display: inline-block;
                    padding: 7px 15px;
                    border: 1px solid #38bdf8;
                    border-radius: 20px;
                    color: #38bdf8;
                    font-size: 13px;
                    font-weight: bold;
                    letter-spacing: 1px;
                    margin-bottom: 20px;
                }

                h1 {
                    font-size: 42px;
                    margin-bottom: 12px;
                    letter-spacing: -1px;
                }

                .subtitle {
                    color: #94a3b8;
                    font-size: 18px;
                    line-height: 1.6;
                    margin-bottom: 30px;
                }

                .status {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.3);
                    border-radius: 10px;
                    padding: 15px 20px;
                    margin-bottom: 40px;
                    color: #4ade80;
                    font-weight: bold;
                }

                .status-dot {
                    width: 10px;
                    height: 10px;
                    background: #22c55e;
                    border-radius: 50%;
                    box-shadow: 0 0 12px #22c55e;
                }

                .section-title {
                    color: #cbd5e1;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 20px;
                }

                .pipeline {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .stage {
                    min-width: 150px;
                    padding: 20px 15px;
                    background: rgba(30, 41, 59, 0.8);
                    border: 1px solid rgba(148, 163, 184, 0.2);
                    border-radius: 12px;
                    text-align: center;
                    transition: 0.3s;
                }

                .stage:hover {
                    transform: translateY(-5px);
                    border-color: #38bdf8;
                    box-shadow: 0 10px 25px rgba(56, 189, 248, 0.15);
                }

                .stage-name {
                    font-weight: bold;
                    font-size: 16px;
                    margin-bottom: 8px;
                }

                .stage-description {
                    font-size: 12px;
                    color: #94a3b8;
                }

                .arrow {
                    color: #38bdf8;
                    font-size: 22px;
                    font-weight: bold;
                }

                .footer {
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                    text-align: center;
                    color: #64748b;
                    font-size: 13px;
                }

                @media (max-width: 700px) {
                    .container {
                        padding: 30px 20px;
                    }

                    h1 {
                        font-size: 32px;
                    }

                    .arrow {
                        display: none;
                    }

                    .stage {
                        width: 100%;
                    }
                }
            </style>
        </head>

        <body>

            <div class="container">

                <div class="badge">
                    NODE.JS APPLICATION
                </div>

                <h1>DevOps CI/CD Pipeline</h1>

                <p class="subtitle">
                    A simple web application demonstrating automated
                    build and deployment using modern DevOps tools.
                </p>

                <div class="status">
                    <div class="status-dot"></div>
                    Application Status: Online
                </div>

                <div class="section-title">
                    Deployment Pipeline
                </div>

                <div class="pipeline">

                    <div class="stage">
                        <div class="stage-name">
                            GitHub
                        </div>
                        <div class="stage-description">
                            Source Code
                        </div>
                    </div>

                    <div class="arrow">
                        →
                    </div>

                    <div class="stage">
                        <div class="stage-name">
                            GitHub Actions
                        </div>
                        <div class="stage-description">
                            CI/CD Automation
                        </div>
                    </div>

                    <div class="arrow">
                        →
                    </div>

                    <div class="stage">
                        <div class="stage-name">
                            Docker
                        </div>
                        <div class="stage-description">
                            Container Build
                        </div>
                    </div>

                    <div class="arrow">
                        →
                    </div>

                    <div class="stage">
                        <div class="stage-name">
                            Docker Hub
                        </div>
                        <div class="stage-description">
                            Image Registry
                        </div>
                    </div>

                </div>

                <div class="footer">
                    DevOps Internship Task 1
                </div>

            </div>

        </body>
        </html>
    `);
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});