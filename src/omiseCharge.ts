import axios from 'axios';
import * as FormData from 'form-data';
import * as request from 'request';
import * as validator from 'validator';

import {
  Error,
  ERROR_CODE_INVALID_INPUT,
  ERROR_CODE_NETWORK_ERROR,
} from './common/error';
import {
  HTTP_REQUEST_SUCCESS,
  ResponseRequest,
} from './common/responseRequest';
import { Config } from './config/index';
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

    const formData = {
      amount: inputObject.amount,
      currency: inputObject.currency,
      card: inputObject.card,
    };

    request.post(
      {
        url: OMISE_API_URL_CHARGE,
        auth: {
          username: 'skey_test_5bb3w73w1cg6ojqpzqc',
          password: '',
        },
        formData,
      },
      (err, httpResponse, body) => {
        if (err) {
          response = errorToHttpStatusCode(
            new Error(ERROR_CODE_NETWORK_ERROR, err),
          );
        }
        if (httpResponse !== '200') {
          const returnResult = JSON.parse(body);
          response = errorToHttpStatusCode(new Error(returnResult.code, returnResult.message));
        }
        // successs
        callback(null, response);
      },
    );
  } catch (error) {
    console.log(error);
    response = errorToHttpStatusCode(error);
    callback(null, response);
  }
};
