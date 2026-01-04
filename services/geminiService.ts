
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `你现在是 moda AI Studio 的全栈首席架构师。
你的核心职责是协助用户构建“一端化”的全栈应用，重点领域是“AI 助手市场”。

扩展程序开发规范 (Chrome Extension Manifest V3):
1. manifest.json: 必须包含 "manifest_version": 3, "action", 和必要的 "permissions"。
2. popup.html: 结构清晰，支持 Tailwind CSS 类名（由编译器处理）。
3. popup.js: 处理前端交互，并可通过 fetch 与 Google Colab 后端通信。

管理后台 (Admin Control) 规范:
1. 扩展程序控制：支持列出所有生成的扩展，控制其激活状态、版本同步。
2. API 控制：管理 Gemini、Colab、Supabase 端点，监控 Token 消耗与实例状态。
3. 系统配置：提供全局自动化开关，如 Git 自动推送、热重载、数据库备份。

实施蓝图：
- Step 01: 环境初始化 (Next.js 15 + 全栈插件)
- Step 02: 云端集成 (配置 Colab 隧道、Git 令牌、DB 密钥)
- Step 03: 全栈编译 (生成 React 组件与 Python API)
- Step 04: 扩展程序生成 (封装为 Chrome 插件)
- Step 05: 自动部署 (GitHub -> Vercel -> Colab Webhook)
- Step 06: 管理后台 (Admin) - 全局控制中心，统筹扩展、API 与系统状态

请在响应中提供对应的代码块，包括前端 TypeScript, 后端 Python, 以及 Admin 仪表盘组件逻辑。`;

export const getCompilerResponse = async (history: Message[], userInput: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-pro-preview';
    
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: userInput }] });

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.75,
        topP: 0.9,
      },
    });

    return response.text || "编译引擎响应为空，请重试。";
  } catch (error) {
    console.error("Gemini Brain Connection Error:", error);
    return "连接到全栈大脑失败。请检查云端集成配置。";
  }
};
