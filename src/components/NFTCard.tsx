interface NFTCardProps {
  id: string;
  image: string;
  name: string;
  owner?: string;
  isOwned?: boolean;
}

export default function NFTCard({ id, image, name, owner, isOwned }: NFTCardProps) {
  return (
    <div className="group relative bg-secondary/50 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/50 transition-all duration-300 hover:scale-[1.02]">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">{name}</span>
          <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-md font-mono">
            #{id}
          </span>
        </div>

        {owner && (
          <p className="mt-2 text-xs text-gray-400">
            Владелец: <span className="font-mono text-gray-300">{owner.slice(0, 6)}...{owner.slice(-4)}</span>
          </p>
        )}

        {isOwned && (
          <div className="mt-3 px-3 py-1.5 bg-success/20 text-success text-xs rounded-lg text-center font-medium">
            В вашем кошельке
          </div>
        )}
      </div>
    </div>
  );
}