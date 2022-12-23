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
    Concave = 4,
    Unknown = NaN,
}

export interface TappingCalculationResult extends CalculationResult {
    additionalValues: {
        level: TappingLevel,
        sres: String
    }
}

function aredotsclose(dots: number[]) {
    const average_amount = dots.reduce((a,b)=>a+b) / dots.length;
    const variation = average_amount * 0.2;
    for(let dot of dots) {
        if (Math.abs(average_amount - dot) > variation) {
            return false;
        }
    }
    return true;
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
        const dots = [dots1, dots2, dots3, dots4, dots5, dots6]
        // Result interpretation
        if (aredotsclose(dots)) {
            return { level: TappingLevel.Smooth, riskLevel: RiskLevel.Critical };
        }
        if ((dots[2] > dots[0] * 1.1 && dots[2] > dots[5] * 1.1) || (dots[3] > dots[0] * 1.1 && dots[3] > dots[5] * 1.1)) {
            return { level: TappingLevel.Convex, riskLevel: RiskLevel.High };
        }
        if (dots[0] > dots[1] && aredotsclose(dots.slice(1))) {
            return { level: TappingLevel.Descending, riskLevel: RiskLevel.Moderate };
        }
        if ((dots[1] > dots[2] && aredotsclose(dots.slice(2))) || (dots[2] > dots[3] && aredotsclose(dots.slice(3)))) {
            return { level: TappingLevel.Intermediate, riskLevel: RiskLevel.Low };
        } // dm[2] < dm[0] * 1.1 and dm[2] < dm[5] * 1.1 and dm[3] < dm[0] * 1.1 and dm[3] < dm[5] * 1.1:
        if (dots[2] < dots[0] * 1.1 && dots[2] < dots[5] * 1.1 && dots[3] < dots[0] * 1.1 && dots[3] < dots[5] * 1.1) {
            return { level: TappingLevel.Concave, riskLevel: RiskLevel.Moderate };
        }
        return { level: TappingLevel.Unknown, riskLevel: RiskLevel.Critical };
    }

    calculate(values: TappingValues): TappingCalculationResult {
        const dots1 = values.dots1;
        const dots2 = values.dots2;
        const dots3 = values.dots3;
        const dots4 = values.dots4;
        const dots5 = values.dots5;
        const dots6 = values.dots6;
        const value = ((dots2-dots1) + (dots3-dots1) + (dots4-dots1) + (dots5-dots1) + (dots6-dots1)) / dots1 * 100;
        const sres = value >= 0 ? "Сильная система" : "Слабая система"
        const risk = this.getRisk(dots1, dots2, dots3, dots4, dots5, dots6);
        return {
            value,
            additionalValues: {
                level: risk.level,
                sres: sres
            },
            riskLevel: risk.riskLevel
        };
    }
}
