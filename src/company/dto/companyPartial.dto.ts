import { CompanyDto } from "./company.dto";
import { PartialType } from "@nestjs/mapped-types"

export class CompanyPartialDto extends PartialType(CompanyDto) {}