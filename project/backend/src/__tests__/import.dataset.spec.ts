import {importBookDataset} from "../service/import.dataset.service";

describe('Insert Books Test', function () {
    test('Insert books', async () => {
        importBookDataset()
            .catch(err => {
                console.log(err);
            });
    });
})
