import { VehicleDto } from "./vehicle.dto";
import { PartialType } from "@nestjs/mapped-types"

export class VehiclePartialDto extends PartialType(VehicleDto) {}