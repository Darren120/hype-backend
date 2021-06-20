const CustomErrors = {
  authorizationError: {
    type: 'Error',
    name: 'Invalid Authorization',
    message: 'You must be authenicated to access this.',
  },
  customError(
    name: string,
    msg: string,
  ): { type: string; name: string; msg: string } {
    return { type: 'Error', name: name, msg: msg };
  },
};

export = CustomErrors;
