import { Ring } from "@uiball/loaders";

export default function Loader() {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Ring size={40} lineWeight={5} speed={2} color="black" />
    </div>
  );
}
