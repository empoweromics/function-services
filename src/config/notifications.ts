export const SUCCESS_ACTION = (action: string) =>
  `generate a new ${action} successfully ✅`;
export const DELETE_ACTION = (action: string) =>
  `Delete ${action} successfully ✅`;

export const SUPMIT_OPPORTUNITY_EMP = () =>
  "Congratulations 😊 , You have a new opportunity submited from your EMP";

export const WITHDROW_ACTION_TRANSACTION = (
  amount: string,
  method: string,
  refrance: string
) => `${amount} EGP Send to your ${method} with refrance Id ${refrance}`;

export const CREDIT_TRANSACTION = (amount: string, refrance: string) =>
  `${amount} EGP add to your wallet with opportunity Id ${refrance}`;
