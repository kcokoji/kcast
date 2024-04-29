import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LanguageOptions = [
  { value: "AF", label: "Afrikaans" },
  { value: "SQ", label: "Albanian" },
  { value: "AR", label: "Arabic" },
  { value: "HY", label: "Armenian" },
  { value: "EU", label: "Basque" },
  { value: "BN", label: "Bengali" },
  { value: "BG", label: "Bulgarian" },
  { value: "CA", label: "Catalan" },
  { value: "KM", label: "Cambodian" },
  { value: "ZH", label: "Chinese (Mandarin)" },
  { value: "HR", label: "Croatian" },
  { value: "CS", label: "Czech" },
  { value: "DA", label: "Danish" },
  { value: "NL", label: "Dutch" },
  { value: "EN", label: "English" },
  { value: "ET", label: "Estonian" },
  { value: "FJ", label: "Fiji" },
  { value: "FI", label: "Finnish" },
  { value: "FR", label: "French" },
  { value: "KA", label: "Georgian" },
  { value: "DE", label: "German" },
  { value: "EL", label: "Greek" },
  { value: "GU", label: "Gujarati" },
  { value: "HE", label: "Hebrew" },
  { value: "HI", label: "Hindi" },
  { value: "HU", label: "Hungarian" },
  { value: "IS", label: "Icelandic" },
  { value: "ID", label: "Indonesian" },
  { value: "GA", label: "Irish" },
  { value: "IT", label: "Italian" },
  { value: "JA", label: "Japanese" },
  { value: "JW", label: "Javanese" },
  { value: "KO", label: "Korean" },
  { value: "LA", label: "Latin" },
  { value: "LV", label: "Latvian" },
  { value: "LT", label: "Lithuanian" },
  { value: "MK", label: "Macedonian" },
  { value: "MS", label: "Malay" },
  { value: "ML", label: "Malayalam" },
  { value: "MT", label: "Maltese" },
  { value: "MI", label: "Maori" },
  { value: "MR", label: "Marathi" },
  { value: "MN", label: "Mongolian" },
  { value: "NE", label: "Nepali" },
  { value: "NO", label: "Norwegian" },
  { value: "FA", label: "Persian" },
  { value: "PL", label: "Polish" },
  { value: "PT", label: "Portuguese" },
  { value: "PA", label: "Punjabi" },
  { value: "QU", label: "Quechua" },
  { value: "RO", label: "Romanian" },
  { value: "RU", label: "Russian" },
  { value: "SM", label: "Samoan" },
  { value: "SR", label: "Serbian" },
  { value: "SK", label: "Slovak" },
  { value: "SL", label: "Slovenian" },
  { value: "ES", label: "Spanish" },
  { value: "SW", label: "Swahili" },
  { value: "SV", label: "Swedish" },
  { value: "TA", label: "Tamil" },
  { value: "TT", label: "Tatar" },
  { value: "TE", label: "Telugu" },
  { value: "TH", label: "Thai" },
  { value: "BO", label: "Tibetan" },
  { value: "TO", label: "Tonga" },
  { value: "TR", label: "Turkish" },
  { value: "UK", label: "Ukrainian" },
  { value: "UR", label: "Urdu" },
  { value: "UZ", label: "Uzbek" },
  { value: "VI", label: "Vietnamese" },
  { value: "CY", label: "Welsh" },
  { value: "XH", label: "Xhosa" },
];

export function getImageData(event: React.ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image),
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {},
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

/**
 * Stole this from the @radix-ui/primitive
 * @see https://github.com/radix-ui/primitives/blob/main/packages/core/primitive/src/primitive.tsx
 */
export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as Event).defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}

export const categories = [
  { value: "arts-books", label: "Arts - Books" },
  { value: "arts-design", label: "Arts - Design" },
  { value: "arts-fashion-beauty", label: "Arts - Fashion & Beauty" },
  { value: "arts-food", label: "Arts - Food" },
  { value: "arts-performing-arts", label: "Arts - Performing Arts" },
  { value: "arts-visual-arts", label: "Arts - Visual Arts" },
  { value: "business-careers", label: "Business - Careers" },
  { value: "business-entrepreneurship", label: "Business - Entrepreneurship" },
  { value: "business-investing", label: "Business - Investing" },
  { value: "business-management", label: "Business - Management" },
  { value: "business-marketing", label: "Business - Marketing" },
  { value: "business-non-profit", label: "Business - Non-Profit" },
  { value: "comedy-comedy-interviews", label: "Comedy - Comedy Interviews" },
  { value: "comedy-improv", label: "Comedy - Improv" },
  { value: "comedy-stand-up", label: "Comedy - Stand-Up" },
  { value: "education-courses", label: "Education - Courses" },
  { value: "education-how-to", label: "Education - How To" },
  {
    value: "education-language-learning",
    label: "Education - Language Learning",
  },
  {
    value: "education-self-improvement",
    label: "Education - Self-Improvement",
  },
  { value: "fiction-comedy-fiction", label: "Fiction - Comedy Fiction" },
  { value: "fiction-drama", label: "Fiction - Drama" },
  { value: "fiction-science-fiction", label: "Fiction - Science Fiction" },
  {
    value: "health-fitness-alternative-health",
    label: "Health & Fitness - Alternative Health",
  },
  { value: "health-fitness-fitness", label: "Health & Fitness - Fitness" },
  { value: "health-fitness-medicine", label: "Health & Fitness - Medicine" },
  {
    value: "health-fitness-mental-health",
    label: "Health & Fitness - Mental Health",
  },
  { value: "health-fitness-nutrition", label: "Health & Fitness - Nutrition" },
  { value: "health-fitness-sexuality", label: "Health & Fitness - Sexuality" },
  {
    value: "kids-family-education-for-kids",
    label: "Kids & Family - Education for Kids",
  },
  { value: "kids-family-parenting", label: "Kids & Family - Parenting" },
  {
    value: "kids-family-pets-animals",
    label: "Kids & Family - Pets & Animals",
  },
  {
    value: "kids-family-stories-for-kids",
    label: "Kids & Family - Stories for Kids",
  },
  { value: "leisure-animation-manga", label: "Leisure - Animation & Manga" },
  { value: "leisure-automotive", label: "Leisure - Automotive" },
  { value: "leisure-aviation", label: "Leisure - Aviation" },
  { value: "leisure-crafts", label: "Leisure - Crafts" },
  { value: "leisure-games", label: "Leisure - Games" },
  { value: "leisure-hobbies", label: "Leisure - Hobbies" },
  { value: "leisure-home-garden", label: "Leisure - Home & Garden" },
  { value: "leisure-video-games", label: "Leisure - Video Games" },
  { value: "music-music-commentary", label: "Music - Music Commentary" },
  { value: "music-music-history", label: "Music - Music History" },
  { value: "music-music-interviews", label: "Music - Music Interviews" },
  { value: "news-business-news", label: "News - Business News" },
  { value: "news-daily-news", label: "News - Daily News" },
  { value: "news-entertainment-news", label: "News - Entertainment News" },
  { value: "news-news-commentary", label: "News - News Commentary" },
  { value: "news-politics", label: "News - Politics" },
  { value: "news-sports-news", label: "News - Sports News" },
  { value: "news-tech-news", label: "News - Tech News" },
  {
    value: "religion-spirituality-buddhism",
    label: "Religion & Spirituality - Buddhism",
  },
  {
    value: "religion-spirituality-christianity",
    label: "Religion & Spirituality - Christianity",
  },
  {
    value: "religion-spirituality-hinduism",
    label: "Religion & Spirituality - Hinduism",
  },
  {
    value: "religion-spirituality-islam",
    label: "Religion & Spirituality - Islam",
  },
  {
    value: "religion-spirituality-judaism",
    label: "Religion & Spirituality - Judaism",
  },
  {
    value: "religion-spirituality-religion",
    label: "Religion & Spirituality - Religion",
  },
  {
    value: "religion-spirituality-spirituality",
    label: "Religion & Spirituality - Spirituality",
  },
  { value: "science-astronomy", label: "Science - Astronomy" },
  { value: "science-chemistry", label: "Science - Chemistry" },
  { value: "science-earth-sciences", label: "Science - Earth Sciences" },
  { value: "science-life-sciences", label: "Science - Life Sciences" },
  { value: "science-mathematics", label: "Science - Mathematics" },
  { value: "science-natural-sciences", label: "Science - Natural Sciences" },
  { value: "science-nature", label: "Science - Nature" },
  { value: "science-physics", label: "Science - Physics" },
  { value: "science-social-sciences", label: "Science - Social Sciences" },
  {
    value: "society-culture-documentary",
    label: "Society & Culture - Documentary",
  },
  {
    value: "society-culture-personal-journals",
    label: "Society & Culture - Personal Journals",
  },
  {
    value: "society-culture-philosophy",
    label: "Society & Culture - Philosophy",
  },
  {
    value: "society-culture-places-travel",
    label: "Society & Culture - Places & Travel",
  },
  {
    value: "society-culture-relationships",
    label: "Society & Culture - Relationships",
  },
  { value: "sports-baseball", label: "Sports - Baseball" },
  { value: "sports-basketball", label: "Sports - Basketball" },
  { value: "sports-cricket", label: "Sports - Cricket" },
  { value: "sports-fantasy-sports", label: "Sports - Fantasy Sports" },
  { value: "sports-football", label: "Sports - Football" },
  { value: "sports-golf", label: "Sports - Golf" },
  { value: "sports-hockey", label: "Sports - Hockey" },
  { value: "sports-rugby", label: "Sports - Rugby" },
  { value: "sports-running", label: "Sports - Running" },
  { value: "sports-soccer", label: "Sports - Soccer" },
  { value: "sports-swimming", label: "Sports - Swimming" },
  { value: "sports-tennis", label: "Sports - Tennis" },
  { value: "sports-volleyball", label: "Sports - Volleyball" },
  { value: "sports-wilderness", label: "Sports - Wilderness" },
  { value: "sports-wrestling", label: "Sports - Wrestling" },
  {
    value: "technology-artificial-intelligence",
    label: "Technology - Artificial Intelligence",
  },
  { value: "technology-gadgets", label: "Technology - Gadgets" },
  { value: "technology-tech-news", label: "Technology - Tech News" },
  {
    value: "technology-software-development",
    label: "Technology - Software Development",
  },
  { value: "technology-networking", label: "Technology - Networking" },
  {
    value: "true-crime-murder-mysteries",
    label: "True Crime - Murder Mysteries",
  },
  {
    value: "true-crime-criminal-psychology",
    label: "True Crime - Criminal Psychology",
  },
  { value: "true-crime-cold-cases", label: "True Crime - Cold Cases" },
  {
    value: "true-crime-forensic-analysis",
    label: "True Crime - Forensic Analysis",
  },
  { value: "tv-film-after-shows", label: "TV & Film - After Shows" },
  { value: "tv-film-film-history", label: "TV & Film - Film History" },
  { value: "tv-film-film-interviews", label: "TV & Film - Film Interviews" },
  { value: "tv-film-film-reviews", label: "TV & Film - Film Reviews" },
  { value: "tv-film-tv-reviews", label: "TV & Film - TV Reviews" },
];

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        reject(new Error("Failed to convert file to base64"));
        return;
      }

      const base64String = reader.result as string;
      resolve(base64String.split(",")[1]);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
