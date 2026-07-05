import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadResume() {
  const link = document.createElement("a");
  link.href = "/Shourya_Upadhyaya_Resume.pdf";
  link.download = "Shourya_Upadhyaya_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
