export type Form<Data, Field> = {
  data: Data;
  field: Field;
  validated: Validated<Data, Field>;
};

export type Validated<Data, Field> = Success<Data> | Failed<Field>;

export type Success<Data> = { type: "success"; data: Data };
export type Failed<Field> = { type: "error"; data: ValidationError<Field> };
export type ValidationError<Field> = Field extends Record<
  string | number | symbol,
  unknown
>
  ? {
      [p in keyof Field]: FieldError;
    }
  : FieldError;
export type FieldError = { reason: string }[];

export type Validator<Data, Field> = (
  data: Data,
  field: Field
) => Validated<Data, Field>;

export function createForm<Data, Field>(
  data: Data,
  field: Field,
  validator: Validator<Data, Field>
): Form<Data, Field> {
  return {
    data,
    field,
    validated: validator(data, field),
  };
}
