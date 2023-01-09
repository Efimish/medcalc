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
    Error,
    TooLow,
    TooHigh,
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
        const ageFlag = (age < 16) ? -1 : (16 <= age && age <= 29) ? 0 : (30 <= age && age <= 49) ? 1 : 2
        let row = -1;

        // Male table
        const M16_29 = [8.1, 9.2, 10.2, 11.2, 12.1, 12.9, 14.7, 16.3, 17.7, 19.0, 20.2, 21.2, 22.2, 23.2, 24.0, 24.8, 25.6, 26.3, 27.0, 27.6, 28.8, 29.9, 31.0, 31.9, 32.8, 33.6, 34.4, 35.2, 35.9, 36.5]
        const M30_49 = [12.1, 13.2, 14.2, 15.2, 16.1, 16.9, 18.7, 20.3, 21.8, 23.0, 24.2, 25.3, 26.3, 27.2, 28.0, 28.8, 29.6, 30.3, 31.0, 31.7, 32.9, 34.0, 35.0, 36.0, 36.8, 37.7, 38.5, 39.2, 39.9, 40.6]
        const M50plus = [12.5, 13.9, 15.1, 16.3, 17.4, 18.5, 20.8, 22.8, 24.7, 26.3, 27.8, 29.1, 30.4, 31.5, 32.6, 33.7, 34.6, 35.5, 36.5, 37.3, 38.8, 40.2, 41.5, 42.8, 43.9, 45.0, 46.0, 47.0, 47.9, 48.8]
        // Female table
        const F16_29 = [9.4, 11.2, 12.7, 14.1, 15.4, 16.5, 17.6, 18.6, 19.5, 21.6, 23.4, 25.0, 26.5, 27.8, 29.1, 30.2, 31.2, 32.2, 33.1, 34.0, 34.8, 35.6, 36.3, 37.7, 39.0, 40.2, 41.3, 42.3, 43.2, 44.6, 45.0, 45.8, 46.6]
        const F30_49 = [14.1, 15.7, 17.1, 18.4, 19.5, 20.6, 21.5, 22.4, 23.3, 25.2, 26.8, 28.3, 29.6, 30.8, 31.9, 32.9, 33.9, 34.7, 35.6, 36.3, 37.1, 37.8, 38.5, 39.7, 40.8, 41.9, 42.9, 43.8, 44.7, 45.5, 46.2, 46.9, 47.6]
        const F50plus = [17.0, 18.6, 20.1, 21.4, 22.6, 23.7, 24.8, 25.7, 26.6, 28.6, 30.3, 31.9, 33.2, 34.6, 35.7, 36.7, 37.7, 38.6, 39.5, 40.4, 41.1, 41.9, 42.6, 43.9, 45.1, 46.2, 47.3, 48.2, 49.1, 50.0, 50.8, 51.6, 52.3]
        if(gender === Gender.Male) {
            row = (
                mmsum < 20 ? -1 :      // too less
                mmsum < 22 ? 0 :
                mmsum < 24 ? 1 :
                mmsum < 26 ? 2 :
                mmsum < 28 ? 3 :
                mmsum < 30 ? 4 :
                mmsum < 35 ? 5 : 
                mmsum < 40 ? 6 :
                mmsum < 45 ? 7 :
                mmsum < 50 ? 8 :
                mmsum < 55 ? 9 :
                mmsum < 60 ? 10 :
                mmsum < 65 ? 11 :
                mmsum < 70 ? 12 :
                mmsum < 75 ? 13 :
                mmsum < 80 ? 14 :
                mmsum < 85 ? 15 :
                mmsum < 90 ? 16 :
                mmsum < 95 ? 17 :
                mmsum < 100 ? 18 :
                mmsum < 110 ? 19 :
                mmsum < 120 ? 20 :
                mmsum < 130 ? 21 :
                mmsum < 140 ? 22 :
                mmsum < 150 ? 23 :
                mmsum < 160 ? 24 :
                mmsum < 170 ? 25 :
                mmsum < 180 ? 26 :
                mmsum < 190 ? 27 :
                mmsum < 200 ? 28 :
                mmsum === 200 ? 29 :
                100                    // too much
            )
        } else if(gender === Gender.Female) {
            row = (
                mmsum < 14 ? -1 :      // too less
                mmsum < 16 ? 0 :
                mmsum < 18 ? 1 :
                mmsum < 20 ? 2 :
                mmsum < 22 ? 3 :
                mmsum < 24 ? 4 :
                mmsum < 26 ? 5 :
                mmsum < 28 ? 6 :
                mmsum < 30 ? 7 :
                mmsum < 35 ? 8 : 
                mmsum < 40 ? 9 :
                mmsum < 45 ? 10 :
                mmsum < 50 ? 11 :
                mmsum < 55 ? 12 :
                mmsum < 60 ? 13 :
                mmsum < 65 ? 14 :
                mmsum < 70 ? 15 :
                mmsum < 75 ? 16 :
                mmsum < 80 ? 17 :
                mmsum < 85 ? 18 :
                mmsum < 90 ? 19 :
                mmsum < 95 ? 20 :
                mmsum < 100 ? 21 :
                mmsum < 110 ? 22 :
                mmsum < 120 ? 23 :
                mmsum < 130 ? 24 :
                mmsum < 140 ? 25 :
                mmsum < 150 ? 26 :
                mmsum < 160 ? 27 :
                mmsum < 170 ? 28 :
                mmsum < 180 ? 29 :
                mmsum < 190 ? 30 :
                mmsum < 200 ? 31 :
                mmsum === 200 ? 32 :
                100                    // too much
            )
        }

        if(ageFlag === -1) { // Error
            return { percent: fat, level: level };
        }

        if(row === -1) { // Error, too less
            level = FatLevel.TooLow;
            return { percent: fat, level: level };
        }
        
        else if(row === 100) { // Error, too high -_-
            level = FatLevel.TooHigh;
            return { percent: fat, level: level };
        }

        switch(gender) {
            case Gender.Male: {
                switch(ageFlag) {
                    case 0: {
                        fat = M16_29[row];
                        level = (9 <= fat && fat <= 15) ? FatLevel.Good : FatLevel.Bad
                        break;
                    }
                    case 1: {
                        fat = M30_49[row];
                        level = (11 <= fat && fat <= 17) ? FatLevel.Good : FatLevel.Bad
                        break;
                    }
                    case 2: {
                        fat = M50plus[row];
                        level = (12 <= fat && fat <= 19) ? FatLevel.Good : FatLevel.Bad
                        break;
                    }
                }
            }
            case Gender.Female: {
                switch(ageFlag) {
                    case 0: {
                        fat = F16_29[row];
                        level = (14 <= fat && fat <= 21) ? FatLevel.Good : FatLevel.Bad
                        break;
                    }
                    case 1: {
                        fat = F30_49[row];
                        level = (15 <= fat && fat <= 23) ? FatLevel.Good : FatLevel.Bad
                        break;
                    }
                    case 2: {
                        fat = F50plus[row];
                        level = (16 <= fat && fat <= 25) ? FatLevel.Good : FatLevel.Bad
                        break;
                    }
                }
            }
        }

        return { percent: fat, level: level };
        // if (gender === Gender.Male) {
        //     if (16 <= age && age <= 29) {
        //         fat = 8.1 + (mmsum - 20) * 0.5;
        //         level = (9 <= fat && fat <= 15) ? FatLevel.Good : FatLevel.Bad
        //     }
        //     if (30 <= age && age <= 49) {
        //         fat = 12.1 + (mmsum - 20) * 0.5;
        //         level = (11 <= fat && fat <= 17) ? FatLevel.Good : FatLevel.Bad
        //     }
        //     if (50 <= age) {
        //         fat = 12.5 + (mmsum - 20) * 1.2;
        //         level = (12 <= fat && fat <= 19) ? FatLevel.Good : FatLevel.Bad
        //     }
        // } else {
        //     if (16 <= age && age <= 29) {
        //         fat = 9.4 + (mmsum - 14) * 0.9;
        //         level = (14 <= fat && fat <= 21) ? FatLevel.Good : FatLevel.Bad
        //     }
        //     if (30 <= age && age <= 49) {
        //         fat = 14.1 + (mmsum - 14) * 0.8;
        //         level = (15 <= fat && fat <= 23) ? FatLevel.Good : FatLevel.Bad
        //     }
        //     if (50 <= age) {
        //         fat = 17.0 + (mmsum - 14) * 0.8;
        //         level = (16 <= fat && fat <= 25) ? FatLevel.Good : FatLevel.Bad
        //     }
        // }
        
        // return { percent: fat, level: level };
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
