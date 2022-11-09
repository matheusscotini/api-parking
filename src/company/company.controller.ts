import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CompanyDto } from "./dto/company.dto";
import { CompanyPartialDto } from "./dto/companyPartial.dto";
import { ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags('company')
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: CompanyDto) {
        const newRecord = await this.companyService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.companyService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.companyService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: CompanyPartialDto, @Param('id') id): Promise<CompanyDto> {
        const oldData = await this.companyService.findOne(id);
        return await this.companyService.update(oldData, updatedData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.companyService.delete(id);
    }
}