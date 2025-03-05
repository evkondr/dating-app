export const standardResponse = <T>(success: boolean, message:string, data?:T) => ({
  success,
  message,
  payload: data
})