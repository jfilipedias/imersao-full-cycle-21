import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import type { CreateWalletAssetDto } from './dto/create-wallet-asset.dto';
import { WalletsService } from './wallets.service';
import { WalletPresenter } from './wallets.presenter';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create() {
    return this.walletsService.create();
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wallet = await this.walletsService.findOne(id);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return new WalletPresenter(wallet);
  }

  @Post(':id/assets')
  createWalletAsset(
    @Param('id') id: string,
    @Body() createWalletAssetDto: CreateWalletAssetDto,
  ) {
    return this.walletsService.createWalletAsset(id, createWalletAssetDto);
  }
}
