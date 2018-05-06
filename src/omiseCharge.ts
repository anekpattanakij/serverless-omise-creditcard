import axios from 'axios';
import * as FormData from 'form-data';
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

const OMISE_API_URL_CHARGE = 'https://api.omise.co/charges';

export const chargeByToken = async (event, context, callback) => {
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
    if (
      !inputObject.amount ||
      validator.isEmpty(inputObject.amount) ||
      !inputObject.currency ||
      validator.isEmpty(inputObject.currency) ||
      !inputObject.card ||
      validator.isEmpty(inputObject.card)
    ) {
      throw new Error(ERROR_CODE_INVALID_INPUT, 'Invalid input');
    }

    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios.defaults.headers.post['Authorization'] =
      'Basic cGtleV90ZXN0XzViYjN3NzN2aGl4YWVvOHhzbHQ6IA==';
    const data = new FormData();

    data.append('amount', inputObject.amount);
    data.append('currency', inputObject.currency);
    data.append('card', inputObject.card);

    await axios({
      method: 'post',
      url: OMISE_API_URL_CHARGE,
      data,
    })
      .then(returnToken => {
        console.log(returnToken);
        response.statusCode = HTTP_REQUEST_SUCCESS;
      })
      .catch(error => {
        response = errorToHttpStatusCode(Error.transformErrorFromAxios(error));
      });
  } catch (error) {
    console.log(error);
    response = errorToHttpStatusCode(error);
  }
  callback(null, response);
};
