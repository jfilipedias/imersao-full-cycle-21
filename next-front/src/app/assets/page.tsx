import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeadCell, 
  TableRow 
} from "flowbite-react";
import type { Asset } from "@/models";
import { AssetShow } from "../components/AssetShow";

async function getAssets() {
  const response = await fetch("http://localhost:3000/assets")
  return await response.json() as Asset[]
}

export default async function AssetsList() {
  const assets = await getAssets()

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Ativos</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Comprar/Vender</TableHeadCell>
          </TableHead>
          <TableBody>
            {assets.map(asset => (
              <TableRow key={asset._id}>
                <TableCell>
                  <AssetShow asset={asset} />
                </TableCell>
                <TableCell>R$ {asset.price}</TableCell>
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
