import {Service} from "../service/service";

describe('Demo service test', () => {
    test('sum of a and b should work', () => {
        const result = Service.sum(5, 7);

        expect(result).toEqual(12);
    });
});