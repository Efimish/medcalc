import {
    BaseValues, CalculationResult, Calculator, RiskLevel
} from '../interfaces';

export interface TappingValues extends BaseValues {
    dots1: number;
    dots2: number;
    dots3: number;
    dots4: number;
    dots5: number;
    dots6: number;
    /**
     * amount ^^^
     */
}
/**
 * WHO values for adults
 */
 export enum TappingLevel {
    Convex = 0,
    Smooth = 1,
    Descending = 2,
    Intermediate = 3,
    Concave = 4
}

export interface TappingCalculationResult extends CalculationResult {
    additionalValues: {
        level: TappingLevel
    }
}

/**
 * Tapping
 */
export class Tapping implements Calculator {
    get meta() {
        return {
            minValue: 0,
            maxValue: 300
        };
    }

    private getRisk(dots1: number, dots2: number, dots3: number, dots4: number, dots5: number, dots6: number) {
        // Result interpretation
        if (dots1 <= 10) {
            // < 16
            return { level: TappingLevel.Convex, riskLevel: RiskLevel.Critical };
        }
        if (dots1 <= 20) {
            // 16-17
            return { level: TappingLevel.Smooth, riskLevel: RiskLevel.High };
        }
        if (dots1 <= 30) {
            // 17-18.5
            return { level: TappingLevel.Descending, riskLevel: RiskLevel.Moderate };
        }
        if (dots1 <= 40) {
            // 18.5-25
            return { level: TappingLevel.Intermediate, riskLevel: RiskLevel.Low };
        }
        if (dots1 <= 50) {
            // 25-30
            return { level: TappingLevel.Concave, riskLevel: RiskLevel.Moderate };
        }
        return { level: TappingLevel.Smooth, riskLevel: RiskLevel.Critical };
    }

    calculate(values: TappingValues): TappingCalculationResult {
        const dots1 = values.dots1;
        const dots2 = values.dots2;
        const dots3 = values.dots3;
        const dots4 = values.dots4;
        const dots5 = values.dots5;
        const dots6 = values.dots6;
        const value = 123;
        const risk = this.getRisk(dots1, dots2, dots3, dots4, dots5, dots6);
        return {
            value,
            // value,
            additionalValues: {
                level: risk.level
            },
            riskLevel: risk.riskLevel
        };
    }
}
