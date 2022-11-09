import { ControlDto } from "./control.dto";
import { PartialType } from "@nestjs/mapped-types"

export class ControlPartialDto extends PartialType(ControlDto) {}