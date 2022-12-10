import {populateDatabase} from "../service/dataset.service";

describe('Insert Books Test', function () {
    test('Insert books', async () => {
        populateDatabase()
            .catch(err => {
                console.log(err);
            });
    });
})
