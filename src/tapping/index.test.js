import { Tapping, TappingLevel } from '.';

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
        expect(result.additionalValues.level).toBe(TappingLevel.Smooth);
    });

    test('test2', () => {
        const tapping = new Tapping();
        const result = tapping.calculate({
            dots1: 12,
            dots2: 14,
            dots3: 10,
            dots4: 13,
            dots5: 16,
            dots6: 17
        });
        expect(result.additionalValues.level).toBe(TappingLevel.Concave);
    });
});
