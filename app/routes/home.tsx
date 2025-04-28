import type { Route } from "./+types/home";
import Welcome from "../welcome/content";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Brenda Gaio - Portfolio" },
    { 
      name: "description", 
      content: "Website de Portfolio de Brenda Aldrovandi Gaio" 
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
