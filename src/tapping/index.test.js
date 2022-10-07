import { Bmi, BmiLevel } from '.';
import { RiskLevel } from '../interfaces';

describe('Tapping', () => {
    test('test1', () => {
        const tapping = new Tapping();
        const result = tapping.calculate({
            dots1: 20,
            dots2: 20,
            dots3: 20,
            dots4: 20,
            dots5: 20,
            dots6: 20
        });
        expect(result.value).toBe(123);
    });
});
