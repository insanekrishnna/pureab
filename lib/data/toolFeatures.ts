export interface ToolFeature {
  title: string;
  desc: string;
}

export const toolFeaturesMap: Record<string, ToolFeature[]> = {
  "merge-pdf": [
    {
      title: "Local Processing",
      desc: "Your files never leave your browser. Total privacy and maximum speed without server uploads.",
    },
    {
      title: "Visual Reordering",
      desc: "Drag and drop thumbnails to organize your PDFs perfectly before instantly combining them.",
    },
    {
      title: "Zero Compression",
      desc: "Merged documents retain their original quality and structure with absolutely no degradation.",
    },
  ],
  "split-pdf": [
    {
      title: "Local Processing",
      desc: "Your files never leave your browser. Ensure absolute confidentiality while splitting documents.",
    },
    {
      title: "Custom Ranges",
      desc: "Extract specific pages or separate your document into multiple distinct PDF files effortlessly.",
    },
    {
      title: "Instant Export",
      desc: "Download your newly split files individually or bundled into a convenient ZIP archive instantly.",
    },
  ],
  "compress-pdf": [
    {
      title: "Local Processing",
      desc: "Compress files securely inside your browser without uploading them to external servers.",
    },
    {
      title: "Smart Compression",
      desc: "Dramatically reduce file size while maintaining excellent document clarity and readability.",
    },
    {
      title: "Real-time Preview",
      desc: "Instantly see the compressed file size and compare quality before downloading.",
    },
  ],
  "chat-with-pdf": [
    {
      title: "Local Indexing",
      desc: "Your PDF is processed and indexed directly in your browser, maintaining full document privacy.",
    },
    {
      title: "Instant Answers",
      desc: "Interact with an intelligent LLM that provides immediate answers grounded purely in your document.",
    },
    {
      title: "Contextual Accuracy",
      desc: "Advanced search mechanisms ensure the AI reads and cites the most relevant pages of your file.",
    },
  ],
  "excel-to-pdf": [
    {
      title: "Local Processing",
      desc: "Convert your spreadsheets to PDFs securely within your browser for absolute data privacy.",
    },
    {
      title: "Perfect Formatting",
      desc: "Retain complex spreadsheet layouts, tables, and typography exactly as they were designed.",
    },
    {
      title: "Instant Conversion",
      desc: "Transform large Excel files into lightweight, universally readable PDFs in milliseconds.",
    },
  ],
  "pdf-to-word": [
    {
      title: "Local Processing",
      desc: "Your files are converted entirely in your browser. Total privacy with zero server uploads.",
    },
    {
      title: "Preserve Layouts",
      desc: "Convert PDFs into fully editable Word documents while keeping fonts, spacing, and formatting intact.",
    },
    {
      title: "High Accuracy",
      desc: "Advanced parsing reconstructs complex tables and paragraphs perfectly for immediate editing.",
    },
  ],
  "encrypt-pdf": [
    {
      title: "Local Encryption",
      desc: "Your files and passwords never leave your machine. Absolute cryptographic security.",
    },
    {
      title: "Bank-Grade Security",
      desc: "Apply robust AES encryption to ensure your documents are protected from unauthorized access.",
    },
    {
      title: "Custom Permissions",
      desc: "Restrict printing, copying, and editing to maintain complete control over your document.",
    },
  ],
  "remove-password": [
    {
      title: "Local Decryption",
      desc: "Unlock files securely directly in your browser. Passwords and data remain completely private.",
    },
    {
      title: "Instant Unlock",
      desc: "Remove restrictions and passwords from encrypted PDFs in milliseconds.",
    },
    {
      title: "Preserve Quality",
      desc: "Your unlocked document retains its original quality and formatting perfectly.",
    },
  ]
};

export const defaultFeatures: ToolFeature[] = [
  {
    title: "Local Processing",
    desc: "Your files never leave your browser. Total privacy and maximum speed without server uploads.",
  },
  {
    title: "Unmatched Speed",
    desc: "Execute complex document operations in milliseconds using advanced in-browser technology.",
  },
  {
    title: "Zero Degradation",
    desc: "Your documents retain their original quality, structure, and formatting with no unexpected changes.",
  },
];
