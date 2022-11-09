import { Injectable, Inject } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CompanyDto } from './dto/company.dto';
import { CompanyPartialDto } from './dto/companyPartial.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<CompanyDto[]> {
    try {
      return this.companyRepository.find();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string): Promise<CompanyDto> {
    try {
      return await this.companyRepository.findOneBy({ id: id })
    } catch (error) {
      return error;
    }
  }

  async create(data: CompanyDto): Promise<CompanyDto> {
    try {
      const errors = await validate(data)

      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        return this.companyRepository.save(data)
      }
    } catch (error) {
      return error;
    }
  }

  async update(oldData: CompanyDto, newValues: CompanyPartialDto): Promise<CompanyDto> {
    const updatedData = oldData;

    try {
      Object.keys(newValues).forEach((key) => {
        updatedData[key] = newValues[key];
      });

      const errors = await validate(updatedData)

      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        return await this.companyRepository.save(updatedData);
      }
    } catch (error) {
      return error;
    }
  }

  async delete(id: string) {
   try {
      return await this.companyRepository.delete(id);
    } catch (error) {
      return error
    }
  }
}