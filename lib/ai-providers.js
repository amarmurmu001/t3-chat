const PROVIDERS = {
  groq: {
    baseUrl: "https://api.groq.com/openai/v1/chat/completions",
    apiKeyHeader: "Authorization",
    getApiKey: () => process.env.GROQ_API_KEY,
  },
  nvidia: {
    baseUrl: "https://integrate.api.nvidia.com/v1/chat/completions",
    apiKeyHeader: "Authorization",
    getApiKey: () => process.env.NVIDIA_API_KEY,
  },
}

const MODEL_PROVIDER_MAP = {
  "groq/llama-3.3-70b-versatile": "groq",
  "groq/llama-3.1-8b-instant": "groq",
  "groq/mixtral-8x7b-32768": "groq",
  "groq/gemma2-9b-it": "groq",
  "qwen/qwen3.5-397b-a17b": "nvidia",
}

export function getProviderForModel(modelId) {
  const providerKey = MODEL_PROVIDER_MAP[modelId] || "nvidia"
  return PROVIDERS[providerKey]
}

export function getAvailableModels() {
  return [
    {
      id: "qwen/qwen3.5-397b-a17b",
      name: "Qwen 3.5 397B",
      description: "NVIDIA hosted Qwen 3.5 397B",
      context_length: 16384,
      architecture: { modility: "text-text" },
      pricing: { prompt: "0", completion: "0" },
      top_provider: "NVIDIA",
    },
    {
      id: "groq/llama-3.3-70b-versatile",
      name: "Llama 3.3 70B",
      description: "Groq hosted Llama 3.3 70B (fast inference)",
      context_length: 32768,
      architecture: { modility: "text-text" },
      pricing: { prompt: "0", completion: "0" },
      top_provider: "Groq",
    },
    {
      id: "groq/llama-3.1-8b-instant",
      name: "Llama 3.1 8B Instant",
      description: "Groq hosted Llama 3.1 8B (fast inference)",
      context_length: 32768,
      architecture: { modility: "text-text" },
      pricing: { prompt: "0", completion: "0" },
      top_provider: "Groq",
    },
    {
      id: "groq/mixtral-8x7b-32768",
      name: "Mixtral 8x7B",
      description: "Groq hosted Mixtral 8x7B (fast inference)",
      context_length: 32768,
      architecture: { modility: "text-text" },
      pricing: { prompt: "0", completion: "0" },
      top_provider: "Groq",
    },
    {
      id: "groq/gemma2-9b-it",
      name: "Gemma 2 9B",
      description: "Groq hosted Gemma 2 9B (fast inference)",
      context_length: 8192,
      architecture: { modility: "text-text" },
      pricing: { prompt: "0", completion: "0" },
      top_provider: "Groq",
    },
  ]
}
