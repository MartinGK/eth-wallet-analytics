import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';

@ApiTags('exchange-rates')
@Controller('exchange-rates')
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Post()
  @ApiOperation({ summary: 'Add exchange rate' })
  @ApiResponse({
    status: 201,
    description: 'The exchange rate has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async addExchangeRate(@Body() createExchangeRateDto: CreateExchangeRateDto) {
    return await this.exchangeRatesService.addExchangeRate(
      createExchangeRateDto,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update exchange rate' })
  @ApiBody({
    description: 'Exchange rate update data',
    type: UpdateExchangeRateDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The exchange rate has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Exchange rate not found.' })
  async updateExchangeRate(
    @Param('id') id: string,
    @Body() updateExchangeRateDto: UpdateExchangeRateDto,
  ) {
    return await this.exchangeRatesService.updateExchangeRate(
      id,
      updateExchangeRateDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all exchange rates' })
  @ApiResponse({ status: 200, description: 'List of exchange rates.' })
  async getAllExchangeRates() {
    return await this.exchangeRatesService.getAllExchangeRates();
  }
}
