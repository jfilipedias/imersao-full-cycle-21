import Image from "next/image";
import type { Asset } from "@/models";

export function AssetShow({ asset }: { asset: Asset}) {
  return (
    <div className="flex space-x-2">
      <div className="content-center">
        <Image 
          src={asset.image_url}
          alt={asset.symbol}
          width={30}
          height={30}
        />
      </div>
      <div className="flex flex-col text-sm">
        <span>{asset.name}</span>
        <span>{asset.symbol}</span>
      </div>
    </div>
  );
}