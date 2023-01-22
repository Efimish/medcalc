import {
    BaseValues, CalculationResult, Calculator, Gender
} from '../interfaces';

export interface PbmValues extends BaseValues {
    /**
     * centimeters
     */
    height: number;
    gender: Gender;
}



export interface PbmCalculationResult extends CalculationResult {}

/**
 * Body Mass Index
 */
export class Pbm implements Calculator {
    get meta() {
        return {
            minValue: 0,
            maxValue: 300
        };
    }

    calculate(values: PbmValues): PbmCalculationResult {
        let value = 50 + 2.3 * (0.394 * values.height - 60);
        if(values.gender == Gender.Female) value -= 4.5
        return {
            value
        };
    }
}
