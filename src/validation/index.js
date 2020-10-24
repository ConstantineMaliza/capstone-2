import * as userValidate from './user';


function validate(schema, value) {
  const { error } = schema.validate(value);
  if (error) return error;
  return false;
}

export {
  validate,
  userValidate,
};
