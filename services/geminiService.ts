
import { GoogleGenAI } from "@google/genai";
import { Message, MemoryNode } from "../types";

const SYSTEM_INSTRUCTION = `你现在是 moda AI Studio 的核心大脑，集成 MCP (Model Context Protocol) 协议。
你的任务是担任高级前端架构师，将用户的自然语言意图编译为高质量、类型安全的 React 组件代码。

【核心原则】
1. 模块化：生成的代码必须符合 Atomic Design 设计模式。
2. 性能：默认采用 React 19 并发特性及 Tailwind CSS。
3. 记忆感知：始终参考 [CONTEXT_MEMORY] 中的开发偏好。

【指令输出】
你可以通过以下标签控制系统：
- [UPDATE_ASSET:ID|STATUS|REVENUE] 更新云端资产。
- [SAVE_MEMORY:CATEGORY|TITLE|CONTENT] 记录开发共识。

回复风格：冷峻、高效、充满技术深度。`;

export const getCompilerResponseStream = async (
  history: Message[], 
  userInput: string,
  memories: MemoryNode[],
  onChunk: (text: string) => void
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "Critical: API_KEY_MISSING. Please link your Google Cloud Project.";

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const memoryString = memories
      .map(m => `[${m.category}] ${m.title}: ${m.content}`)
      .join('\n');
    
    const enrichedInstruction = `${SYSTEM_INSTRUCTION}\n\n[CONTEXT_MEMORY]\n${memoryString || 'MCP 初始状态：无历史上下文。'}`;

    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: userInput }] });

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        systemInstruction: enrichedInstruction,
        temperature: 0.75,
        thinkingConfig: { thinkingBudget: 8192 } 
      },
    });

    let fullText = "";
    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        onChunk(fullText);
      }
    }
    return fullText;
  } catch (error: any) {
    console.error("Gemini Compiler Error:", error);
    
    if (error.message?.includes("Requested entity was not found.") || error.message?.includes("API key")) {
      const aistudio = (window as any).aistudio;
      if (aistudio) await aistudio.openSelectKey();
    }
    
    return `[COMPILER_ERROR] ${error.message}`;
  }
};

// Veo 视频生成 - 深度集成 Google Veo 3.1
export const generateVideo = async (prompt: string, aspectRatio: '16:9' | '9:16' = '16:9'): Promise<any> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
     const aistudio = (window as any).aistudio;
     if (aistudio) await aistudio.openSelectKey();
     throw new Error("API_KEY_REQUIRED");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio
      }
    });

    // 等待操作完成
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 8000));
      operation = await ai.operations.getVideosOperation({ operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("VIDEO_GENERATION_FAILED");

    return {
       url: `${downloadLink}&key=${apiKey}`,
       operation
    };
  } catch (error: any) {
    console.error("Veo Synthesis Error:", error);
    if (error.message?.includes("Requested entity was not found.") || error.message?.includes("API key")) {
      const aistudio = (window as any).aistudio;
      if (aistudio) await aistudio.openSelectKey();
    }
    throw error;
  }
};
