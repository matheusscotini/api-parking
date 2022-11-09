/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { Control, SituationType } from './entities/control.entity';
import { ControlDto } from './dto/control.dto';
import { ControlPartialDto } from './dto/controlPartial.dto';
import { CompanyService } from 'src/company/company.service';
import { ControlCountDto } from './dto/controlCountParked.dto';
import { TypeVehicle } from 'src/vehicle/entities/vehicle.entity';

@Injectable()
export class ControlService {
  constructor(
    @Inject('CONTROL_REPOSITORY')
    private controlRepository: Repository<Control>,
    private readonly companyService: CompanyService
  ) {}

  async findAll(): Promise<ControlDto[]> {
    try {
      return this.controlRepository.find({
        loadRelationIds: true,
        relations: [
          'idvehicle',
          'idcompany'
        ],
        select: {
          id: true,
          situation: true,
          checkIn: true,
          checkOut: true,
          typeSpot: true
        }
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string): Promise<ControlDto> {
    try {
      return await this.controlRepository.findOne({
        where: { 
          id: id 
        },
        loadRelationIds: true,
        relations: [
          'idvehicle',
          'idcompany'
        ],
        select: {
          id: true,
          situation: true,
          checkIn: true,
          checkOut: true,
          typeSpot: true
        }
      })
    } catch (error) {
      return error;
    }
  }

  async findAllVehiclesParked(): Promise<ControlDto> {
    try {
      return await this.controlRepository.findOne({
        where: { 
          situation: SituationType.PARKED 
        },
        loadRelationIds: true,
        relations: [
          'idvehicle',
          'idcompany'
        ],
        select: {
          id: true,
          situation: true,
          checkIn: true,
          checkOut: true,
          typeSpot: true
        }
      })
    } catch (error) {
      return error;
    }
  }

  async validationAlreadyParked(idvehicle: string): Promise<any> {
    const countVehicleAlreadyParked = await this.controlRepository
      .createQueryBuilder(`control`)
      .select()
      .andWhere(`idvehicle = '${idvehicle}'`)
      .andWhere(`situation = 'PARKED'`)
      .printSql()
      .getCount()

    return countVehicleAlreadyParked
  }

  async ammountParked(idcompany: string, typeSpot: TypeVehicle): Promise<any> {
    const ammountParked = await this.controlRepository
      .createQueryBuilder(`control`)
      .select()
      .andWhere(`idcompany = '${idcompany}'`)
      .andWhere(`typeSpot = '${typeSpot}'`)
      .printSql()
      .getCount()

    return ammountParked
  }

  async findVerifyVehicleAlreadyParked(idvehicle: string): Promise<boolean> {
    try {
      const result = await this.controlRepository.find({
        where: {
          situation: SituationType.PARKED
        },
        select: {
          id: true,
          idvehicle: true
        },
        relations: [
          'idvehicle'
        ]
      })

      return result.filter(parked => parked.idvehicle['id'] === idvehicle).length > 0
    } catch (error) {
      return error;
    }
  }

  async findAmmountVehiclesParked(idcompany: string): Promise<ControlCountDto> {
    try {
      const results = await this.controlRepository.find({
        where: { 
          //idcompany: idcompany,
          situation: SituationType.PARKED 
        },
        select: {
          typeSpot: true,
          idcompany: true
        },
        relations: [
          'idcompany'
        ]
      })
console.log('results',idcompany)
      const amountOccupiedMotorcycle = results.filter(item => {
        item.typeSpot === TypeVehicle.MOTORCICLE && 
        item.idcompany['id'] === idcompany
      }).length || 0
      const amountOccupiedCar = results.filter(item => {
        item.typeSpot === TypeVehicle.VEHICLE && 
        item.idcompany['id'] === idcompany
      }).length || 0

      return {
        amountOccupiedMotorcycle,
        amountOccupiedCar
      }
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  async create(data: ControlDto): Promise<ControlDto> {
    try {
      const errors = await validate(data)

      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        return this.controlRepository.save(data)
      }
    } catch (error) {
      return error;
    }
  }

  async update(oldData: ControlDto, newValues: ControlPartialDto): Promise<ControlDto> {
    const updatedData = oldData;

    try {
      Object.keys(newValues).forEach((key) => {
        updatedData[key] = newValues[key];
      });

      const errors = await validate(updatedData)

      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        return await this.controlRepository.save(updatedData);
      }
    } catch (error) {
      return error;
    }
  }

  async delete(id: string) {
   try {
      return await this.controlRepository.delete(id);
    } catch (error) {
      return error
    }
  }

  async deleteAll() {
    try {
      const list = await this.findAll();
      const promises = []

      list.forEach(item => {
        promises.push(this.delete(item.id))
      })

      Promise.all(promises).then(values => {
        return values
      })
    } catch (error) {
      return error
    }
  }
}