import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyService } from 'src/company/company.service';
import { TypeVehicle } from 'src/vehicle/entities/vehicle.entity';
import { ControlService } from './control.service';
import { ControlDto } from './dto/control.dto';
import { ControlPartialDto } from './dto/controlPartial.dto';
import { SituationType } from './entities/control.entity';

@ApiTags('control')
@Controller('control')
export class ControlController {
    constructor(
        private readonly controlService: ControlService,
        private readonly companyService: CompanyService) {}

    @Post()
    async create(@Res() response, @Body()record: ControlDto) {
        const countVehicleAlreadyParked = await this.controlService.validationAlreadyParked(record.idvehicle)
        const resultCompany = await this.companyService.findOne(record.idcompany)
        const { amountAvailableMotorcycle, amountAvailableCar } = resultCompany
        const ammountParked = await this.controlService.ammountParked(record.idcompany, record.typeSpot)
        const isFullParked = ammountParked === (record.typeSpot === TypeVehicle.VEHICLE ? amountAvailableCar : amountAvailableMotorcycle)
        
        if(isFullParked){
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Park company is full',
                idvehicle: record.idcompany
            })
        }

        if(countVehicleAlreadyParked > 0){
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Vehicle already parked',
                idvehicle: record.idvehicle
            })
        }

        const newRecord = await this.controlService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    @Get()
    async fetchAll(@Res() response) {
        const list = await this.controlService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    @Get('/vehiclesparked')
    async fetchAllVehiclesParked(@Res() response) {
        const list = await this.controlService.findAllVehiclesParked();
        return response.status(HttpStatus.OK).json(list)
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.controlService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    @Patch(':id')
    async update(@Body() updatedData: ControlPartialDto, @Param('id') id): Promise<ControlDto> {
        const oldData = await this.controlService.findOne(id);

        if(oldData.situation === updatedData.situation){
            const validVehicleAlreadyParked = await this.controlService.findVerifyVehicleAlreadyParked(updatedData.idvehicle)
            if(validVehicleAlreadyParked){
                throw new Error('Vehicle already parked')
            }
        }
        
        return await this.controlService.update(oldData, updatedData);
    }

    @Patch('/finish/:id')
    async finishSpot(@Param('id') id): Promise<ControlDto> {
        const oldData = await this.controlService.findOne(id);
        const updatedData = {
            situation: SituationType.ENDED,
            checkOut: new Date()
        }

        return await this.controlService.update(oldData, updatedData);
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.controlService.delete(id);
    }

    @Delete()
    async deleteAll() {
        return await this.controlService.deleteAll()
    }
}
