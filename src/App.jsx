import Iridescence from "@/components/ui/iridescence";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Iridescence />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-white">
          Iridescence is LIVE ✨
        </h1>
      </div>
    </div>
  );
}
