import { Injectable, Inject } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { VehicleDto } from './dto/vehicle.dto';
import { VehiclePartialDto } from './dto/vehiclePartial.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @Inject('VEHICLE_REPOSITORY')
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async findAll(): Promise<VehicleDto[]> {
    try {
      return this.vehicleRepository.find()
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string): Promise<VehicleDto> {
    try {
      return this.vehicleRepository.findOneBy({ id: id })
    } catch (error) {
      return error;
    }
  }

  async create(data: VehicleDto): Promise<VehicleDto> {
    try {
      const errors = await validate(data)

      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        return this.vehicleRepository.save(data);
      }
    } catch (error) {
      return error;
    }
  }

  async update(oldData: VehicleDto, newValues: VehiclePartialDto): Promise<VehicleDto> {
    const updatedData = oldData;

    try {
      Object.keys(newValues).forEach((key) => {
        updatedData[key] = newValues[key];
      });

      const errors = await validate(updatedData)

      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        return await this.vehicleRepository.save(updatedData);
      }
    } catch (error) {
      return error;
    }
  }

  async delete(id: string) {
   try {
      return await this.vehicleRepository.delete(id);
    } catch (error) {
      return error
    }
  }
}