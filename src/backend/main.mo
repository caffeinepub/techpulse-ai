import Array "mo:core/Array";
import Text "mo:core/Text";
import Int "mo:core/Int";
import List "mo:core/List";
import Order "mo:core/Order";

actor {
  type Article = {
    id : Nat;
    title : Text;
    source : Text;
    url : Text;
    category : Text;
    publishedAt : Int;
    summary : Text;
    tags : [Text];
    isBreaking : Bool;
  };

  module Article {
    public func compareByPublishedAt(article1 : Article, article2 : Article) : Order.Order {
      Int.compare(article2.publishedAt, article1.publishedAt);
    };
  };

  type Notification = {
    id : Nat;
    message : Text;
    category : Text;
    timestamp : Int;
    isRead : Bool;
  };

  module Notification {
    public func compareByTimestamp(notification1 : Notification, notification2 : Notification) : Order.Order {
      Int.compare(notification2.timestamp, notification1.timestamp);
    };
  };

  var trendingTopics : [Text] = [
    "GPT-5",
    "Autonomous Agents",
    "AI Regulation",
    "Quantum Computing",
    "Open Source LLMs",
    "Edge AI",
    "AI Ethics",
    "Robotics",
    "Data Privacy",
    "Synthetic Data",
  ];

  var articles : [Article] = [
    {
      id = 1;
      title = "GPT-4.5: Bridging the Gap to General Intelligence";
      source = "MIT Technology Review";
      url = "https://www.technologyreview.com/2024/03/17/1083204/gpt-4-5-bridging-general-intelligence/";
      category = "AI";
      publishedAt = 1700227200;
      summary = "OpenAI has announced the release of GPT-4.5, a significant step towards artificial general intelligence. The new model features improved multi-task learning, better contextual understanding, and increased efficiency. Early adopters report GPT-4.5 excels at complex problem-solving and creative tasks. The release sparks renewed debate on AI safety and ethical considerations as models approach human-level capabilities. Industry experts predict GPT-4.5 will accelerate AI adoption across various sectors, from healthcare to finance. OpenAI emphasizes its commitment to responsible AI development and collaboration with the research community.";
      tags = ["GPT-4.5", "AGI", "OpenAI", "AI development"];
      isBreaking = true;
    },
    {
      id = 2;
      title = "Quantum Computing Breakthrough Promises Faster AI Training";
      source = "ArXiv";
      url = "https://arxiv.org/abs/2403.04567";
      category = "Hardware";
      publishedAt = 1701168000;
      summary = "Researchers have published a paper detailing a new quantum computing algorithm for faster machine learning training. The algorithm leverages quantum entanglement to optimize neural network weights more efficiently. Initial simulations show a 10x speed increase compared to classical methods. Experts caution that practical applications may still be years away due to hardware limitations. The breakthrough renews interest in hybrid quantum-classical machine learning systems. Industry leaders are investing heavily in quantum research to maintain a competitive edge.";
      tags = ["Quantum Computing", "AI training", "Machine Learning", "Research"];
      isBreaking = false;
    },
    {
      id = 3;
      title = "Europe Introduces Comprehensive AI Regulation Framework";
      source = "The Batch by deeplearning.ai";
      url = "https://www.deeplearning.ai/thebatch/europeai-regulation-framework";
      category = "AI";
      publishedAt = 1701974400;
      summary = "The European Union has unveiled a new regulatory framework for artificial intelligence systems. The framework aims to balance innovation with consumer protection and ethical standards. Key provisions include mandatory transparency, bias mitigation, and human oversight for high-risk AI applications. Industry leaders express concerns about compliance costs and potential stifling of innovation. Policymakers emphasize the need for international cooperation on AI governance. The framework is seen as a blueprint for future global AI regulations.";
      tags = ["EU", "AI Regulation", "Policy", "Ethics"];
      isBreaking = true;
    },
    {
      id = 4;
      title = "AI-Powered Robotics Startup Secures $150M in Funding";
      source = "TechCrunch";
      url = "https://techcrunch.com/2024/03/21/ai-robotics-funding/";
      category = "Startups";
      publishedAt = 1702588800;
      summary = "Robotics startup IntelliBots has raised $150 million in a Series C funding round. The company uses advanced AI algorithms for autonomous navigation, object recognition, and task optimization. Investors see IntelliBots as a potential leader in warehouse automation and logistics. The funding will be used to scale production, expand R&D efforts, and enter new markets. Experts predict a surge in AI-driven robotics investments in the coming years. Industry analysts highlight the importance of ethical AI in autonomous systems.";
      tags = ["Robotics", "Startups", "AI Funding", "Autonomous Systems"];
      isBreaking = false;
    },
    {
      id = 5;
      title = "Open Source LLMs Gain Traction in Enterprise AI";
      source = "The Verge";
      url = "https://www.theverge.com/2024/03/25/open-source-llms-enterprise";
      category = "Software";
      publishedAt = 1703193600;
      summary = "Open source large language models (LLMs) are gaining popularity among enterprise AI developers. Companies are adopting open source LLMs for customization, cost savings, and data privacy. Experts predict a shift towards hybrid AI models combining proprietary and open source components. The trend poses challenges for established AI companies, prompting efforts to differentiate proprietary offerings. Developers cite community support, transparency, and rapid innovation as key advantages. The move towards open source LLMs is seen as a driver of industry-wide collaboration.";
      tags = ["LLMs", "Open Source", "Enterprise AI", "Software"];
      isBreaking = false;
    },
    {
      id = 6;
      title = "New AI Model Sets Benchmark for Autonomous Agents";
      source = "Import AI";
      url = "https://import.ai/autonomous-agents-benchmark-2024";
      category = "ML";
      publishedAt = 1703884800;
      summary = "Researchers have developed a new AI model that achieves state-of-the-art performance in autonomous agent benchmarks. The model integrates reinforcement learning, imitation learning, and symbolic reasoning. Experts predict significant advances in self-driving cars, robotics, and digital assistants. The research team emphasizes the need for safety protocols and ethical guidelines in autonomous agent development. Industry stakeholders see the model as a catalyst for innovation across multiple sectors. Ongoing research aims to improve adaptability and generalization capabilities.";
      tags = ["Autonomous Agents", "AI Benchmarks", "Reinforcement Learning", "Research"];
      isBreaking = false;
    },
    {
      id = 7;
      title = "Synthetic Data Revolutionizing AI Model Training";
      source = "VentureBeat";
      url = "https://venturebeat.com/ai/synthetic-data-training-revolution/";
      category = "AI";
      publishedAt = 1704576000;
      summary = "Synthetic data generation is emerging as a critical tool in AI model training. Researchers use synthetic data to address data privacy, scarcity, and quality issues. Early adopters report improved model performance and faster training cycles using synthetic datasets. Regulators are exploring guidelines to ensure the ethical use of synthetic data in AI applications. Industry leaders are investing heavily in synthetic data platforms and supporting technologies. Experts predict synthetic data will drive breakthroughs in AI model development.";
      tags = ["Synthetic Data", "AI Training", "Data Privacy", "Innovation"];
      isBreaking = false;
    },
    {
      id = 8;
      title = "Advancements in Edge AI Enable Real-Time Decision Making";
      source = "Ars Technica";
      url = "https://arstechnica.com/information-technology/2024/04/01/edge-ai-real-time-decision-making/";
      category = "Hardware";
      publishedAt = 1705180800;
      summary = "Edge AI technology is experiencing rapid growth due to advancements in processing power and energy efficiency. Devices can now analyze data and make decisions locally without continuous cloud connectivity. Applications include smart homes, industrial automation, and autonomous vehicles. Experts emphasize the importance of balancing performance, security, and cost in edge AI systems. Industry analysts predict a shift towards decentralized AI infrastructure. Ongoing research focuses on improving interoperability and scalability.";
      tags = ["Edge AI", "Real-Time", "Processing Power", "Hardware"];
      isBreaking = false;
    },
    {
      id = 9;
      title = "AI Ethics Standards Adopted by Major Tech Companies";
      source = "IEEE Spectrum";
      url = "https://spectrum.ieee.org/ai-ethics-standards-adoption";
      category = "AI";
      publishedAt = 1706035200;
      summary = "Leading technology companies have jointly adopted a new set of AI ethics standards. The guidelines cover transparency, accountability, bias mitigation, and human oversight. Industry leaders present the move as a commitment to responsible AI development. Privacy advocates warn that enforcement mechanisms remain unclear. Policymakers urge continued international collaboration on ethical AI. The standards are expected to influence future regulatory efforts and shape the global AI landscape.";
      tags = ["AI Ethics", "Standards", "Transparency", "Tech Industry"];
      isBreaking = false;
    },
    {
      id = 10;
      title = "Breakthrough in Explainable AI Improves Model Transparency";
      source = "Wired";
      url = "https://www.wired.com/story/explainable-ai-transparency-breakthrough/";
      category = "ML";
      publishedAt = 1706726400;
      summary = "Researchers have announced a major breakthrough in explainable AI techniques. The new approach uses natural language explanations to describe model behavior and decision-making processes. Early testing shows improved user trust and adoption of AI systems in regulated industries. Industry analysts highlight the importance of transparency in high-stakes applications. Ongoing research aims to improve explainability for complex deep learning models. Experts predict explainable AI will become a standard practice in the development lifecycle.";
      tags = ["Explainable AI", "Transparency", "Trust", "Decision Making"];
      isBreaking = false;
    },
    {
      id = 11;
      title = "Federated Learning Advances Data Privacy in AI";
      source = "TechCrunch";
      url = "https://techcrunch.com/2024/04/10/federated-learning-data-privacy/";
      category = "AI";
      publishedAt = 1707417600;
      summary = "Federated learning is revolutionizing data privacy in artificial intelligence systems. The technique allows models to learn from decentralized data sources without centralizing raw data. Early adopters report success in healthcare, finance, and mobile applications. Regulators highlight federated learning as a key tool in GDPR compliance. Researchers are working to address challenges in model aggregation, communication costs, and system robustness. The technology is seen as a crucial step towards secure AI model development.";
      tags = ["Federated Learning", "Data Privacy", "AI", "Decentralization"];
      isBreaking = false;
    },
    {
      id = 12;
      title = "Real-Time Language Translation Achieves Human-Level Performance";
      source = "The Batch by deeplearning.ai";
      url = "https://www.deeplearning.ai/thebatch/real-time-translation-performance";
      category = "AI";
      publishedAt = 1708012800;
      summary = "AI-powered real-time language translation systems are achieving human-level performance in accuracy and fluency. The advancement is driven by improvements in neural machine translation models and large language models. Early adopters report benefits in international business, education, and healthcare. Researchers highlight the role of multimodal learning and transfer learning techniques. Ongoing challenges include dialect adaptation and context preservation. The breakthrough is seen as a step towards real-time multilingual communication.";
      tags = ["Language Translation", "Real-Time", "AI", "Performance"];
      isBreaking = false;
    },
    {
      id = 13;
      title = "AI Accelerates Drug Discovery in Pharma Industry";
      source = "VentureBeat";
      url = "https://venturebeat.com/ai-drug-discovery-pharma";
      category = "AI";
      publishedAt = 1708694400;
      summary = "Artificial intelligence is transforming the drug discovery process in the pharmaceutical industry. AI models analyze large datasets to identify potential drug candidates and predict clinical trial outcomes. Early adopters report reduced time and cost associated with new drug development. Researchers highlight the importance of data quality and model validation in drug discovery applications. Industry analysts predict continued growth in AI-driven healthcare innovations. The trend is expected to accelerate the development of new treatments and therapies.";
      tags = ["Drug Discovery", "Pharma", "AI", "Healthcare"];
      isBreaking = false;
    },
    {
      id = 14;
      title = "Digital Twins Revolutionizing Industrial Automation";
      source = "Wired";
      url = "https://www.wired.com/story/digital-twins-industrial-automation/";
      category = "Software";
      publishedAt = 1709385600;
      summary = "Digital twin technology is revolutionizing industrial automation by simulating physical processes and systems. AI-powered digital twins enable real-time monitoring, predictive maintenance, and process optimization. Early adopters report increased productivity, reduced downtime, and improved decision-making. Industry analysts highlight the importance of data integration and interoperability in digital twin implementations. Ongoing research focuses on scalability and security challenges. The technology is seen as a catalyst for the next wave of industrial transformation.";
      tags = ["Digital Twins", "Automation", "AI", "Industrial"];
      isBreaking = false;
    },
    {
      id = 15;
      title = "AI-Powered Cybersecurity Systems Detect Sophisticated Attacks";
      source = "The Verge";
      url = "https://www.theverge.com/2024/04/20/ai-cybersecurity-detection";
      category = "AI";
      publishedAt = 1710076800;
      summary = "AI-powered cybersecurity systems are proving effective in detecting and preventing sophisticated cyber attacks. The systems use machine learning algorithms to analyze network traffic, user behavior, and threat patterns. Early adopters report reduced response times and improved threat detection rates. Industry experts emphasize the importance of continuous model training and human oversight. Researchers are developing explainable AI techniques to increase trust in cybersecurity systems. The technology is seen as a key component of future cyber defense strategies.";
      tags = ["Cybersecurity", "AI", "Threat Detection", "Machine Learning"];
      isBreaking = false;
    },
    {
      id = 16;
      title = "Advances in Multimodal AI Enhance Human-Computer Interaction";
      source = "MIT Technology Review";
      url = "https://www.technologyreview.com/2024/04/22/advances-multimodal-ai/";
      category = "AI";
      publishedAt = 1710672000;
      summary = "Multimodal AI is transforming human-computer interaction by integrating text, speech, and visuals. Early adopters report improved accessibility, user engagement, and personalization. Industry analysts predict significant advances in virtual assistants, education, and healthcare. Researchers are exploring techniques for managing information across multiple modalities. Ethical considerations include managing bias and ensuring transparency in multimodal systems. The technology is predicted to drive a new wave of innovation in AI-powered applications.";
      tags = ["Multimodal AI", "HCI", "Personalized Experience", "Accessibility"];
      isBreaking = false;
    },
    {
      id = 17;
      title = "AI-Powered Digital Assistants Becoming Ubiquitous";
      source = "TechCrunch";
      url = "https://techcrunch.com/2024/04/25/digital-assistants-ai-ubiquity/";
      category = "Software";
      publishedAt = 1710940800;
      summary = "AI-powered digital assistants are becoming ubiquitous in both personal and professional environments. Advancements in natural language processing and contextual awareness drive the trend. Early adopters report increased productivity and convenience. Industry analysts highlight the role of third-party developers in expanding assistant functionality. Ongoing research focuses on multilingual support and integration with smart devices. The technology is expected to redefine how humans interact with computers.";
      tags = ["Digital Assistants", "AI", "NLP", "Software"];
      isBreaking = false;
    },
    {
      id = 18;
      title = "Robotic Process Automation Streamlines Business Operations";
      source = "Import AI";
      url = "https://import.ai/business-ai-automation-2024";
      category = "Software";
      publishedAt = 1711363200;
      summary = "Robotic process automation (RPA) is revolutionizing business operations by streamlining repetitive tasks. AI-driven bots are rapidly gaining adoption. Early adopters report significant cost savings, improved accuracy, and increased efficiency. Industry analysts highlight the importance of MLOps for automating model lifecycle management. Ongoing research focuses on improving scalability and interoperability. The trend is expected to continue as businesses pursue digital transformation initiatives driven by AI innovation.";
      tags = ["RPA", "Automation", "AI", "Business"];
      isBreaking = false;
    },
    {
      id = 19;
      title = "AI Optimizes Renewable Energy Management";
      source = "IEEE Spectrum";
      url = "https://spectrum.ieee.org/ai-renewable-energy-optimization";
      category = "ML";
      publishedAt = 1711987200;
      summary = "AI-driven optimization is transforming renewable energy management by improving efficiency and reducing costs. The models analyze weather patterns, energy consumption, and grid data to balance supply and demand. Early adopters report improved energy storage utilization and reduced carbon emissions. Industry analysts predict continued growth in AI-powered energy solutions. Researchers are working to improve model accuracy and scalability. The technology is seen as a crucial tool in global efforts to combat climate change.";
      tags = ["Renewable Energy", "Optimization", "AI", "Sustainability"];
      isBreaking = false;
    },
    {
      id = 20;
      title = "Advancements in Audio AI Enhance Real-Time Communication";
      source = "The Batch by deeplearning.ai";
      url = "https://www.deeplearning.ai/thebatch/audio-ai-communication";
      category = "AI";
      publishedAt = 1712582400;
      summary = "Advancements in audio AI technology are enhancing real-time communication and collaboration. Innovations in speech recognition, noise cancellation, and voice modulation drive the progress. Early adopters report improved user experience and accessibility. Industry analysts see strong demand in telehealth and call center solutions. Researchers focus on adaptability, personalization, and seamless integration. Ongoing challenges include multi-language support and minimizing latency. Audio AI is poised to transform how we interact in both professional and personal settings.";
      tags = ["Audio AI", "Real-Time Communication", "Speech Recognition", "Accessibility"];
      isBreaking = false;
    },
    {
      id = 21;
      title = "AI Innovates Human Digital Twins for Personalized Experiences";
      source = "Wired";
      url = "https://www.wired.com/story/ai-digital-twins-personalized-experiences/";
      category = "AI";
      publishedAt = 1713187200;
      summary = "AI-powered human digital twin technology brings personalized experiences to new levels. Digital replicas analyze user preferences and simulate behavior for customization. Early adopters report improved user satisfaction and increased engagement. Industry analysts highlight potential applications in healthcare, education, and entertainment. Researchers focus on privacy, security, and ethical transparency. Digital twins represent a convergence of AI and the digital economies for innovation.";
      tags = ["Human Digital Twins", "Personalized Experience", "AI", "Innovation"];
      isBreaking = false;
    },
    {
      id = 22;
      title = "AI Scales Model Evaluation in MLOps Pipelines";
      source = "ArS Technica";
      url = "https://arstechnica.com/information-technology/2024/05/01/ai-feature-matching/";
      category = "ML";
      publishedAt = 1713523200;
      summary = "AI is revolutionizing MLOps pipelines by scaling model evaluation and feature matching. Advanced algorithms optimize feature sets, improve data consistency and model performance. Early adopters report increased automation in model deployment and testing. Industry analysts highlight growing demand for model monitoring and evaluation tools. Researchers focus on explainability and automated retraining. Automated MLOps is expected to drive widespread adoption of AI across industries.";
      tags = ["Feature Matching", "Model Evaluation", "AI", "MLOps Pipeline"];
      isBreaking = false;
    },
    {
      id = 23;
      title = "AI Enables Real-Time Autonomous Drone Navigation";
      source = "VentureBeat";
      url = "https://venturebeat.com/ai-drone-navigation-real-time/";
      category = "Hardware";
      publishedAt = 1714118400;
      summary = "AI-powered autonomous drones achieve real-time navigation, revolutionizing industries from logistics to agriculture. Computer vision algorithms enable obstacle avoidance, precision mapping, and fault detection. Early adopters report increased efficiency and cost savings. Industry analysts predict rapid growth in drone applications for delivery and monitoring. Researchers focus on improving battery life, payload capacity, and controls. Ongoing advancements are expected to accelerate drone adoption in the coming years.";
      tags = ["Autonomous Drones", "Real-Time Navigation", "AI", "Computer Vision"];
      isBreaking = false;
    },
  ];

  var notifications : [Notification] = [
    {
      id = 1;
      message = "GPT-4.5 released with improved multi-task learning";
      category = "Model Release";
      timestamp = 1700227200;
      isRead = false;
    },
    {
      id = 2;
      message = "Quantum computing breakthrough increases ML training speed";
      category = "Research";
      timestamp = 1701168000;
      isRead = false;
    },
    {
      id = 3;
      message = "Europe unveils comprehensive AI regulatory framework";
      category = "Regulation";
      timestamp = 1701974400;
      isRead = false;
    },
    {
      id = 4;
      message = "IntelliBots raises $150M for AI robotics expansion";
      category = "Funding";
      timestamp = 1702588800;
      isRead = false;
    },
    {
      id = 5;
      message = "Open source LLM adoption surges in enterprise tech";
      category = "Industry";
      timestamp = 1703193600;
      isRead = false;
    },
    {
      id = 6;
      message = "State-of-the-art AI model enhances autonomous agent benchmarks";
      category = "Research";
      timestamp = 1703884800;
      isRead = false;
    },
    {
      id = 7;
      message = "Synthetic data generation drives AI training efficiency";
      category = "Innovation";
      timestamp = 1704576000;
      isRead = false;
    },
    {
      id = 8;
      message = "Advancements in edge AI enable real-time decision making";
      category = "Hardware";
      timestamp = 1705180800;
      isRead = false;
    },
    {
      id = 9;
      message = "Tech giants adopt unified AI ethics standards";
      category = "Industry";
      timestamp = 1706035200;
      isRead = false;
    },
    {
      id = 10;
      message = "Explainable AI breakthrough improves model transparency";
      category = "Research";
      timestamp = 1706726400;
      isRead = false;
    },
    {
      id = 11;
      message = "Federated learning advances data privacy in AI applications";
      category = "Privacy";
      timestamp = 1707417600;
      isRead = false;
    },
    {
      id = 12;
      message = "AI-powered cybersecurity detects sophisticated threats";
      category = "Security";
      timestamp = 1710076800;
      isRead = false;
    },
  ];

  public query ({ caller }) func getArticles(category : ?Text, search : ?Text) : async [Article] {
    let filtered = articles.filter(
      func(article) {
        let categoryMatch = switch (category) {
          case (null) { true };
          case (?cat) { article.category.toLower().contains(#text(cat.toLower())) };
        };

        let searchMatch = switch (search) {
          case (null) { true };
          case (?term) {
            let termLower = term.toLower();
            article.title.toLower().contains(#text(termLower)) or
            article.summary.toLower().contains(#text(termLower)) or
            article.tags.find(
              func(tag) { tag.toLower().contains(#text(termLower)) }
            ) != null;
          };
        };

        categoryMatch and searchMatch;
      }
    );
    filtered.sort(Article.compareByPublishedAt);
  };

  public query ({ caller }) func getArticleById(id : Nat) : async ?Article {
    articles.find(func(article) { article.id == id });
  };

  public query ({ caller }) func getNotifications() : async [Notification] {
    notifications.sort(Notification.compareByTimestamp);
  };

  public shared ({ caller }) func markNotificationRead(id : Nat) : async Bool {
    let list = List.fromArray<Notification>(notifications);

    var found = false;
    let updatedList = list.map<Notification, Notification>(
      func(notification) {
        if (notification.id == id) {
          found := true;
          { notification with isRead = true };
        } else {
          notification;
        };
      }
    );

    notifications := updatedList.toArray();
    found;
  };

  public query ({ caller }) func getUnreadNotificationCount() : async Nat {
    notifications.filter(func(notification) { not notification.isRead }).size();
  };

  public query ({ caller }) func getTrendingTopics() : async [Text] {
    trendingTopics;
  };
};
