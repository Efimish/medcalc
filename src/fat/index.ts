import {
    BaseValues, CalculationResult, Calculator, Gender
} from '../interfaces';

export interface FatLevelValues extends BaseValues {
    age: number;
    gender: Gender;
    mmBiceps: number;
    mmTriceps: number;
    mmLopatka: number;
    mmTaliya: number;
    /**
     * amount ^^^
     */
}
/**
 * WHO values for adults
 */
export enum FatLevel {
    Good = 0,
    Bad = 1,
    Error = 2,
}

export interface FatLevelCalculationResult extends CalculationResult {
    additionalValues: {
        level: FatLevel
    }
}

/**
 * Tapping
 */
export class Fat implements Calculator {
    get meta() {
        return {
            minValue: 0,
            maxValue: 300
        };
    }

    private getRisk(age: number, gender: Gender, mmsum: number) {
        // Result interpretation
        let fat = 0.0;
        let level = FatLevel.Error;
        if (gender === Gender.Male) {
            if (16 <= age && age <= 29) {
                fat = 8.1 + (mmsum - 20) * 0.5;
                level = (9 <= fat && fat <= 15) ? FatLevel.Good : FatLevel.Bad
            }
            if (30 <= age && age <= 49) {
                fat = 12.1 + (mmsum - 20) * 0.5;
                level = (11 <= fat && fat <= 17) ? FatLevel.Good : FatLevel.Bad
            }
            if (50 <= age) {
                fat = 12.5 + (mmsum - 20) * 1.2;
                level = (12 <= fat && fat <= 19) ? FatLevel.Good : FatLevel.Bad
            }
        } else {
            if (16 <= age && age <= 29) {
                fat = 9.4 + (mmsum - 14) * 0.9;
                level = (14 <= fat && fat <= 21) ? FatLevel.Good : FatLevel.Bad
            }
            if (30 <= age && age <= 49) {
                fat = 14.1 + (mmsum - 14) * 0.8;
                level = (15 <= fat && fat <= 23) ? FatLevel.Good : FatLevel.Bad
            }
            if (50 <= age) {
                fat = 17.0 + (mmsum - 14) * 0.8;
                level = (16 <= fat && fat <= 25) ? FatLevel.Good : FatLevel.Bad
            }
        }
        
        return { percent: fat, level: level };
    }

    calculate(values: FatLevelValues): FatLevelCalculationResult {
        const age = values.age;
        const gender = values.gender;
        const mmBiceps = values.mmBiceps;
        const mmTriceps = values.mmTriceps;
        const mmLopatka = values.mmLopatka;
        const mmTaliya = values.mmTaliya;
        const mmSum = mmBiceps + mmTriceps + mmLopatka + mmTaliya;
        const risk = this.getRisk(age, gender, mmSum);
        return {
            value: risk.percent,
            additionalValues: {
                level: risk.level
            }
        };
    }
}
