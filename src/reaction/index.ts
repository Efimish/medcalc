import {
    BaseValues, CalculationResult, Calculator, RiskLevel
} from '../interfaces';

export interface ReactionValues extends BaseValues {
    cm: number;
    /**
     * amount ^^^
     */
}
/**
 * WHO values for adults
 */
export enum ReactionLevel {
    High,
    Average,
    Low,
}

export interface ReactionCalculationResult extends CalculationResult {
    additionalValues: {
        level: ReactionLevel
    }
}

/**
 * Tapping
 */
export class Reaction implements Calculator {
    get meta() {
        return {
            minValue: 0,
            maxValue: 300
        };
    }

    private getRisk(cm: number) {
        
        // Result interpretation
        // print( (2 * cm / 9.81) ** 0.5 * 100 )
        const result = Math.sqrt(cm * 2 / 9.81) * 100;
        const level = result < 184 ? ReactionLevel.High : result > 200 ? ReactionLevel.Low : ReactionLevel.Average
        
        return { ms: result, level: level };
    }

    calculate(values: ReactionValues): ReactionCalculationResult {
        const cm = values.cm;
        // const value = ((dots2 - dots1) + (dots3 - dots1) + (dots4 - dots1) + (dots5 - dots1) + (dots6 - dots1)) / dots1 * 100;
        // const sres = value >= 0 ? "Сильная система" : "Слабая система"
        const risk = this.getRisk(cm);
        return {
            value: risk.ms,
            additionalValues: {
                level: risk.level
            }
        };
    }
}
