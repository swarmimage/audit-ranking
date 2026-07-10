import RatingsModule from "@/modules/RatingsModule";
import { createPageMetadata } from "@/lib/seo";


export const metadata = createPageMetadata("ratings", "/ratings");

export default function RatingsPage() {
  return <RatingsModule />;
}
