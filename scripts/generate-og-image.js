const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");

async function generateOGImage() {
  const profileImagePath = path.join(process.cwd(), "public", "profile-image.png");
  let profileImageBase64 = "";
  if (fs.existsSync(profileImagePath)) {
    const buffer = fs.readFileSync(profileImagePath);
    profileImageBase64 = `data:image/png;base64,${buffer.toString("base64")}`;
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: 1200px;
      height: 630px;
      background-color: #06080e;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #f8fafc;
      overflow: hidden;
      position: relative;
      display: flex;
    }

    /* Ambient background glows */
    .glow-1 {
      position: absolute;
      width: 650px;
      height: 650px;
      left: -120px;
      top: -150px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(99, 102, 241, 0) 65%);
      pointer-events: none;
    }
    .glow-2 {
      position: absolute;
      width: 600px;
      height: 600px;
      right: -80px;
      bottom: -120px;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(56, 189, 248, 0) 65%);
      pointer-events: none;
    }
    .glow-3 {
      position: absolute;
      width: 400px;
      height: 400px;
      right: 320px;
      top: 40px;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0) 65%);
      pointer-events: none;
    }

    /* Subtle subtle grid overlay */
    .grid-pattern {
      position: absolute;
      inset: 0;
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
      pointer-events: none;
    }

    /* Main container card border */
    .container {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      padding: 56px 64px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    /* Top bar */
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .badge-status {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 8px 18px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 600;
      color: #6ee7b7;
      letter-spacing: 0.02em;
    }
    .dot-pulse {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background-color: #10b981;
      box-shadow: 0 0 12px #10b981;
    }
    .badge-role {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(99, 102, 241, 0.12);
      border: 1px solid rgba(99, 102, 241, 0.28);
      padding: 8px 18px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 600;
      color: #c7d2fe;
      letter-spacing: 0.02em;
    }

    /* Main body */
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
      margin-top: -10px;
    }
    .left-col {
      flex: 1;
      max-width: 720px;
    }
    .name {
      font-size: 58px;
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.08;
      color: #ffffff;
    }
    .role-title {
      font-size: 26px;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: #818cf8;
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .role-divider {
      color: #475569;
    }
    .role-sub {
      color: #cbd5e1;
      font-weight: 500;
      font-size: 22px;
    }
    .value-statement {
      font-size: 19px;
      line-height: 1.48;
      color: #94a3b8;
      margin-top: 14px;
      max-width: 650px;
    }
    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 24px;
    }
    .tech-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.11);
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #e2e8f0;
      letter-spacing: 0.01em;
    }

    /* Right column / Avatar */
    .right-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .avatar-wrapper {
      position: relative;
      width: 216px;
      height: 216px;
      padding: 4px;
      border-radius: 9999px;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #38bdf8 100%);
      box-shadow: 0 12px 36px -4px rgba(99, 102, 241, 0.45);
    }
    .avatar-inner {
      width: 100%;
      height: 100%;
      border-radius: 9999px;
      overflow: hidden;
      background: #0b0f19;
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
    }
    .location-tag {
      margin-top: 16px;
      font-size: 14px;
      font-weight: 500;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 6px;
      letter-spacing: 0.01em;
    }

    /* Bottom bar */
    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 18px;
    }
    .bottom-left {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 14px;
      color: #64748b;
    }
    .bottom-left-highlight {
      color: #818cf8;
      font-weight: 600;
    }
    .bottom-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .domain-pill {
      font-size: 15px;
      font-weight: 600;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 6px 16px;
      border-radius: 9999px;
      letter-spacing: 0.02em;
    }
  </style>
</head>
<body>
  <div class="glow-1"></div>
  <div class="glow-2"></div>
  <div class="glow-3"></div>
  <div class="grid-pattern"></div>

  <div class="container">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="badge-status">
        <span class="dot-pulse"></span>
        <span>Available for new projects</span>
      </div>
      <div class="badge-role">
        <span>Full-Stack · Web & Mobile</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content">
      <div class="left-col">
        <h1 class="name">Obafemi Olorede</h1>
        <div class="role-title">
          <span>Full-Stack Engineer</span>
          <span class="role-divider">/</span>
          <span class="role-sub">Distributed Systems</span>
        </div>
        <p class="value-statement">
          Architecting high-throughput backends, real-time event-driven pipelines, and intuitive, production-grade web & mobile applications.
        </p>

        <div class="tech-stack">
          <span class="tech-pill">Next.js</span>
          <span class="tech-pill">TypeScript</span>
          <span class="tech-pill">React</span>
          <span class="tech-pill">Node.js</span>
          <span class="tech-pill">PostgreSQL</span>
          <span class="tech-pill">Kafka</span>
          <span class="tech-pill">Redis</span>
          <span class="tech-pill">Docker</span>
        </div>
      </div>

      <div class="right-col">
        <div class="avatar-wrapper">
          <div class="avatar-inner">
            <img class="avatar-img" src="${profileImageBase64}" alt="Obafemi Olorede" />
          </div>
        </div>
        <div class="location-tag">
          <span>📍 Lagos, Nigeria · Global Remote</span>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="bottom-bar">
      <div class="bottom-left">
        <span class="bottom-left-highlight">~/portfolio</span>
        <span>·</span>
        <span>github.com/jasmondWorks</span>
      </div>
      <div class="bottom-right">
        <div class="domain-pill">obafemiolorede.com</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });

  await page.setContent(html, { waitUntil: "networkidle" });

  const outputPath = path.join(process.cwd(), "public", "og-image.png");
  await page.screenshot({ path: outputPath, type: "png" });

  console.log("Successfully generated OG image at:", outputPath);

  await browser.close();
}

generateOGImage().catch((err) => {
  console.error("Error generating OG image:", err);
  process.exit(1);
});
