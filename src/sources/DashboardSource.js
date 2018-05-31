
import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

const DashboardSource = {

  getStatus() {
    return new Promise((resolve, reject) => {
      request.get('https://rocky-journey-78042.herokuapp.com')
        .accept(APIURL.APPLICATION_TYPE)
        .timeout(30000)
        .end((err, response) => {
          console.log('response', response);
          if (response.status === 200) {
            if (response && response.text) {
              const responseData = JSON.parse(response.text);
              console.log('response', responseData.response);
              resolve(responseData.response);
            } else {
              console.log('err', err);
              reject();
            }
          }
          else {
            reject();
          }

        });
    });
  },
};

export default DashboardSource;
