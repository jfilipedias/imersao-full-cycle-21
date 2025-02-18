import mongoose, { type Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { type CreateWalletAssetDto } from './dto/create-wallet-asset.dto';
import { Wallet } from './entities/wallet.entity';
import { WalletAsset } from './entities/wallet-asset.entity';
import type { Asset } from '../assets/entities/asset.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name)
    private walletSchema: Model<Wallet>,
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
    @InjectConnection()
    private connection: mongoose.Connection,
  ) {}

  create() {
    return this.walletSchema.create({});
  }

  findAll() {
    return this.walletSchema.find();
  }

  findOne(id: string) {
    return this.walletSchema
      .findById(id)
      .populate([{ path: 'assets', populate: ['asset'] }]) as Promise<
      (Wallet & { assets: (WalletAsset & { asset: Asset })[] }) | null
    >;
  }

  async createWalletAsset(
    id: string,
    createWalletAssetDto: CreateWalletAssetDto,
  ) {
    const session = await this.connection.startSession();
    await session.startTransaction();

    try {
      const docs = await this.walletAssetSchema.create(
        [
          {
            wallet: id,
            asset: createWalletAssetDto.assetId,
            shares: createWalletAssetDto.shares,
          },
        ],
        { session },
      );

      const walletAsset = docs[0];
      await this.walletSchema.updateOne(
        { _id: id },
        { $push: { assets: walletAsset._id } },
        { session },
      );

      await session.commitTransaction();
      return walletAsset;
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
