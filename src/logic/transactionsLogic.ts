import { createLogic } from "redux-logic";
import {
  TRANSACTIONS_PUBLIC_PENDING,
  TRANSACTIONS_PUBLIC_SUCCESS,
  TRANSACTIONS_PUBLIC_ERROR,
  TRANSACTIONS_CONTACTS_PENDING,
  TRANSACTIONS_CONTACTS_SUCCESS,
  TRANSACTIONS_CONTACTS_ERROR,
  TRANSACTIONS_PERSONAL_PENDING,
  TRANSACTIONS_PERSONAL_SUCCESS,
  TRANSACTIONS_PERSONAL_ERROR,
  TRANSACTIONS_LIKE_PENDING,
  TRANSACTIONS_LIKE_SUCCESS,
  TRANSACTIONS_LIKE_ERROR,
  TRANSACTIONS_COMMENT_PENDING,
  TRANSACTIONS_COMMENT_SUCCESS,
  TRANSACTIONS_COMMENT_ERROR,
  transactionsPublicPending,
  transactionsContactsPending
} from "../actions/transactions";

const transactionsPersonalLogic = createLogic({
  type: TRANSACTIONS_PERSONAL_PENDING,
  processOptions: {
    dispatchReturn: true,
    successType: TRANSACTIONS_PERSONAL_SUCCESS,
    failType: TRANSACTIONS_PERSONAL_ERROR
  },

  // @ts-ignore
  process({ httpClient }) {
    return httpClient
      .get(`http://localhost:3001/transactions`)
      .then((resp: any) => resp.data.transactions);
  }
});

const transactionsPublicLogic = createLogic({
  type: TRANSACTIONS_PUBLIC_PENDING,
  processOptions: {
    dispatchReturn: true,
    successType: TRANSACTIONS_PUBLIC_SUCCESS,
    failType: TRANSACTIONS_PUBLIC_ERROR
  },

  // @ts-ignore
  process({ httpClient }) {
    return httpClient
      .get(`http://localhost:3001/transactions/public`)
      .then((resp: any) => resp.data.transactions);
  }
});

const transactionsContactsLogic = createLogic({
  type: TRANSACTIONS_CONTACTS_PENDING,
  processOptions: {
    dispatchReturn: true,
    successType: TRANSACTIONS_CONTACTS_SUCCESS,
    failType: TRANSACTIONS_CONTACTS_ERROR
  },

  // @ts-ignore
  process({ httpClient }) {
    return httpClient
      .get(`http://localhost:3001/transactions/contacts`)
      .then((resp: any) => resp.data.transactions);
  }
});

const transactionsLikeLogic = createLogic({
  type: TRANSACTIONS_LIKE_PENDING,
  processOptions: {
    dispatchReturn: true,
    successType: TRANSACTIONS_LIKE_SUCCESS,
    failType: TRANSACTIONS_LIKE_ERROR
  },

  // @ts-ignore
  process({ httpClient, action }) {
    return (
      httpClient
        // @ts-ignore
        .post(`http://localhost:3001/likes/${action.payload.transactionId}`)
        .then((resp: any) => resp.data)
    );
  }
});

const transactionsLikeSuccessLogic = createLogic({
  type: TRANSACTIONS_LIKE_SUCCESS,

  // @ts-ignore
  // eslint-disable-next-line no-empty-pattern
  process({}, dispatch) {
    const { pathname } = window.location;

    // Refresh transactions based on url
    if (pathname.match("/|public")) {
      dispatch(transactionsPublicPending());
    }

    if (pathname.match("contacts")) {
      dispatch(transactionsContactsPending());
    }

    if (pathname.match("personal")) {
      dispatch(transactionsContactsPending());
    }
  }
});

const transactionsCommentLogic = createLogic({
  type: TRANSACTIONS_COMMENT_PENDING,
  processOptions: {
    dispatchReturn: true,
    successType: TRANSACTIONS_COMMENT_SUCCESS,
    failType: TRANSACTIONS_COMMENT_ERROR
  },

  // @ts-ignore
  process({ httpClient, action }) {
    // @ts-ignore
    const { payload } = action;

    return httpClient
      .post(`http://localhost:3001/comments/${payload.transactionId}`, {
        content: payload.content
      })
      .then((resp: any) => resp.data);
  }
});

const transactionsCommentSuccessLogic = createLogic({
  type: TRANSACTIONS_COMMENT_SUCCESS,

  // @ts-ignore
  // eslint-disable-next-line no-empty-pattern
  process({}, dispatch) {
    const { pathname } = window.location;

    // Refresh transactions based on url
    if (pathname.match("/|public")) {
      dispatch(transactionsPublicPending());
    }

    if (pathname.match("contacts")) {
      dispatch(transactionsContactsPending());
    }

    if (pathname.match("personal")) {
      dispatch(transactionsContactsPending());
    }
  }
});

export default [
  transactionsPersonalLogic,
  transactionsPublicLogic,
  transactionsContactsLogic,
  transactionsLikeLogic,
  transactionsLikeSuccessLogic,
  transactionsCommentLogic,
  transactionsCommentSuccessLogic
];