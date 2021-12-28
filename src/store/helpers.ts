export const onPendingAsyncAction = (actionName: string) => `${actionName}/pending`;
export const onFullfiledAsyncAction = (actionName: string) => `${actionName}/fulfilled`;
export const onRejectedAsyncAction = (actionName: string) => `${actionName}/rejected`;