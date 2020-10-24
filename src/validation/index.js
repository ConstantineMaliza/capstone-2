
import * as userValidate from './user';
import * as blogValidate from './blog';
import commentValidate from './comment';
import queryValidate from './query';

function validate(schema, value) {
  const { error } = schema.validate(value);
  if (error) return error;
  return false;
}

export {
  validate,
  userValidate,
  blogValidate,
  commentValidate,
  queryValidate,
};
