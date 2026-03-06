import type { Article, Notification } from "../backend.d";

const nowNano = BigInt(Date.now()) * BigInt(1_000_000);
const hoursAgo = (h: number) =>
  nowNano - BigInt(h * 3_600_000) * BigInt(1_000_000);

export const sampleArticles: Article[] = [
  {
    id: BigInt(1),
    title:
      "OpenAI Releases GPT-5 with Native Multimodal Reasoning Capabilities",
    source: "The Verge",
    url: "https://theverge.com",
    category: "AI",
    tags: ["GPT-5", "OpenAI", "LLM", "Multimodal"],
    publishedAt: hoursAgo(1),
    isBreaking: true,
    summary:
      "OpenAI has unveiled GPT-5, its most capable model to date, featuring native multimodal reasoning that seamlessly integrates text, images, audio, and video analysis in a single inference pass. The model demonstrates a significant leap in mathematical reasoning, scoring 98.3% on MATH benchmarks, and introduces a new 'deep reasoning' mode that can spend up to 10 minutes on complex multi-step problems before generating an answer. Enterprise customers report a 40% reduction in hallucination rates compared to GPT-4o. GPT-5 also introduces native tool use with 'function meshes' — interconnected tool chains that can autonomously decompose tasks and delegate subtasks to specialized micro-agents. The context window has expanded to 512K tokens. Early access begins rolling out to ChatGPT Plus and Enterprise users immediately, with API access following in two weeks.",
  },
  {
    id: BigInt(2),
    title:
      "Google DeepMind's AlphaFold 3 Predicts RNA and DNA Structures with Near-Atomic Precision",
    source: "Nature",
    url: "https://nature.com",
    category: "Research",
    tags: ["AlphaFold", "DeepMind", "Biology", "Proteins"],
    publishedAt: hoursAgo(3),
    isBreaking: false,
    summary:
      "Google DeepMind has published AlphaFold 3 in Nature, extending the landmark protein structure prediction system to RNA, DNA, and small molecule interactions. The new model achieves atomic-level accuracy for 94% of RNA tertiary structures — a task that previously required years of experimental X-ray crystallography work. In a landmark validation test, AlphaFold 3 predicted the structure of an undiscovered enzyme involved in antibiotic resistance with sufficient accuracy to guide drug design without additional experimental confirmation. The system is now freely accessible to academic researchers through a new web server, with commercial licensing available for pharmaceutical companies. The paper also introduces a 'confidence score' for each predicted atom, allowing researchers to identify regions that may require experimental verification.",
  },
  {
    id: BigInt(3),
    title:
      "NVIDIA Blackwell B200 GPU Ships: 4× H100 Performance for AI Training",
    source: "Tom's Hardware",
    url: "https://tomshardware.com",
    category: "Hardware",
    tags: ["NVIDIA", "GPU", "Blackwell", "AI Training"],
    publishedAt: hoursAgo(5),
    isBreaking: false,
    summary:
      "NVIDIA has begun volume shipments of its Blackwell B200 GPU to major cloud providers, with early benchmarks confirming a 4× performance improvement over the H100 for transformer training workloads. The B200 features 192GB of HBM3e memory with 8TB/s bandwidth, enabled by a new NVLink-C2C interconnect that directly connects CPU and GPU memory pools. Microsoft Azure and Google Cloud have already deployed B200 clusters with Amazon AWS following in Q3. The GPU introduces a new 'FP4' precision format that maintains model quality while doubling throughput for inference workloads — particularly impactful for large MoE models. NVIDIA also announced the GB200 NVL72 rack system, which bundles 72 B200 GPUs with 36 Grace CPUs in a liquid-cooled form factor delivering 1.4 exaflops of AI compute.",
  },
  {
    id: BigInt(4),
    title: "Anthropic Launches Claude 3.7 Sonnet with Extended Thinking Mode",
    source: "TechCrunch",
    url: "https://techcrunch.com",
    category: "AI",
    tags: ["Anthropic", "Claude", "LLM", "Reasoning"],
    publishedAt: hoursAgo(8),
    isBreaking: false,
    summary:
      "Anthropic has released Claude 3.7 Sonnet, introducing 'Extended Thinking' — a controllable reasoning mode allowing the model to spend variable amounts of compute on complex problems before responding. Users can set thinking budgets from 1,024 to 128,000 tokens, enabling step-by-step chain-of-thought reasoning visible to developers via API. In internal benchmarks, Extended Thinking improves performance on competition-level mathematics by 26% and on graduate-level science questions by 19%. The model maintains Claude's industry-leading performance on safety evaluations. Pricing for Extended Thinking tokens is set at $3 per million tokens — charged separately from output tokens — giving developers fine-grained cost control. Available via API today with Claude.ai integration launching next week.",
  },
  {
    id: BigInt(5),
    title:
      "Mistral AI Raises $600M Series B at $6B Valuation to Challenge US AI Giants",
    source: "Reuters",
    url: "https://reuters.com",
    category: "Startups",
    tags: ["Mistral", "Funding", "European AI", "Series B"],
    publishedAt: hoursAgo(12),
    isBreaking: false,
    summary:
      "Paris-based Mistral AI has closed a €550M ($600M) Series B funding round at a $6 billion valuation, led by General Catalyst with participation from Andreessen Horowitz, Lightspeed Venture Partners, and several European sovereign wealth funds. The company plans to use the capital to expand its data center infrastructure in France and Germany, grow its engineering team from 200 to 600, and accelerate research on its Mistral-Next frontier model. CEO Arthur Mensch emphasized the company's commitment to open-weight releases, contrasting with the increasingly closed approaches of US competitors. Mistral also announced enterprise partnerships with Deutsche Telekom, BNP Paribas, and Airbus for on-premise AI deployments. The French government has pledged to support Mistral through the France 2030 AI initiative.",
  },
  {
    id: BigInt(6),
    title: "Linux Kernel 6.9 Merges Rust Drivers for USB and PCI Subsystems",
    source: "Phoronix",
    url: "https://phoronix.com",
    category: "Software",
    tags: ["Linux", "Rust", "Kernel", "Systems"],
    publishedAt: hoursAgo(18),
    isBreaking: false,
    summary:
      "The Linux 6.9 kernel merge window has closed with Rust-language drivers for USB and PCI subsystems included for the first time in a production kernel release. The Rust USB driver, contributed by the Asahi Linux team, supports the full USB 3.x specification and demonstrates performance parity with the existing C implementation while eliminating an entire class of use-after-free vulnerabilities. Linus Torvalds noted in the merge commit that this represents 'a watershed moment for systems programming language diversity in the kernel.' The PCI Rust bindings enable writing device drivers without any unsafe code for standard compliant hardware. Nine Rust kernel modules are now included upstream, with another 23 pending review for Linux 6.10. The kernel team has also begun discussions about Rust-first development for new subsystems beginning in 2025.",
  },
];

export const sampleNotifications: Notification[] = [
  {
    id: BigInt(1),
    isRead: false,
    message:
      "BREAKING: OpenAI GPT-5 launch confirmed for this week — internal memo leaked",
    timestamp: hoursAgo(0.1),
    category: "AI",
  },
  {
    id: BigInt(2),
    isRead: false,
    message:
      "NVIDIA B200 GPU benchmarks: 4× improvement over H100 confirmed by AWS engineers",
    timestamp: hoursAgo(0.5),
    category: "Hardware",
  },
  {
    id: BigInt(3),
    isRead: false,
    message:
      "Anthropic releases Constitutional AI 2.0 paper — major safety framework update",
    timestamp: hoursAgo(1),
    category: "AI",
  },
  {
    id: BigInt(4),
    isRead: true,
    message:
      "EU AI Act implementation timeline announced — compliance deadline set for August 2025",
    timestamp: hoursAgo(2),
    category: "Research",
  },
  {
    id: BigInt(5),
    isRead: false,
    message:
      "Sam Altman testifies before Senate AI subcommittee on frontier model regulation",
    timestamp: hoursAgo(3),
    category: "AI",
  },
  {
    id: BigInt(6),
    isRead: true,
    message:
      "Google announces Gemini 2.0 Ultra integration into all Workspace products",
    timestamp: hoursAgo(4),
    category: "AI",
  },
  {
    id: BigInt(7),
    isRead: true,
    message:
      "Rust overtakes Python in Linux kernel contributor survey for new systems code preference",
    timestamp: hoursAgo(6),
    category: "Software",
  },
];

export const sampleTrendingTopics = [
  "GPT-5",
  "Reasoning Models",
  "AI Safety",
  "Blackwell GPU",
  "Open Source LLMs",
  "Mistral AI",
  "AlphaFold 3",
  "Rust Systems",
  "EU AI Act",
  "Agentic AI",
  "Multimodal",
  "Semiconductor Shortage",
];
