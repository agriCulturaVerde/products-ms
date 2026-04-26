import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {

    @IsString()
    public name: string;

    @IsString()
    public description;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Type(() => Number) // Asegura que el valor se transforme a número
    public price: number;
}
