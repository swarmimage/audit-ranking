import RegulationsModule from "@/modules/RegulationsModule";
import { createPageMetadata } from "@/lib/seo";


export const metadata = createPageMetadata("regulations", "/regulations");

export default function RegulationsPage() {
  return <RegulationsModule />;
}
