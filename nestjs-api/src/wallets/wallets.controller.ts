import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import type { CreateWalletAssetDto } from './dto/create-wallet-asset.dto';

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
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(id);
  }

  @Post(':id/assets')
  createWalletAsset(
    @Param('id') id: string,
    @Body() createWalletAssetDto: CreateWalletAssetDto,
  ) {
    return this.walletsService.createWalletAsset(id, createWalletAssetDto);
  }
}
