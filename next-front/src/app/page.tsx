import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeadCell, 
  TableRow 
} from "flowbite-react";
import type { Wallet } from "@/models";
import { AssetShow } from "./components/AssetShow";

async function getWallet(walletId: string) {
  const response = await fetch(`http://localhost:3000/wallets/${walletId}`)
  return await response.json() as Wallet
}

export default async function Wallet({searchParams}: {searchParams: Promise<{walletId: string}>}) {
  const {walletId} = await searchParams;
  const wallet = await getWallet(walletId)

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Minha carteira</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Comprar/Vender</TableHeadCell>
          </TableHead>
          <TableBody>
            {wallet.assets.map(walletAsset => (
              <TableRow key={walletAsset._id}>
                <TableCell>
                  <AssetShow asset={walletAsset.asset} />
                </TableCell>
                <TableCell>R$ {walletAsset.asset.price}</TableCell>
                <TableCell>{walletAsset.shares}</TableCell>
                <TableCell>
                  <Button color="light">Comprar/vender</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
