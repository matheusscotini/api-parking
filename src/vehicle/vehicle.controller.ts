import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { VehicleDto } from "./dto/vehicle.dto";
import { VehiclePartialDto } from "./dto/vehiclePartial.dto";
import { VehicleService } from "./vehicle.service";
import { ApiTags } from "@nestjs/swagger"

@ApiTags('vehicle')
@Controller('vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService){}

    @Post()
    async create(@Res() response, @Body()record: VehicleDto) {
        const newRecord = await this.vehicleService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    @Get()
    async fetchAll(@Res() response) {
        const list = await this.vehicleService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.vehicleService.findOne(id);
        return response.status(HttpStatus.OK).json(data)
    }

    @Patch(':id')
    async update(@Body() updatedData: VehiclePartialDto, @Param('id') id): Promise<VehicleDto> {
        const oldBook = await this.vehicleService.findOne(id);
        return await this.vehicleService.update(oldBook, updatedData);
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.vehicleService.delete(id);
    }
}