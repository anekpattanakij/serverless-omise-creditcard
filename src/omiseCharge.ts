import axios from 'axios';
import * as validator from 'validator';
import {
  Error,
  ERROR_CODE_INVALID_INPUT,
  ERROR_CODE_MYSQL_CONNECTION,
  ERROR_CODE_USER_DUPLICATE_EMAIL,
} from './common/error';
import {
  HTTP_REQUEST_SUCCESS,
  ResponseRequest,
} from './common/responseRequest';
import { errorToHttpStatusCode } from './util/errorResponseUtil';

const OMISE_API_URL_CHARGE = 'https://vault.omise.co/tokens';

const getBnkMembers = () => {
  return [
    {
      nickname: 'Cherprang',
      full_name: 'Cherprang Areekul',
    },
    {
      nickname: 'Jennis',
      full_name: 'Jennis Oprasert',
    },
    {
      nickname: 'Miori',
      full_name: 'Miori Ohkubo',
    },
  ];
};

export const charge = (event, context, callback): void => {
  /*
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios.defaults.headers.post['Authorization'] =
      'Basic cGtleV90ZXN0XzViYjN3NzN2aGl4YWVvOHhzbHQ6IA==';
    const data = new FormData();
    
    data.append('card[name]', 'Somchai Prasert');
    data.append('card[number]', '4242424242424242');
    data.append('card[expiration_month]', '10');
    data.append('card[expiration_year]', '2018');
    data.append('card[security_code]', '123');

    axios
      .post(OMISE_API_URL, data)
      .then(returnToken => {
        console.log(returnToken.data.id);
        dispatch(loadCreditCardTokenSuccess(returnToken));
      })
      .catch(error => {
        console.log(error.response.data.code);
        dispatch(loadCreditCardTokenFailure(error.response));
      });
  };*/
  let response: ResponseRequest = new ResponseRequest(HTTP_REQUEST_SUCCESS, '');
  let inputObject: any;
  try {
    if (!event.body) {
      throw new Error(ERROR_CODE_INVALID_INPUT, 'Invalid input');
    }
    try {
      inputObject = JSON.parse(event.body);
    } catch (err) {
      throw new Error(ERROR_CODE_INVALID_INPUT, 'Error on convert json');
    }
    // const members = getBnkMembers();
    // const response:ResponseRequest = new ResponseRequest(HTTP_REQUEST_SUCCESS,JSON.stringify(members));
  } catch (error) {
    console.log(error);
    response = errorToHttpStatusCode(error);
  }
  callback(null, response);
};
