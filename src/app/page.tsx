import Desmentidor from "@/components/Desmentidor";
import data from "@/data/videos.json";
import type { SiteData } from "@/lib/types";

export default function Home() {
  return <Desmentidor data={data as SiteData} />;
}
