import { OperationContext, OperationResult } from "@urql/core/dist/types/types";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useQuery } from "urql";
import { CheckUsername } from "../graphQL/queries";

export interface ValidateValues {
  email?: string;
  fullName?: string;
  username?: string;
  password?: string;
  passcode?: number;
  server?: string;
  url?: string;
  bio?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ErrorValues {
  email?: string;
  fullName?: string;
  username?: string;
  password?: string;
  passcode?: string;
  server?: string;
  url?: string;
  bio?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

type Callback = (
  variables?: object | undefined,
  context?: Partial<OperationContext> | undefined
) => Promise<OperationResult<any, object>>;

type Validate = (values: ValidateValues) => ErrorValues;

/**
 * form validation hook
 *
 * @param username checks if username is viewers username to avoid username error.
 * @param callback mutation to submit form to DB
 * @param validate validation function
 * @return Returns errors, values, handleChange function, handleSubmit function, setValues function
 */
export const useForm = (
  callback: Callback,
  validate: Validate,
  username?: string
) => {
  const [values, setValues] = useState<ValidateValues>({});
  const [errors, setErrors] = useState<ErrorValues>({});
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [result, reexecuteQuery] = useQuery({
    query: CheckUsername,
    variables: { username: values.username },
    pause: true,
  });

  useEffect(() => {
    if (result?.data?.checkUsername) {
      setErrors((errors) => {
        return { ...errors, username: "This username is already being used" };
      });
    }
  }, [result]);

  useLayoutEffect(() => {
    setErrors(validate(values));
  }, [values]);

  useEffect(() => {
    if (username === values.username) return;
    clearTimeout(timerRef.current);
    if (values.username && !errors.username) {
      const delay = setTimeout(() => {
        reexecuteQuery();
      }, 1000);
      timerRef.current = delay;
    }
  }, [values.username, username]);

  const handleSubmit = (e: SyntheticEvent) => {
    e?.preventDefault();
    const valid = validate(values);
    setErrors(valid);
    if (Object.keys(valid).length === 0 && Object.keys(values).length !== 0) {
      callback(values).then((result) => {
        if (result.error) {
          return setErrors({ server: result.error.graphQLErrors[0].message });
        }
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((values) => {
      if (name === "passcode") {
        return { ...values, [name]: parseInt(value) };
      }
      return { ...values, [e.target.name]: e.target.value };
    });
  };
  return { setValues, handleChange, handleSubmit, values, errors };
};
