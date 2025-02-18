import type { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { type CreateWalletAssetDto } from './dto/create-wallet-asset.dto';
import { Wallet } from './entities/wallet.entity';
import { WalletAsset } from './entities/wallet-asset.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name)
    private walletSchema: Model<Wallet>,
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
  ) {}

  create() {
    return this.walletSchema.create();
  }

  findAll() {
    return this.walletSchema.find();
  }

  findOne(id: string) {
    return this.walletSchema.findById(id);
  }

  createWalletAsset(id: string, createWalletAssetDto: CreateWalletAssetDto) {
    return this.walletAssetSchema.create({
      wallet: id,
      asset: createWalletAssetDto.assetId,
      shares: createWalletAssetDto.shares,
    });
  }
}
